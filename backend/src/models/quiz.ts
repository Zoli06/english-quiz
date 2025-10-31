import {DataTypes} from "sequelize";
import {sequelize} from "../orm";
import {Question, questionType} from "./question";
import {GraphQLList, GraphQLObjectType} from "graphql";
const {attributeFields} = require("graphql-sequelize");

export const Quiz = sequelize.define("Quiz", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
Quiz.hasMany(Question, {foreignKey: "quizId"});

export const quizType = new GraphQLObjectType({
    name: "Quiz",
    fields: {
        ...attributeFields(Quiz),
        questions: {
            type: new GraphQLList(questionType),
            resolve: async (parent) =>
                await Question.findAll({
                    where: {quizId: parent.id},
                    order: [["createdAt", "DESC"]],
                }),
        },
    },
});
