import {DataTypes} from "sequelize";
import {sequelize} from "../orm";
import {Option, optionType} from "./option";
import {Media, mediaType} from "./media";
import {GraphQLList, GraphQLObjectType} from "graphql";
const {attributeFields} = require("graphql-sequelize");

export const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mediaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    allowMultipleAnswers: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});
Question.hasMany(Option, {foreignKey: "questionId"});
Question.belongsTo(Media, {foreignKey: "mediaId"});

// It would be useful to check if the question has the right number of correct answers
// Currently allowMultipleAnswers doesn't enforce this
// Cuz I'm f-ing late
// Also I didn't consider this when designed the API so it would be more difficult than it sounds

export const questionType = new GraphQLObjectType({
    name: "Question",
    fields: {
        ...attributeFields(Question),
        options: {
            type: new GraphQLList(optionType),
            resolve: async (parent) =>
                await Option.findAll({where: {questionId: parent.id}}),
        },
        answers: {
            type: new GraphQLList(optionType),
            resolve: async (parent) =>
                await Option.findAll({
                    where: {questionId: parent.id, isCorrect: true},
                }),
        },
        media: {
            type: mediaType,
            resolve: async (parent) => {
                if (!parent.mediaId) return null;
                return await Media.findOne({where: {id: parent.mediaId}});
            },
        },
    },
});
