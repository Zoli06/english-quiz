import { DataTypes } from "sequelize";
import { sequelize } from "../../orm.ts";
import { Option } from "../option/option.orm.ts";
import { Media } from "../media/media.orm.ts";

export const Question = sequelize.define("Question", {
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
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mediaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  allowMultipleAnswers: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
Question.hasMany(Option, { foreignKey: "questionId" });
Question.belongsTo(Media, { foreignKey: "mediaId" });
