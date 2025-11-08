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

export const quizType = new GraphQLObjectType({
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
  },
});
