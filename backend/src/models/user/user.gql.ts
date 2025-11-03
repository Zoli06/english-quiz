import {GraphQLNonNull, GraphQLObjectType} from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import {GraphQLID} from "graphql/type/index.js";
import {User} from "./user.orm.ts";

export const userType = new GraphQLObjectType({
    name: "User",
    fields: {
        ...graphqlSequelize.attributeFields(User),
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
});