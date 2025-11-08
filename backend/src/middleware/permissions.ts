import { allow, or, rule, shield } from "graphql-shield";

export enum Role {
  Admin = "admin",
  Editor = "editor",
}

const isAdmin = rule({ cache: "contextual" })(async (
  _parent,
  _args,
  ctx,
  _info,
) => {
  return ctx.user !== null && ctx.user.role === Role.Admin;
});

const isEditor = rule({ cache: "contextual" })(async (
  _parent,
  _args,
  ctx,
  _info,
) => {
  return ctx.user !== null && ctx.user.role === Role.Editor;
});

const isSubmitting = rule({ cache: "contextual" })(async (
  _parent,
  _args,
  _ctx,
  info,
) => {
    console.log("info" + info.operation);
  return (
    info.operation.operation === "mutation" &&
    info.operation.name?.value === "CreateResult"
  );
});

export const permissions = shield(
  {
    Query: {
      "*": allow,
    },
    Mutation: {
      "*": or(isAdmin, isEditor),
      createResult: allow,
      getToken: allow,
    },
    Quiz: {
      "*": allow,
    },
    Question: {
      "*": allow,
      answers: or(isAdmin, isEditor),
    },
    Option: {
      "*": allow,
      // isCorrect: or(isAdmin, isEditor, isSubmitting),
      isCorrect: allow
    },
    Result: {
      "*": allow,
    },
    Media: {
      "*": allow,
    },
  },
  {
    // TODO: disable debug in production
    debug: true,
    fallbackRule: rule({ cache: "contextual" })((info) => {
      console.error("No rule defined");
      console.error(info);
      return false;
    }),
  },
);
