import type { GraphQLResolveInfo } from "graphql";
import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

const transformValue = (value: any, type: any): any => {
  if (value === undefined || value === null) return value;

  if (type instanceof GraphQLNonNull) {
    return transformValue(value, type.ofType);
  }

  if (type instanceof GraphQLList) {
    if (!Array.isArray(value)) return value;
    return value.map((v) => transformValue(v, type.ofType));
  }

  if (type instanceof GraphQLInputObjectType) {
    const fields = type.getFields();
    if (Array.isArray(value)) {
      // unlikely, but keep original if array provided
      return value;
    }
    const out: any = {};
    for (const key of Object.keys(value)) {
      const fieldType = fields[key] ? fields[key].type : null;
      out[key] = fieldType ? transformValue(value[key], fieldType) : value[key];
    }
    return out;
  }

  // Base scalar types
  if (type === GraphQLID) {
    if (Array.isArray(value))
      return value.map((v) => parseInt(v as string, 10));
    if (typeof value === "string" || typeof value === "number")
      return parseInt(value as any, 10);
    return value;
  }

  return value;
};

const parseIdsMiddleware = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo,
) => {
  try {
    const fieldDef = info.parentType.getFields()[info.fieldName];
    if (fieldDef && fieldDef.args && args) {
      for (const argDef of fieldDef.args) {
        const name = argDef.name;
        if (args[name] === undefined) continue;
        args[name] = transformValue(args[name], argDef.type);
      }
    }
  } catch (e) {
    // keep execution safe — don't block the request on middleware errors
    console.error("parseIdsMiddleware error:", (e as Error).message);
  }

  return resolve(parent, args, context, info);
};

export default parseIdsMiddleware;
