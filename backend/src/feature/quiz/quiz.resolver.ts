import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { quizType } from "./quiz.schema.ts";
import { Quiz } from "./quiz.orm.ts";

export const quizzes = {
  type: new GraphQLList(new GraphQLNonNull(quizType)),
  resolve: async () => {
    return await Quiz.findAll({ order: [["createdAt", "DESC"]] });
  },
};

export const quiz = {
  type: quizType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_: any, args: { id: number }) => {
    return await Quiz.findByPk(args.id);
  },
};

export const createQuiz = {
  type: quizType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_: any, args: { title: string; description: string }) => {
    return await Quiz.create(args);
  },
};

export const editQuiz = {
  type: quizType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  resolve: async (
    _: any,
    args: { id: number; title?: string; description?: string },
  ) => {
    const quiz = await Quiz.findByPk(args.id);
    if (!quiz) {
      return null;
    }
    return await quiz.update(args);
  },
};

export const deleteQuiz = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_: any, args: { id: number }) => {
    const quiz = await Quiz.findByPk(args.id);
    if (!quiz) {
      return false;
    }
    await quiz.destroy();
    return true;
  },
};
