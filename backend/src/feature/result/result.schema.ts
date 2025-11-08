import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import { quizType } from "../quiz/quiz.schema.ts";
import { Quiz } from "../quiz/quiz.orm.ts";
import { Result } from "./result.orm.ts";

export const resultType = new GraphQLObjectType({
  name: "Result",
  fields: {
    ...graphqlSequelize.attributeFields(Result),
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    quiz: {
      type: new GraphQLNonNull(quizType),
      resolve: async (parent) => {
        return await Quiz.findByPk(parent.quizId);
      },
    },
  },
});
