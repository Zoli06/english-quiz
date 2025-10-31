import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from "graphql";
import {applyMiddleware} from "graphql-middleware";
import {Media, mediaType} from "./models/media";
import {Option, optionType} from "./models/option";
import {Question, questionType} from "./models/question";
import {Quiz, quizType} from "./models/quiz";
import {User, userType} from "./models/user";
import {Attempt, attemptType} from "./models/attempt";
import {permissions, Role} from "./permissions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {Sequelize} from "sequelize";
import path from "path";
import {GraphQLUpload, Upload} from "graphql-upload-minimal";
import fs from "fs";

const roleType = new GraphQLEnumType({
    name: "Role",
    values: {
        admin: {value: Role.Admin},
        editor: {value: Role.Editor},
    },
});

const getMediaTypeAndValidate = (url: string) => {
    const defaultImageTypes = ["png", "jpg", "jpeg", "gif"];
    const defaultVideoTypes = ["mp4", "avi", "mov", "wmv", "flv", "mkv"];

    if (!process.env["ALLOWED_IMAGE_TYPES"]) {
        console.error("ALLOWED_IMAGE_TYPES is not set in environment variables. Using default image types.");
        process.env["ALLOWED_IMAGE_TYPES"] = JSON.stringify(defaultImageTypes);
    }

    if (!process.env["ALLOWED_VIDEO_TYPES"]) {
        console.error("ALLOWED_VIDEO_TYPES is not set in environment variables. Using default video types.");
        process.env["ALLOWED_VIDEO_TYPES"] = JSON.stringify(defaultVideoTypes);
    }

    // Check if media is an image or video
    const allowedImageExtensions = JSON.parse(
        process.env["ALLOWED_IMAGE_TYPES"],
    );
    const allowedVideoExtensions = JSON.parse(
        process.env["ALLOWED_VIDEO_TYPES"],
    );
    const extension = path.extname(url).toLowerCase().replace(".", "");
    if (allowedImageExtensions.includes(extension)) {
        return "image";
    }
    if (allowedVideoExtensions.includes(extension)) {
        return "video";
    }
    return null;
};

const saveFile = async ({file}: Upload) => {
    if (!file) {
        return null;
    }

    const type = getMediaTypeAndValidate(file.filename);
    if (!type) {
        return null;
    }

    // Create uploads folder if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, "uploads"))) {
        fs.mkdirSync(path.join(__dirname, "uploads"));
    }
    // Save file
    const filePath = path.join(
        __dirname,
        "uploads",
        `${Math.random().toString(36).substring(2)}${path
            .extname(file.filename)
            .toLowerCase()}`,
    );
    file.createReadStream().pipe(fs.createWriteStream(filePath));
    return filePath.replace(__dirname, "");
};

