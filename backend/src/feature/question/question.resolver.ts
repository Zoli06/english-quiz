import { questionType } from "./question.schema.ts";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { Question } from "./question.orm.ts";

export const createQuestion = {
  type: questionType,
  args: {
    quizId: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    mediaId: { type: GraphQLID },
    allowMultipleAnswers: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  resolve: async (
    _: any,
    args: {
      quizId: string;
      text: string;
      mediaId?: string;
      allowMultipleAnswers: boolean;
    },
  ) => {
    return await Question.create(args);
  },
};

export const editQuestion = {
  type: questionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: GraphQLString },
    mediaId: { type: GraphQLID },
    allowMultipleAnswers: { type: GraphQLBoolean },
  },
  resolve: async (
    _: any,
    args: {
      id: string;
      text?: string;
      mediaId?: string;
      allowMultipleAnswers?: boolean;
    },
  ) => {
    const question = await Question.findByPk(args.id);
    if (!question) {
      return null;
    }
    return await question.update(args);
  },
};

export const deleteQuestion = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_: any, args: { id: string }) => {
    const question = await Question.findByPk(args.id);
    if (!question) {
      return false;
    }

    await question.destroy();
    return true;
  },
};

export const moveQuestion = {
  type: questionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    quizId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_: any, args: { id: string; quizId: string }) => {
    const question = await Question.findByPk(args.id);
    if (!question) {
      return null;
    }
    return await question.update({ quizId: args.quizId });
  },
};
