"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = exports.User = void 0;
var graphql_1 = require("graphql");
var sequelize_1 = require("sequelize");
var orm_1 = require("../orm");
var bcrypt_1 = __importDefault(require("bcrypt"));
var graphql_sequelize_1 = require("graphql-sequelize");
exports.User = orm_1.sequelize.define("User", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set: function (pass) {
            this.setDataValue("password", bcrypt_1.default.hashSync(pass, 10));
        },
    },
    needsPasswordChange: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("admin", "editor"),
        allowNull: false,
        defaultValue: "editor",
    },
});
exports.userType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: (0, graphql_sequelize_1.attributeFields)(exports.User),
});
