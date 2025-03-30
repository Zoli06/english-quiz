"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var graphql_1 = require("graphql");
var graphql_middleware_1 = require("graphql-middleware");
var media_1 = require("./models/media");
var option_1 = require("./models/option");
var question_1 = require("./models/question");
var quiz_1 = require("./models/quiz");
var user_1 = require("./models/user");
var attempt_1 = require("./models/attempt");
var permissions_1 = require("./permissions");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
var sequelize_1 = require("sequelize");
var path_1 = __importDefault(require("path"));
var graphql_upload_minimal_1 = require("graphql-upload-minimal");
var fs_1 = __importDefault(require("fs"));
var roleType = new graphql_1.GraphQLEnumType({
    name: "Role",
    values: {
        admin: { value: permissions_1.Role.Admin },
        editor: { value: permissions_1.Role.Editor },
    },
});
var getMediaTypeAndValidate = function (url) {
    // Check if media is an image or video
    var allowedImageExtensions = JSON.parse(process.env.ALLOWED_IMAGE_TYPES || "[]");
    var allowedVideoExtensions = JSON.parse(process.env.ALLOWED_VIDEO_TYPES || "[]");
    var extension = path_1.default.extname(url).toLowerCase().replace(".", "");
    if (allowedImageExtensions.includes(extension)) {
        return "image";
    }
    if (allowedVideoExtensions.includes(extension)) {
        return "video";
    }
    return null;
};
var saveFile = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var type, filePath;
    var file = _b.file;
    return __generator(this, function (_c) {
        type = getMediaTypeAndValidate(file.filename);
        if (!type) {
            return [2 /*return*/, null];
        }
        // Create uploads folder if it doesn't exist
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, "uploads"))) {
            fs_1.default.mkdirSync(path_1.default.join(__dirname, "uploads"));
        }
        filePath = path_1.default.join(__dirname, "uploads", "".concat(Math.random().toString(36).substring(2)).concat(path_1.default
            .extname(file.filename)
            .toLowerCase()));
        file.createReadStream().pipe(fs_1.default.createWriteStream(filePath));
        return [2 /*return*/, filePath.replace(__dirname, "")];
    });
}); };
exports.schema = (0, graphql_middleware_1.applyMiddleware)(new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: {
            media: {
                type: media_1.mediaType,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) { return media_1.Media.findByPk(args.id); },
            },
            option: {
                type: option_1.optionType,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) { return option_1.Option.findByPk(args.id); },
            },
            question: {
                type: question_1.questionType,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) { return question_1.Question.findByPk(args.id); },
            },
            quiz: {
                type: quiz_1.quizType,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) { return quiz_1.Quiz.findByPk(args.id); },
            },
            quizzes: {
                type: new graphql_1.GraphQLList(quiz_1.quizType),
                resolve: function () { return quiz_1.Quiz.findAll({ order: [["createdAt", "DESC"]] }); },
            },
            attempt: {
                type: attempt_1.attemptType,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) { return attempt_1.Attempt.findByPk(args.id); },
            },
            topAttempts: {
                type: new graphql_1.GraphQLList(attempt_1.attemptType),
                args: {
                    quizId: { type: graphql_1.GraphQLID },
                    limit: { type: graphql_1.GraphQLInt },
                },
                resolve: function (_, args) {
                    // Order by percentage score, then by time
                    return attempt_1.Attempt.findAll({
                        where: args.quizId ? { quizId: args.quizId } : {},
                        order: [
                            sequelize_1.Sequelize.literal("score/total DESC"),
                            ["time", "ASC"],
                            ["createdAt", "ASC"],
                        ],
                        limit: args.limit,
                    });
                },
            },
            user: {
                type: user_1.userType,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) { return user_1.User.findByPk(args.id); },
            },
            getToken: {
                type: graphql_1.GraphQLString,
                args: {
                    username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                },
                resolve: function (_, args) {
                    return user_1.User.findOne({ where: { username: args.username } }).then(function (user) {
                        if (user &&
                            bcrypt_1.default.compareSync(args.password, user.getDataValue("password"))) {
                            return jsonwebtoken_1.default.sign({ id: user.getDataValue("id") }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
                        }
                        return null;
                    });
                },
            },
        },
    }),
    mutation: new graphql_1.GraphQLObjectType({
        name: "Mutation",
        fields: {
            createMedia: {
                type: media_1.mediaType,
                args: {
                    file: { type: graphql_upload_minimal_1.GraphQLUpload },
                    title: { type: graphql_1.GraphQLString },
                },
                resolve: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
                    var file, type, filePath;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!args.file) {
                                    return [2 /*return*/, null];
                                }
                                return [4 /*yield*/, args.file];
                            case 1:
                                file = _a.sent();
                                type = getMediaTypeAndValidate(file.filename);
                                if (!type) {
                                    return [2 /*return*/, null];
                                }
                                return [4 /*yield*/, saveFile({ file: file })];
                            case 2:
                                filePath = _a.sent();
                                return [4 /*yield*/, media_1.Media.create({
                                        url: filePath.replace(__dirname, ""),
                                        title: args.title,
                                        type: type,
                                    })];
                            case 3: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); },
            },
            editMedia: {
                type: media_1.mediaType,
                args: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    file: { type: graphql_upload_minimal_1.GraphQLUpload },
                    title: { type: graphql_1.GraphQLString },
                },
                resolve: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
                    var media, file, type, filePath;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, media_1.Media.findByPk(args.id)];
                            case 1:
                                media = _a.sent();
                                if (!media) {
                                    return [2 /*return*/, null];
                                }
                                if (!args.file) return [3 /*break*/, 4];
                                return [4 /*yield*/, args.file];
                            case 2:
                                file = _a.sent();
                                type = getMediaTypeAndValidate(file.filename);
                                if (!type) {
                                    return [2 /*return*/, null];
                                }
                                return [4 /*yield*/, saveFile({ file: file })];
                            case 3:
                                filePath = _a.sent();
                                fs_1.default.unlink(path_1.default.join(__dirname, media.getDataValue("url")), function () { });
                                media.setDataValue("type", type);
                                media.setDataValue("url", filePath.replace(__dirname, ""));
                                _a.label = 4;
                            case 4:
                                if (args.title) {
                                    media.setDataValue("title", args.title);
                                }
                                return [4 /*yield*/, media.save()];
                            case 5:
                                _a.sent();
                                return [2 /*return*/, media];
                        }
                    });
                }); },
            },
            deleteMedia: {
                type: graphql_1.GraphQLBoolean,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) {
                    media_1.Media.findByPk(args.id).then(function (media) {
                        fs_1.default.unlink(path_1.default.join(__dirname, media.getDataValue("url")), function () {
                            media.destroy().then();
                        });
                    });
                    return true;
                },
            },
            createOption: {
                type: option_1.optionType,
                args: {
                    questionId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    isCorrect: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
                },
                resolve: function (_, args) { return option_1.Option.create(args); },
            },
            editOption: {
                type: option_1.optionType,
                args: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    text: { type: graphql_1.GraphQLString },
                    isCorrect: { type: graphql_1.GraphQLBoolean },
                },
                resolve: function (_, args) {
                    return option_1.Option.findByPk(args.id).then(function (option) { return option.update(args); });
                },
            },
            deleteOption: {
                type: graphql_1.GraphQLBoolean,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) {
                    option_1.Option.findByPk(args.id).then(function (option) { return option.destroy(); });
                    return true;
                },
            },
            createQuestion: {
                type: question_1.questionType,
                args: {
                    quizId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    mediaId: { type: graphql_1.GraphQLID },
                    allowMultipleAnswers: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
                },
                resolve: function (_, args) { return question_1.Question.create(args); },
            },
            editQuestion: {
                type: question_1.questionType,
                args: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    text: { type: graphql_1.GraphQLString },
                    mediaId: { type: graphql_1.GraphQLID },
                    allowMultipleAnswers: { type: graphql_1.GraphQLBoolean },
                },
                resolve: function (_, args) {
                    return question_1.Question.findByPk(args.id).then(function (question) {
                        return question.update(args);
                    });
                },
            },
            deleteQuestion: {
                type: graphql_1.GraphQLBoolean,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) {
                    question_1.Question.findByPk(args.id).then(function (question) { return question.destroy(); });
                    return true;
                },
            },
            createQuiz: {
                type: quiz_1.quizType,
                args: {
                    title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                },
                resolve: function (_, args) {
                    console.log(args);
                    quiz_1.Quiz.create(args);
                },
            },
            editQuiz: {
                type: quiz_1.quizType,
                args: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    title: { type: graphql_1.GraphQLString },
                    description: { type: graphql_1.GraphQLString },
                },
                resolve: function (_, args) {
                    return quiz_1.Quiz.findByPk(args.id).then(function (quiz) { return quiz.update(args); });
                },
            },
            deleteQuiz: {
                type: graphql_1.GraphQLBoolean,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) {
                    quiz_1.Quiz.findByPk(args.id).then(function (quiz) { return quiz.destroy(); });
                    return true;
                },
            },
            createUser: {
                type: user_1.userType,
                args: {
                    username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    role: { type: new graphql_1.GraphQLNonNull(roleType) },
                },
                resolve: function (_, args) { return user_1.User.create(args); },
            },
            changeUserPassword: {
                type: user_1.userType,
                args: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    oldPassword: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    newPassword: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                },
                resolve: function (_, args) {
                    return user_1.User.findByPk(args.id).then(function (user) {
                        if (user &&
                            bcrypt_1.default.compareSync(args.oldPassword, user.getDataValue("password"))) {
                            user.setDataValue("password", args.newPassword);
                            user.setDataValue("needsPasswordChange", false);
                            return user.save();
                        }
                        return null;
                    });
                },
            },
            changeUserPasswordAdmin: {
                type: user_1.userType,
                args: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    newPassword: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                },
                resolve: function (_, args) {
                    return user_1.User.findByPk(args.id).then(function (user) {
                        if (user) {
                            user.setDataValue("password", args.newPassword);
                            user.setDataValue("needsPasswordChange", true);
                            return user.save();
                        }
                        return null;
                    });
                },
            },
            modifyUser: {
                type: user_1.userType,
                args: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    username: { type: graphql_1.GraphQLString },
                    role: { type: roleType },
                },
                resolve: function (_, args) {
                    return user_1.User.findByPk(args.id).then(function (user) { return user.update(args); });
                },
            },
            deleteUser: {
                type: graphql_1.GraphQLBoolean,
                args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
                resolve: function (_, args) {
                    user_1.User.findByPk(args.id).then(function (user) { return user.destroy(); });
                    return true;
                },
            },
            submitAttempt: {
                // returns a quiz and an attempt type
                type: new graphql_1.GraphQLObjectType({
                    name: "SubmitAttempt",
                    fields: {
                        quiz: { type: quiz_1.quizType },
                        attempt: { type: attempt_1.attemptType },
                    },
                }),
                args: {
                    quizId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                    nickname: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    answers: {
                        type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLInputObjectType({
                            name: "Answer",
                            fields: {
                                questionId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                                optionIds: {
                                    type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLID))),
                                },
                            },
                        }))),
                    },
                    time: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                },
                resolve: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
                    var score, total, quiz, questions, options, _loop_1, _i, questions_1, question, attempt;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                score = 0;
                                total = 0;
                                return [4 /*yield*/, quiz_1.Quiz.findByPk(args.quizId)];
                            case 1:
                                quiz = _a.sent();
                                if (!quiz) {
                                    return [2 /*return*/, false];
                                }
                                return [4 /*yield*/, question_1.Question.findAll({
                                        where: { quizId: quiz.getDataValue("id") },
                                    })];
                            case 2:
                                questions = _a.sent();
                                if (!questions) {
                                    return [2 /*return*/, false];
                                }
                                return [4 /*yield*/, option_1.Option.findAll({
                                        where: {
                                            questionId: questions.map(function (question) {
                                                return question.getDataValue("id");
                                            }),
                                        },
                                    })];
                            case 3:
                                options = _a.sent();
                                if (!options) {
                                    return [2 /*return*/, false];
                                }
                                _loop_1 = function (question) {
                                    var correctOptions = options.filter(function (option) {
                                        return option.getDataValue("questionId") ===
                                            question.getDataValue("id") &&
                                            option.getDataValue("isCorrect");
                                    });
                                    var incorrectOptions = options.filter(function (option) {
                                        return option.getDataValue("questionId") ===
                                            question.getDataValue("id") &&
                                            !option.getDataValue("isCorrect");
                                    });
                                    var answer = args.answers.find(function (answer) {
                                        return answer.questionId === question.getDataValue("id").toString();
                                    });
                                    if (question.getDataValue("allowMultipleAnswers")) {
                                        total += correctOptions.length;
                                        score += Math.max(correctOptions.filter(function (option) {
                                            return answer === null || answer === void 0 ? void 0 : answer.optionIds.includes(option.getDataValue("id").toString());
                                        }).length -
                                            incorrectOptions.filter(function (option) {
                                                return answer === null || answer === void 0 ? void 0 : answer.optionIds.includes(option.getDataValue("id").toString());
                                            }).length, 0);
                                    }
                                    else {
                                        total += 1;
                                        score += correctOptions.some(function (option) {
                                            return answer === null || answer === void 0 ? void 0 : answer.optionIds.includes(option.getDataValue("id").toString());
                                        })
                                            ? 1
                                            : 0;
                                    }
                                };
                                for (_i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
                                    question = questions_1[_i];
                                    _loop_1(question);
                                }
                                return [4 /*yield*/, attempt_1.Attempt.create({
                                        quizId: args.quizId,
                                        nickname: args.nickname,
                                        score: score,
                                        total: total,
                                        time: args.time,
                                    })];
                            case 4:
                                attempt = _a.sent();
                                return [2 /*return*/, { quiz: quiz, attempt: attempt }];
                        }
                    });
                }); },
            },
        },
    }),
}), permissions_1.permissions);
