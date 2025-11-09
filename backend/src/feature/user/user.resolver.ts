import { userType } from "./user.schema.ts";
import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { User } from "./user.orm.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "../../middleware/permissions.ts";
import { config } from "../../config.ts";

const roleType = new GraphQLEnumType({
  name: "Role",
  values: {
    admin: { value: Role.Admin },
    editor: { value: Role.Editor },
  },
});

export const user = {
  type: userType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_: any, args: { id: number }) => {
    return await User.findByPk(args.id);
  },
};

export const getToken = {
  type: GraphQLString,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_: any, args: { username: string; password: string }) => {
    const user = await User.findOne({ where: { username: args.username } });

    if (
      !user ||
      !bcrypt.compareSync(args.password, user.getDataValue("password"))
    ) {
      return null;
    }

    return jwt.sign(
      { id: user.getDataValue("id") },
      config.jwtSecret,
      { expiresIn: "1d" },
    );
  },
};

export const createUser = {
  type: userType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(roleType) },
  },
  resolve: async (
    _: any,
    args: { username: string; password: string; role: string },
  ) => {
    return await User.create(args);
  },
};

export const changeUserPassword = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    oldPassword: { type: new GraphQLNonNull(GraphQLString) },
    newPassword: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _: any,
    args: { id: number; oldPassword: string; newPassword: string },
  ) => {
    const user = await User.findByPk(args.id);
    if (
      !user ||
      !bcrypt.compareSync(args.oldPassword, user.getDataValue("password"))
    ) {
      return null;
    }

    user.setDataValue("password", args.newPassword);
    user.setDataValue("needsPasswordChange", false);
    return user.save();
  },
};

export const changeUserPasswordAdmin = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    newPassword: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_: any, args: { id: number; newPassword: string }) => {
    const user = await User.findByPk(args.id);
    if (!user) {
      return null;
    }

    user.setDataValue("password", args.newPassword);
    user.setDataValue("needsPasswordChange", true);
    return user.save();
  },
};

export const editUser = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLString },
    role: { type: roleType },
  },
  resolve: async (
    _: any,
    args: { id: number; username?: string; role?: string },
  ) => {
    const user = await User.findByPk(args.id);
    if (!user) {
      return null;
    }

    return await user.update(args);
  },
};

export const deleteUser = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_: any, args: { id: number }) => {
    const user = await User.findByPk(args.id);
    if (!user) {
      return false;
    }

    await user.destroy();
    return true;
  },
};
