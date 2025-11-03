import {DataTypes} from "sequelize";
import {sequelize} from "../../orm.ts";

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
