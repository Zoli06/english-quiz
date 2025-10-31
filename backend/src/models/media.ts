import {DataTypes} from "sequelize";
import {sequelize} from "../orm";
import {GraphQLObjectType} from "graphql";
const {attributeFields} = require("graphql-sequelize");

export const Media = sequelize.define("Media", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM("image", "video"),
        allowNull: false,
    },
});

export const mediaType = new GraphQLObjectType({
    name: "Media",
    fields: attributeFields(Media),
});
