import { rule, shield, allow, or } from 'graphql-shield';

export enum Role {
  Admin = 'admin',
  Editor = 'editor',
}

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null && ctx.user.role === Role.Admin;
  }
);

const isEditor = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null && ctx.user.role === Role.Editor;
  }
);

export const permissions = shield(
  {
    Query: {
      '*': allow,
    },
    Mutation: {
      '*': isAdmin,
      submitAttempt: allow,
    },
    Quiz: {
      '*': allow,
    },
    Question: {
      '*': allow,
      answers: or(isAdmin, isEditor),
    },
    Option: {
      '*': allow,
      isCorrect: or(isAdmin, isEditor),
    },
    Attempt: {
      '*': allow,
    },
  },
  {
    // TODO: disable debug in production
    debug: true,
    fallbackRule: rule({ cache: 'contextual' })((parent, args, ctx, info) => {
      console.error('No rule defined');
      console.error(info);
      return false;
    }),
  }
);
