"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionType = exports.Option = void 0;
var graphql_1 = require("graphql");
var sequelize_1 = require("sequelize");
var orm_1 = require("../orm");
var graphql_sequelize_1 = require("graphql-sequelize");
exports.Option = orm_1.sequelize.define("Option", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: "questionId_text",
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: "questionId_text",
    },
    isCorrect: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
});
exports.optionType = new graphql_1.GraphQLObjectType({
    name: "Option",
    fields: (0, graphql_sequelize_1.attributeFields)(exports.Option),
});
