import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import { quizType } from "../quiz/quiz.schema.ts";
import { Quiz } from "../quiz/quiz.orm.ts";
import { Result } from "./result.orm.ts";

export const resultType = new GraphQLObjectType({
  name: "Result",
  fields: {
    ...graphqlSequelize.attributeFields(Result, {
      exclude: ["quizId"],
    }),
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    quiz: {
      // This resolves circular dependency issue
      get type() {
        return new GraphQLNonNull(quizType);
      },
      resolve: async (parent) => {
        return await Quiz.findByPk(parent.quizId);
      },
    },
  },
});
