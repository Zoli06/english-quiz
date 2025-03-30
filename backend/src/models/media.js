"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaType = exports.Media = void 0;
var sequelize_1 = require("sequelize");
var orm_1 = require("../orm");
var graphql_1 = require("graphql");
var graphql_sequelize_1 = require("graphql-sequelize");
exports.Media = orm_1.sequelize.define("Media", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("image", "video"),
        allowNull: false,
    },
});
exports.mediaType = new graphql_1.GraphQLObjectType({
    name: "Media",
    fields: (0, graphql_sequelize_1.attributeFields)(exports.Media),
});
