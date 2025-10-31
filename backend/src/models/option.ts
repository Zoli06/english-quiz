import {GraphQLObjectType} from "graphql";
import {DataTypes} from "sequelize";
import {sequelize} from "../orm";
const {attributeFields} = require("graphql-sequelize");

export const Option = sequelize.define("Option", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "questionId_text",
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "questionId_text",
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

export const optionType = new GraphQLObjectType({
    name: "Option",
    fields: attributeFields(Option),
});
