import {DataTypes} from "sequelize";
import {sequelize} from "../../orm.ts";

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
