import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { resultType } from "./result.schema.ts";
import { Result } from "./result.orm.ts";
import { Sequelize } from "sequelize";
import { Quiz } from "../quiz/quiz.orm.ts";
import { Question } from "../question/question.orm.ts";
import { Option } from "../option/option.orm.ts";

export const result = {
  type: resultType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_: any, args: { id: number }) => {
    return await Result.findByPk(args.id);
  },
};

export const createResult = {
  // returns a quiz and a result type
  type: resultType,
  args: {
    quizId: { type: new GraphQLNonNull(GraphQLID) },
    nickname: { type: new GraphQLNonNull(GraphQLString) },
    answers: {
      type: new GraphQLNonNull(
        new GraphQLList(
          new GraphQLInputObjectType({
            name: "Answer",
            fields: {
              questionId: { type: new GraphQLNonNull(GraphQLID) },
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
    time: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (
    _: any,
    args: {
      quizId: number;
      nickname: string;
      answers: { questionId: string; optionIds: string[] }[];
      time: number;
    },
  ) => {
    const quiz = await Quiz.findByPk(args.quizId);
    if (!quiz) {
      return null;
    }
    const questions = await Question.findAll({
      where: { quizId: quiz.getDataValue("id") },
    });
    const options = await Option.findAll({
      where: {
        questionId: questions.map((question) => question.getDataValue("id")),
      },
    });
    let score = 0;
    const total = questions.length;
    for (const question of questions) {
      const correctOptions = options.filter(
        (option) =>
          option.getDataValue("questionId") === question.getDataValue("id") &&
          option.getDataValue("isCorrect"),
      );
      const incorrectOptions = options.filter(
        (option) =>
          option.getDataValue("questionId") === question.getDataValue("id") &&
          !option.getDataValue("isCorrect"),
      );
      const answer = args.answers.find(
        (answer) =>
          parseInt(answer.questionId) === question.getDataValue("id"),
      );
      if (question.getDataValue("allowMultipleAnswers")) {
        const allCorrect = correctOptions.every((option) =>
          answer?.optionIds.includes(option.getDataValue("id")),
        );
        const noIncorrect = incorrectOptions.every(
          (option) =>
            !answer?.optionIds.includes(option.getDataValue("id")),
        );
        score += allCorrect && noIncorrect ? 1 : 0;
      } else {
        score += correctOptions.some((option) =>
          answer?.optionIds.includes(
            option.getDataValue("id")
          ),
        )
          ? 1
          : 0;
      }
    }
    return await Result.create({
      quizId: args.quizId,
      nickname: args.nickname,
      score,
      total,
      time: args.time,
    });
  },
};

export const clearResults = {
  type: GraphQLInt,
  args: {
    quizId: { type: GraphQLID },
  },
  resolve: async (_: any, args: { quizId?: number }) => {
    const whereClause = args.quizId ? { quizId: args.quizId } : {};
    return await Result.destroy({ where: whereClause });
  },
};
