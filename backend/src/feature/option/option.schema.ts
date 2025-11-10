import { GraphQLObjectType } from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import { GraphQLID, GraphQLNonNull } from "graphql/type/index.js";
import { Option } from "./option.orm.ts";

export const optionType = new GraphQLObjectType({
  name: "Option",
  fields: {
    ...graphqlSequelize.attributeFields(Option, {
      exclude: ["questionId"],
    }),
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
