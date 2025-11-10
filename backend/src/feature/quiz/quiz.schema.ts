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
import type { FindOptions } from "sequelize";
import { Sequelize } from "sequelize";
import { GraphQLInt } from "graphql";
import { seededShuffle } from "../../utils.ts";

export let quizType = new GraphQLObjectType({
  name: "Quiz",
  fields: {
    ...graphqlSequelize.attributeFields(Quiz),
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    questions: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(questionType)),
      ),
      args: {
        shuffleSeed: { type: GraphQLInt },
      },
      resolve: async (parent, args: { shuffleSeed?: number }) => {
        {
          const questions = await Question.findAll({
            where: { quizId: parent.id },
            // Default order
            order: [["createdAt", "DESC"]],
          });

          if (args.shuffleSeed !== undefined) {
            return seededShuffle(questions, args.shuffleSeed);
          }
          return questions;
        }
      },
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
