import { GraphQLBoolean, GraphQLObjectType } from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import { GraphQLID, GraphQLNonNull } from "graphql/type/index.js";
import { Option } from "./option.orm.ts";
import { Question } from "../question/question.orm.ts";
import { Quiz } from "../quiz/quiz.orm.ts";
import { Role } from "../../middleware/permissions.ts";

export const optionType = new GraphQLObjectType({
  name: "Option",
  fields: {
    ...graphqlSequelize.attributeFields(Option, {
      exclude: ["questionId"],
    }),
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    // Null when the user is not allowed to see the correct answers
    isCorrect: {
      type: GraphQLBoolean,
      resolve: async (parent, _args, ctx, info) => {
        const isStaff =
          ctx.user !== null &&
          (ctx.user.role === Role.Admin || ctx.user.role === Role.Editor);
        const isSubmitting =
          info.operation.operation === "mutation" &&
          info.operation.name?.value === "CreateResult";
        if (isStaff || isSubmitting) {
          return parent.getDataValue("isCorrect");
        }
        const question = await Question.findByPk(
          parent.getDataValue("questionId"),
        );
        const quiz =
          question && (await Quiz.findByPk(question.getDataValue("quizId")));
        return quiz?.getDataValue("showCorrectAnswerAfterEachQuestion")
          ? parent.getDataValue("isCorrect")
          : null;
      },
    },
  },
});
