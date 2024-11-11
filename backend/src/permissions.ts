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

const isSubmittingAttempt = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    // return true if the parent field is Mutation.submitAttempt
    console.log(info)
    return info.parentType.name === 'Mutation' && info.fieldName === 'submitAttempt';
  }
);

export const permissions = shield(
  {
    Query: {
      '*': allow,
    },
    Mutation: {
      '*': or(isAdmin, isEditor),
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
      isCorrect: or(isAdmin, isEditor, isSubmittingAttempt),
    },
    Attempt: {
      '*': allow,
    },
    Media: {
      '*': allow,
    },
    SubmitAttempt: {
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
