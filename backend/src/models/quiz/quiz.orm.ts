import {DataTypes} from "sequelize";
import {sequelize} from "../../orm.ts";

export const Quiz = sequelize.define("Quiz", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const {Question} = await import("../question/question.orm.ts");
Quiz.hasMany(Question, {foreignKey: "quizId"});
