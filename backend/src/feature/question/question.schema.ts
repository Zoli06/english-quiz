import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import { GraphQLID } from "graphql/type/index.js";
import { optionType } from "../option/option.schema.ts";
import { Option } from "../option/option.orm.ts";
import { mediaType } from "../media/media.schema.ts";
import { Media } from "../media/media.orm.ts";
import { Question } from "./question.orm.ts";

export const questionType: GraphQLObjectType = new GraphQLObjectType({
  name: "Question",
  fields: {
    ...graphqlSequelize.attributeFields(Question, {
      exclude: ["quizId", "mediaId"],
    }),
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    options: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(optionType))),
      resolve: async (parent) =>
        await Option.findAll({ where: { questionId: parent.id } }),
    },
    answers: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(optionType))),
      resolve: async (parent) =>
        await Option.findAll({
          where: { questionId: parent.id, isCorrect: true },
        }),
    },
    media: {
      type: mediaType,
      resolve: async (parent) => {
        if (!parent.mediaId) return null;
        return await Media.findOne({ where: { id: parent.mediaId } });
      },
    },
  },
});
