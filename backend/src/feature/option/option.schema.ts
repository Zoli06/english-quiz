import { GraphQLBoolean, GraphQLObjectType } from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import { GraphQLID, GraphQLNonNull } from "graphql/type/index.js";
import { Option } from "./option.orm.ts";
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
      resolve: (parent, _args, ctx, info) => {
        const isStaff =
          ctx.user !== null &&
          (ctx.user.role === Role.Admin || ctx.user.role === Role.Editor);
        const isSubmitting =
          info.operation.operation === "mutation" &&
          info.operation.name?.value === "CreateResult";
        return isStaff || isSubmitting
          ? parent.getDataValue("isCorrect")
          : null;
      },
    },
  },
});
