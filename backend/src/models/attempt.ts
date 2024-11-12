import { DataTypes } from "sequelize";
import { sequelize } from "../orm";
import { Quiz, quizType } from "./quiz";
import { GraphQLObjectType } from "graphql";
import { attributeFields } from "graphql-sequelize";

export const Attempt = sequelize.define("Attempt", {
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
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export const attemptType = new GraphQLObjectType({
  name: "Attempt",
  fields: {
    ...attributeFields(Attempt),
    quiz: {
      type: quizType,
      resolve: async (parent) => {
        return await Quiz.findByPk(parent.quizId);
      },
    },
  },
});
