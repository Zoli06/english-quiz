import { GraphQLObjectType } from "graphql";
import { DataTypes } from "sequelize";
import { sequelize } from "../orm";
import bcrypt from "bcrypt";
import { attributeFields } from "graphql-sequelize";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(pass: string) {
      this.setDataValue("password", bcrypt.hashSync(pass, 10));
    },
  },
  needsPasswordChange: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  role: {
    type: DataTypes.ENUM("admin", "editor"),
    allowNull: false,
    defaultValue: "editor",
  },
});

export const userType = new GraphQLObjectType({
  name: "User",
  fields: attributeFields(User),
});
