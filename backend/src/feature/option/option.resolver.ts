import { optionType } from "./option.schema.ts";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { Option } from "./option.orm.ts";

export const createOption = {
  type: optionType,
  args: {
    questionId: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    isCorrect: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  resolve: async (
    _: any,
    args: {
      questionId: number;
      text: string;
      isCorrect: boolean;
    },
  ) => {
    return await Option.create(args);
  },
};

export const editOption = {
  type: optionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: GraphQLString },
    isCorrect: { type: GraphQLBoolean },
  },
  resolve: async (
    _: any,
    args: {
      id: number;
      text?: string;
      isCorrect?: boolean;
    },
  ) => {
    const option = await Option.findByPk(args.id);
    if (!option) {
      return null;
    }
    return await option.update(args);
  },
};

export const deleteOption = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_: any, args: { id: number }) => {
    const option = await Option.findByPk(args.id);
    if (!option) {
      return false;
    }
    await option.destroy();
    return true;
  },
};
