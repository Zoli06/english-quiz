import {DataTypes} from "sequelize";
import {sequelize} from "../../orm.ts";
import bcrypt from "bcrypt";

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
