import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLID,
} from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { Media, mediaType } from './models/media';
import { Option, optionType } from './models/option';
import { Question, questionType } from './models/question';
import { Quiz, quizType } from './models/quiz';
import { User, userType } from './models/user';
import { Attempt, attemptType } from './models/attempt';
import { permissions, Role } from './permissions';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Sequelize } from 'sequelize';
import path from 'path';
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';
import fs from 'fs';

const roleType = new GraphQLEnumType({
  name: 'Role',
  values: {
    admin: { value: Role.Admin },
    editor: { value: Role.Editor },
  },
});

const getMediaTypeAndValidate = (url: string) => {
  // Check if media is an image or video
  const allowedImageExtensions = JSON.parse(
    process.env.ALLOWED_IMAGE_TYPES || '[]'
  );
  const allowedVideoExtensions = JSON.parse(
    process.env.ALLOWED_VIDEO_TYPES || '[]'
  );
  const extension = path.extname(url).toLowerCase().replace('.', '');
  if (allowedImageExtensions.includes(extension)) {
    return 'image';
  }
  if (allowedVideoExtensions.includes(extension)) {
    return 'video';
  }
  return null;
};

const saveFile = async ({ file }: Upload) => {
  const type = getMediaTypeAndValidate(file.filename);
  if (!type) {
    return null;
  }
  // Create uploads folder if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
  }
  // Save file
  const filePath = path.join(
    __dirname,
    'uploads',
    `${Math.random().toString(36).substring(2)}${path
      .extname(file.filename)
      .toLowerCase()}`
  );
  await file.createReadStream().pipe(fs.createWriteStream(filePath));
  return filePath.replace(__dirname, '');
};

