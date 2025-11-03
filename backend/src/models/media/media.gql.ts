import {GraphQLObjectType} from "graphql/index.js";
import graphqlSequelize from "graphql-sequelize";
import {GraphQLID, GraphQLNonNull} from "graphql/type/index.js";
import {Media} from "./media.orm.ts";
import {GraphQLString} from "graphql";

export const mediaType = new GraphQLObjectType({
    name: "Media",
    fields: {
        ...graphqlSequelize.attributeFields(Media),
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        url: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (parent) => {
                return "/uploads/" + parent.filename;
            }
        }
    },
});