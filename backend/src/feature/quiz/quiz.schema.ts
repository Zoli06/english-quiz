import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import { GraphQLID } from "graphql/type/index.js";
import { Quiz } from "./quiz.orm.ts";
import { questionType } from "../question/question.schema.ts";
import { Question } from "../question/question.orm.ts";
import { resultType } from "../result/result.schema.ts";
import { Result } from "../result/result.orm.ts";
import { Sequelize } from "sequelize";
import type { FindOptions } from "sequelize";
import { GraphQLInt } from "graphql";

export let quizType = new GraphQLObjectType({
  name: "Quiz",
  fields: {
    ...graphqlSequelize.attributeFields(Quiz, {
      exclude: ["quizId"],
    }),
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    questions: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(questionType)),
      ),
      resolve: async (parent) =>
        await Question.findAll({
          where: { quizId: parent.id },
          order: [["createdAt", "DESC"]],
        }),
    },
    results: {
      get type() {
        return new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(resultType)),
        );
      },
      args: {
        limit: { type: GraphQLInt },
      },
      resolve: async (parent, args: { limit?: number }) => {
        const options = {
          where: { quizId: parent.id },
          order: [
            Sequelize.literal("score/total DESC"),
            ["time", "ASC"],
            ["createdAt", "ASC"],
          ],
        } as FindOptions;

        if (args.limit) {
          Object.assign(options, { limit: args.limit });
        }

        return await Result.findAll(options);
      },
    },
  },
});