export const schema = applyMiddleware(
  new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        media: {
          type: mediaType,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => Media.findByPk(args.id),
        },
        option: {
          type: optionType,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => Option.findByPk(args.id),
        },
        question: {
          type: questionType,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => Question.findByPk(args.id),
        },
        quiz: {
          type: quizType,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => Quiz.findByPk(args.id),
        },
        quizzes: {
          type: new GraphQLList(quizType),
          resolve: () => Quiz.findAll({ order: [['createdAt', 'DESC']] }),
        },
        attempt: {
          type: attemptType,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => Attempt.findByPk(args.id),
        },
        topAttempts: {
          type: new GraphQLList(attemptType),
          args: {
            quizId: { type: GraphQLID },
            limit: { type: GraphQLInt },
          },
          resolve: (_, args) =>
            // Order by percentage score, then by time
            Attempt.findAll({
              where: args.quizId ? { quizId: args.quizId } : {},
              order: [
                Sequelize.literal('score/total DESC'),
                ['time', 'ASC'],
                ['createdAt', 'ASC'],
              ],
              limit: args.limit,
            }),
        },
        user: {
          type: userType,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => User.findByPk(args.id),
        },
        getToken: {
          type: GraphQLString,
          args: {
            username: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
          },
          resolve: (_, args) =>
            User.findOne({ where: { username: args.username } }).then(
              (user) => {
                if (
                  user &&
                  bcrypt.compareSync(
                    args.password,
                    user.getDataValue('password')
                  )
                ) {
                  return jwt.sign(
                    { id: user.getDataValue('id') },
                    process.env.JWT_SECRET || '',
                    { expiresIn: '1d' }
                  );
                }
                return null;
              }
            ),
        },
      },
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        createMedia: {
          type: mediaType,
          args: {
            file: { type: GraphQLUpload },
            title: { type: GraphQLString },
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
            const filePath = await saveFile({ file } as Upload);
            const media = await Media.create({
              url: filePath.replace(__dirname, ''),
              title: args.title,
              type,
            });
            return media;
          },
        },
        editMedia: {
          type: mediaType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            file: { type: GraphQLUpload },
            title: { type: GraphQLString },
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
              const filePath = await saveFile({ file } as Upload);
              fs.unlink(
                path.join(__dirname, media.getDataValue('url')),
                () => {}
              );
              media.setDataValue('type', type);
              media.setDataValue('url', filePath.replace(__dirname, ''));
            }
            if (args.title) {
              media.setDataValue('title', args.title);
            }
            await media.save();
            return media;
          },
        },
        deleteMedia: {
          type: GraphQLBoolean,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => {
            Media.findByPk(args.id).then((media) => {
              fs.unlink(path.join(__dirname, media.getDataValue('url')), () => {
                media.destroy();
              });
            });
            return true;
          },
        },
        createOption: {
          type: optionType,
          args: {
            questionId: { type: new GraphQLNonNull(GraphQLID) },
            text: { type: new GraphQLNonNull(GraphQLString) },
            isCorrect: { type: new GraphQLNonNull(GraphQLBoolean) },
          },
          resolve: (_, args) => Option.create(args),
        },
        editOption: {
          type: optionType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            text: { type: GraphQLString },
            isCorrect: { type: GraphQLBoolean },
          },
          resolve: (_, args) =>
            Option.findByPk(args.id).then((option) => option.update(args)),
        },
        deleteOption: {
          type: GraphQLBoolean,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => {
            Option.findByPk(args.id).then((option) => option.destroy());
            return true;
          },
        },
        createQuestion: {
          type: questionType,
          args: {
            quizId: { type: new GraphQLNonNull(GraphQLID) },
            text: { type: new GraphQLNonNull(GraphQLString) },
            mediaId: { type: GraphQLID },
            allowMultipleAnswers: { type: new GraphQLNonNull(GraphQLBoolean) },
          },
          resolve: (_, args) => Question.create(args),
        },
        editQuestion: {
          type: questionType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            text: { type: GraphQLString },
            mediaId: { type: GraphQLID },
            allowMultipleAnswers: { type: GraphQLBoolean },
          },
          resolve: (_, args) =>
            Question.findByPk(args.id).then((question) =>
              question.update(args)
            ),
        },
        deleteQuestion: {
          type: GraphQLBoolean,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => {
            Question.findByPk(args.id).then((question) => question.destroy());
            return true;
          },
        },
        createQuiz: {
          type: quizType,
          args: {
            title: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
          },
          resolve: (_, args) => Quiz.create(args),
        },
        editQuiz: {
          type: quizType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
          },
          resolve: (_, args) =>
            Quiz.findByPk(args.id).then((quiz) => quiz.update(args)),
        },
        deleteQuiz: {
          type: GraphQLBoolean,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => {
            Quiz.findByPk(args.id).then((quiz) => quiz.destroy());
            return true;
          },
        },
        createUser: {
          type: userType,
          args: {
            username: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            role: { type: new GraphQLNonNull(roleType) },
          },
          resolve: (_, args) => User.create(args),
        },
        changeUserPassword: {
          type: userType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            oldPassword: { type: new GraphQLNonNull(GraphQLString) },
            newPassword: { type: new GraphQLNonNull(GraphQLString) },
          },
          resolve: (_, args) =>
            User.findByPk(args.id).then((user) => {
              if (
                user &&
                bcrypt.compareSync(
                  args.oldPassword,
                  user.getDataValue('password')
                )
              ) {
                user.setDataValue('password', args.newPassword);
                user.setDataValue('needsPasswordChange', false);
                return user.save();
              }
              return null;
            }),
        },
        changeUserPasswordAdmin: {
          type: userType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            newPassword: { type: new GraphQLNonNull(GraphQLString) },
          },
          resolve: (_, args) =>
            User.findByPk(args.id).then((user) => {
              if (user) {
                user.setDataValue('password', args.newPassword);
                user.setDataValue('needsPasswordChange', true);
                return user.save();
              }
              return null;
            }),
        },
        modifyUser: {
          type: userType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            username: { type: GraphQLString },
            role: { type: roleType },
          },
          resolve: (_, args) =>
            User.findByPk(args.id).then((user) => user.update(args)),
        },
        deleteUser: {
          type: GraphQLBoolean,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve: (_, args) => {
            User.findByPk(args.id).then((user) => user.destroy());
            return true;
          },
        },
        submitAttempt: {
          // returns a quiz and an attempt type
          type: new GraphQLObjectType({
            name: 'SubmitAttempt',
            fields: {
              quiz: { type: quizType },
              attempt: { type: attemptType },
            },
          }),
          args: {
            quizId: { type: new GraphQLNonNull(GraphQLID) },
            nickname: { type: new GraphQLNonNull(GraphQLString) },
            answers: {
              type: new GraphQLNonNull(
                new GraphQLList(
                  new GraphQLInputObjectType({
                    name: 'Answer',
                    fields: {
                      questionId: { type: new GraphQLNonNull(GraphQLID) },
                      optionIds: {
                        type: new GraphQLNonNull(
                          new GraphQLList(new GraphQLNonNull(GraphQLID))
                        ),
                      },
                    },
                  })
                )
              ),
            },
            time: { type: new GraphQLNonNull(GraphQLInt) },
          },
          resolve: async (_, args) => {
            let score = 0;
            let total = 0;
            const quiz = await Quiz.findByPk(args.quizId);
            if (!quiz) {
              return false;
            }
            const questions = await Question.findAll({
              where: { quizId: quiz.getDataValue('id') },
            });
            if (!questions) {
              return false;
            }
            const options = await Option.findAll({
              where: {
                questionId: questions.map((question) =>
                  question.getDataValue('id')
                ),
              },
            });
            if (!options) {
              return false;
            }
            for (const question of questions) {
              const correctOptions = options.filter(
                (option) =>
                  option.getDataValue('questionId') ===
                    question.getDataValue('id') &&
                  option.getDataValue('isCorrect')
              );
              const incorrectOptions = options.filter(
                (option) =>
                  option.getDataValue('questionId') ===
                    question.getDataValue('id') &&
                  !option.getDataValue('isCorrect')
              );
              const answer = args.answers.find(
                (answer: { questionId: string }) =>
                  answer.questionId === question.getDataValue('id').toString()
              );
              if (question.getDataValue('allowMultipleAnswers')) {
                total += correctOptions.length;
                score += Math.max(
                  correctOptions.filter((option) =>
                    answer?.optionIds.includes(
                      option.getDataValue('id').toString()
                    )
                  ).length -
                    incorrectOptions.filter((option) =>
                      answer?.optionIds.includes(
                        option.getDataValue('id').toString()
                      )
                    ).length,
                  0
                );
              } else {
                total += 1;
                score += correctOptions.some((option) =>
                  answer?.optionIds.includes(
                    option.getDataValue('id').toString()
                  )
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

            return { quiz, attempt };
          },
        },
      },
    }),
  }),
  permissions
);