export const schema = applyMiddleware(
    new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "Query",
            fields: {
                media: {
                    type: mediaType,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        return await Media.findByPk(args.id)
                    },
                },
                option: {
                    type: optionType,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        return await Option.findByPk(args.id)
                    },
                },
                question: {
                    type: questionType,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        return await Question.findByPk(args.id)
                    },
                },
                quiz: {
                    type: quizType,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        return await Quiz.findByPk(args.id)
                    },
                },
                quizzes: {
                    type: new GraphQLList(quizType),
                    resolve: async () => {
                        return await Quiz.findAll({order: [["createdAt", "DESC"]]})
                    },
                },
                attempt: {
                    type: attemptType,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        return await Attempt.findByPk(args.id)
                    },
                },
                topAttempts: {
                    type: new GraphQLList(attemptType),
                    args: {
                        quizId: {type: GraphQLID},
                        limit: {type: GraphQLInt},
                    },
                    resolve: async (_, args) => {
                        // Order by percentage score, then by time
                        return await Attempt.findAll({
                            where: args.quizId ? {quizId: args.quizId} : {},
                            order: [
                                Sequelize.literal("score/total DESC"),
                                ["time", "ASC"],
                                ["createdAt", "ASC"],
                            ],
                            limit: args.limit,
                        });
                    }
                },
                user: {
                    type: userType,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        return await User.findByPk(args.id)
                    },
                },
            },
        }),
        mutation: new GraphQLObjectType({
            name: "Mutation",
            fields: {
                getToken: {
                    type: GraphQLString,
                    args: {
                        username: {type: new GraphQLNonNull(GraphQLString)},
                        password: {type: new GraphQLNonNull(GraphQLString)},
                    },
                    resolve: async (_, args) => {
                        const user = await User.findOne({where: {username: args.username}});

                        if (
                            !user || !bcrypt.compareSync(
                                args.password,
                                user.getDataValue("password"),
                            )
                        ) {
                            return null;
                        }

                        if (!process.env["JWT_SECRET"]) {
                            // We should not proceed without a JWT secret, but we do everything to keep the server running
                            console.error("JWT_SECRET is not set in environment variables. Using empty string as secret.");
                            process.env["JWT_SECRET"] = "";
                        }

                        return jwt.sign(
                            {id: user.getDataValue("id")},
                            process.env["JWT_SECRET"],
                            {expiresIn: "1d"},
                        );
                    }
                },
                createMedia: {
                    type: mediaType,
                    args: {
                        file: {type: GraphQLUpload},
                        title: {type: GraphQLString},
                    },
                    resolve: async (_, args) => {
                        if (!args.file) {
                            return null;
                        }
                        const file = await args.file;
                        const type = getMediaTypeAndValidate(file.filename);
                        if (!type) {
                            return null;
                        }
                        const filePath = await saveFile({file} as Upload);
                        if (!filePath) {
                            console.error("File saving failed.");
                            return null;
                        }
                        return await Media.create({
                            url: filePath.replace(__dirname, ""),
                            title: args.title,
                            type,
                        });
                    },
                },
                editMedia: {
                    type: mediaType,
                    args: {
                        id: {type: new GraphQLNonNull(GraphQLID)},
                        file: {type: GraphQLUpload},
                        title: {type: GraphQLString},
                    },
                    resolve: async (_, args) => {
                        const media = await Media.findByPk(args.id);
                        if (!media) {
                            return null;
                        }
                        if (args.file) {
                            const file = await args.file;
                            const type = getMediaTypeAndValidate(file.filename);
                            if (!type) {
                                return null;
                            }
                            const filePath = await saveFile({file} as Upload);
                            if (!filePath) {
                                console.error("File saving failed.");
                                return null;
                            }
                            fs.unlink(
                                path.join(__dirname, media.getDataValue("url")),
                                () => {
                                },
                            );
                            media.setDataValue("type", type);
                            media.setDataValue("url", filePath.replace(__dirname, ""));
                        }
                        if (args.title) {
                            media.setDataValue("title", args.title);
                        }

                        return await media.save();
                    },
                },
                deleteMedia: {
                    type: GraphQLBoolean,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        const media = await Media.findByPk(args.id)
                        if (!media) {
                            return;
                        }
                        fs.unlink(path.join(__dirname, media.getDataValue("url")), () => {
                            media.destroy().then();
                        });
                        return true;
                    },
                },
                createOption: {
                    type: optionType,
                    args: {
                        questionId: {type: new GraphQLNonNull(GraphQLID)},
                        text: {type: new GraphQLNonNull(GraphQLString)},
                        isCorrect: {type: new GraphQLNonNull(GraphQLBoolean)},
                    },
                    resolve: async (_, args) => {
                        return await Option.create(args)
                    },
                },
                editOption: {
                    type: optionType,
                    args: {
                        id: {type: new GraphQLNonNull(GraphQLID)},
                        text: {type: GraphQLString},
                        isCorrect: {type: GraphQLBoolean},
                    },
                    resolve: async (_, args) => {
                        const option = await Option.findByPk(args.id);
                        if (!option) {
                            return null;
                        }
                        return await option.update(args);
                    },
                },
                deleteOption: {
                    type: GraphQLBoolean,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        const option = await Option.findByPk(args.id);
                        if (!option) {
                            return false;
                        }
                        await option.destroy();
                        return true;
                    },
                },
                createQuestion: {
                    type: questionType,
                    args: {
                        quizId: {type: new GraphQLNonNull(GraphQLID)},
                        text: {type: new GraphQLNonNull(GraphQLString)},
                        mediaId: {type: GraphQLID},
                        allowMultipleAnswers: {type: new GraphQLNonNull(GraphQLBoolean)},
                    },
                    resolve: async (_, args) => {
                        return await Question.create(args)
                    },
                },
                editQuestion: {
                    type: questionType,
                    args: {
                        id: {type: new GraphQLNonNull(GraphQLID)},
                        text: {type: GraphQLString},
                        mediaId: {type: GraphQLID},
                        allowMultipleAnswers: {type: GraphQLBoolean},
                    },
                    resolve: async (_, args) => {
                        const question = await Question.findByPk(args.id);
                        if (!question) {
                            return null;
                        }
                        return await question.update(args);
                    }
                },
                deleteQuestion: {
                    type: GraphQLBoolean,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        const question = await Question.findByPk(args.id);
                        if (!question) {
                            return false;
                        }

                        await question.destroy();
                        return true;
                    },
                },
                createQuiz: {
                    type: quizType,
                    args: {
                        title: {type: new GraphQLNonNull(GraphQLString)},
                        description: {type: new GraphQLNonNull(GraphQLString)},
                    },
                    resolve: async (_, args) => {
                        return await Quiz.create(args)
                    },
                },
                editQuiz: {
                    type: quizType,
                    args: {
                        id: {type: new GraphQLNonNull(GraphQLID)},
                        title: {type: GraphQLString},
                        description: {type: GraphQLString},
                    },
                    resolve: async (_, args) => {
                        return await Quiz.findByPk(args.idquiz.update(args))
                    }
                },
                deleteQuiz: {
                    type: GraphQLBoolean,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        const quiz = await Quiz.findByPk(args.id);
                        if (!quiz) {
                            return false;
                        }
                        await quiz.destroy()
                        return true;
                    },
                },
                createUser: {
                    type: userType,
                    args: {
                        username: {type: new GraphQLNonNull(GraphQLString)},
                        password: {type: new GraphQLNonNull(GraphQLString)},
                        role: {type: new GraphQLNonNull(roleType)},
                    },
                    resolve: async (_, args) => {
                        return await User.create(args)
                    },
                },
                changeUserPassword: {
                    type: userType,
                    args: {
                        id: {type: new GraphQLNonNull(GraphQLID)},
                        oldPassword: {type: new GraphQLNonNull(GraphQLString)},
                        newPassword: {type: new GraphQLNonNull(GraphQLString)},
                    },
                    resolve: async (_, args) => {
                        const user = await User.findByPk(args.id);
                        if (
                            !user ||
                            !bcrypt.compareSync(
                                args.oldPassword,
                                user.getDataValue("password"),
                            )
                        ) {
                            return null;
                        }

                        user.setDataValue("password", args.newPassword);
                        user.setDataValue("needsPasswordChange", false);
                        return user.save();
                    }
                },
                changeUserPasswordAdmin: {
                    type: userType,
                    args: {
                        id: {type: new GraphQLNonNull(GraphQLID)},
                        newPassword: {type: new GraphQLNonNull(GraphQLString)},
                    },
                    resolve: async (_, args) => {
                        const user = await User.findByPk(args.id);
                        if (!user) {
                            return null;
                        }

                        user.setDataValue("password", args.newPassword);
                        user.setDataValue("needsPasswordChange", true);
                        return user.save();

                    }
                },
                modifyUser: {
                    type: userType,
                    args: {
                        id: {type: new GraphQLNonNull(GraphQLID)},
                        username: {type: GraphQLString},
                        role: {type: roleType},
                    },
                    resolve: async (_, args) => {
                        const user = await User.findByPk(args.id);
                        if (!user) {
                            return null;
                        }

                        return await user.update(args);
                    },
                },
                deleteUser: {
                    type: GraphQLBoolean,
                    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
                    resolve: async (_, args) => {
                        const user = await User.findByPk(args.id);
                        if (!user) {
                            return false;
                        }

                        await user.destroy()
                        return true;
                    },
                },
                submitAttempt: {
                    // returns a quiz and an attempt type
                    type: new GraphQLObjectType({
                        name: "SubmitAttempt",
                        fields: {
                            quiz: {type: quizType},
                            attempt: {type: attemptType},
                        },
                    }),
                    args: {
                        quizId: {type: new GraphQLNonNull(GraphQLID)},
                        nickname: {type: new GraphQLNonNull(GraphQLString)},
                        answers: {
                            type: new GraphQLNonNull(
                                new GraphQLList(
                                    new GraphQLInputObjectType({
                                        name: "Answer",
                                        fields: {
                                            questionId: {type: new GraphQLNonNull(GraphQLID)},
                                            optionIds: {
                                                type: new GraphQLNonNull(
                                                    new GraphQLList(new GraphQLNonNull(GraphQLID)),
                                                ),
                                            },
                                        },
                                    }),
                                ),
                            ),
                        },
                        time: {type: new GraphQLNonNull(GraphQLInt)},
                    },
                    resolve: async (_, args) => {
                        let score = 0;
                        let total = 0;
                        const quiz = await Quiz.findByPk(args.quizId);
                        if (!quiz) {
                            return false;
                        }
                        const questions = await Question.findAll({
                            where: {quizId: quiz.getDataValue("id")},
                        });
                        if (!questions) {
                            return false;
                        }
                        const options = await Option.findAll({
                            where: {
                                questionId: questions.map((question) =>
                                    question.getDataValue("id"),
                                ),
                            },
                        });
                        if (!options) {
                            return false;
                        }
                        for (const question of questions) {
                            const correctOptions = options.filter(
                                (option) =>
                                    option.getDataValue("questionId") ===
                                    question.getDataValue("id") &&
                                    option.getDataValue("isCorrect"),
                            );
                            const incorrectOptions = options.filter(
                                (option) =>
                                    option.getDataValue("questionId") ===
                                    question.getDataValue("id") &&
                                    !option.getDataValue("isCorrect"),
                            );
                            const answer = args.answers.find(
                                (answer: { questionId: string }) =>
                                    answer.questionId === question.getDataValue("id").toString(),
                            );
                            if (question.getDataValue("allowMultipleAnswers")) {
                                total += correctOptions.length;
                                score += Math.max(
                                    correctOptions.filter((option) =>
                                        answer?.optionIds.includes(
                                            option.getDataValue("id").toString(),
                                        ),
                                    ).length -
                                    incorrectOptions.filter((option) =>
                                        answer?.optionIds.includes(
                                            option.getDataValue("id").toString(),
                                        ),
                                    ).length,
                                    0,
                                );
                            } else {
                                total += 1;
                                score += correctOptions.some((option) =>
                                    answer?.optionIds.includes(
                                        option.getDataValue("id").toString(),
                                    ),
                                )
                                    ? 1
                                    : 0;
                            }
                        }
                        const attempt = await Attempt.create({
                            quizId: args.quizId,
                            nickname: args.nickname,
                            score,
                            total,
                            time: args.time,
                        });

                        return {quiz, attempt};
                    },
                },
            },
        }),
    }),
    permissions,
);
