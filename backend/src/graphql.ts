import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./middleware/permissions.ts";
import "dotenv/config";
import parseIds from "./middleware/parseIds.ts";
import {
  createOption,
  deleteOption,
  editOption,
} from "./feature/option/option.resolver.ts";
import {
  createMedia,
  deleteMedia,
  editMedia,
} from "./feature/media/media.resolver.ts";
import {
  changeUserPassword,
  changeUserPasswordAdmin,
  createUser,
  deleteUser,
  editUser,
  getToken,
  user,
} from "./feature/user/user.resolver.ts";
import {
  createQuiz,
  deleteQuiz,
  editQuiz,
  quiz,
  quizzes,
} from "./feature/quiz/quiz.resolver.ts";
import {
  clearResults,
  createResult,
  result,
} from "./feature/result/result.resolver.ts";
import {
  createQuestion,
  deleteQuestion,
  editQuestion,
} from "./feature/question/question.resolver.ts";

export const schema = applyMiddleware(
  new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: {
        quiz,
        quizzes,
        result,
        user,
      },
    }),
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: {
        getToken,
        createMedia,
        editMedia,
        deleteMedia,
        createOption,
        editOption,
        deleteOption,
        createQuestion,
        editQuestion,
        deleteQuestion,
        createQuiz,
        editQuiz,
        deleteQuiz,
        createUser,
        changeUserPassword,
        changeUserPasswordAdmin,
        editUser,
        deleteUser,
        createResult,
        clearResults
      },
    }),
  }),
  permissions,
  parseIds,
);
