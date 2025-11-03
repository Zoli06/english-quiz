import {GraphQLID, GraphQLNonNull, GraphQLObjectType} from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import {quizType} from "../quiz/quiz.gql.ts";
import {Quiz} from "../quiz/quiz.orm.ts";
import {Attempt} from "./attempt.orm.ts";

export const attemptType = new GraphQLObjectType({
    name: "Attempt",
    fields: {
        ...graphqlSequelize.attributeFields(Attempt),
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        quiz: {
            type: quizType,
            resolve: async (parent) => {
                return await Quiz.findByPk(parent.quizId);
            },
        },
    },
});