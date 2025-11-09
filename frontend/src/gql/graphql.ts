/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A special custom Scalar type for Dates that converts to a ISO formatted string  */
  Date: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Answer = {
  optionIds: Array<Scalars['ID']['input']>;
  questionId: Scalars['ID']['input'];
};

export type Media = {
  __typename?: 'Media';
  createdAt: Scalars['Date']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  path: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: MediatypeEnumType;
  updatedAt: Scalars['Date']['output'];
};

export enum MediatypeEnumType {
  Image = 'image',
  Video = 'video'
}

export type Mutation = {
  __typename?: 'Mutation';
  changeUserPassword?: Maybe<User>;
  changeUserPasswordAdmin?: Maybe<User>;
  clearResults?: Maybe<Scalars['Int']['output']>;
  createMedia?: Maybe<Media>;
  createOption?: Maybe<Option>;
  createQuestion?: Maybe<Question>;
  createQuiz?: Maybe<Quiz>;
  createResult?: Maybe<Result>;
  createUser?: Maybe<User>;
  deleteMedia?: Maybe<Scalars['Boolean']['output']>;
  deleteOption?: Maybe<Scalars['Boolean']['output']>;
  deleteQuestion?: Maybe<Scalars['Boolean']['output']>;
  deleteQuiz?: Maybe<Scalars['Boolean']['output']>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  editMedia?: Maybe<Media>;
  editOption?: Maybe<Option>;
  editQuestion?: Maybe<Question>;
  editQuiz?: Maybe<Quiz>;
  editUser?: Maybe<User>;
  getToken?: Maybe<Scalars['String']['output']>;
};


export type MutationChangeUserPasswordArgs = {
  id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationChangeUserPasswordAdminArgs = {
  id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationClearResultsArgs = {
  quizId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateMediaArgs = {
  file: Scalars['Upload']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateOptionArgs = {
  isCorrect: Scalars['Boolean']['input'];
  questionId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreateQuestionArgs = {
  allowMultipleAnswers: Scalars['Boolean']['input'];
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  quizId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreateQuizArgs = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateResultArgs = {
  answers: Array<InputMaybe<Answer>>;
  nickname: Scalars['String']['input'];
  quizId: Scalars['ID']['input'];
  time: Scalars['Int']['input'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String']['input'];
  role: Role;
  username: Scalars['String']['input'];
};


export type MutationDeleteMediaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOptionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuizArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditMediaArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditOptionArgs = {
  id: Scalars['ID']['input'];
  isCorrect?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditQuestionArgs = {
  allowMultipleAnswers?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditQuizArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditUserArgs = {
  id: Scalars['ID']['input'];
  role?: InputMaybe<Role>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGetTokenArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Option = {
  __typename?: 'Option';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  questionId: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Query = {
  __typename?: 'Query';
  quiz?: Maybe<Quiz>;
  quizzes?: Maybe<Array<Quiz>>;
  result?: Maybe<Result>;
  topResults?: Maybe<Array<Result>>;
  user?: Maybe<User>;
};


export type QueryQuizArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResultArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTopResultsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  quizId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  allowMultipleAnswers: Scalars['Boolean']['output'];
  answers: Array<Option>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Media>;
  options: Array<Option>;
  text: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Quiz = {
  __typename?: 'Quiz';
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Result = {
  __typename?: 'Result';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  nickname: Scalars['String']['output'];
  quiz: Quiz;
  quizId: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
  time: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export enum Role {
  Admin = 'admin',
  Editor = 'editor'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  needsPasswordChange: Scalars['Boolean']['output'];
  password: Scalars['String']['output'];
  role: UserroleEnumType;
  updatedAt: Scalars['Date']['output'];
  username: Scalars['String']['output'];
};

export enum UserroleEnumType {
  Admin = 'admin',
  Editor = 'editor'
}

export type NewQuestionButtonFragmentFragment = { __typename?: 'Quiz', id: string } & { ' $fragmentName'?: 'NewQuestionButtonFragmentFragment' };

export type CreateQuestionMutationVariables = Exact<{
  quizId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  allowMultipleAnswers: Scalars['Boolean']['input'];
  mediaId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion?: (
    { __typename?: 'Question', id: string }
    & { ' $fragmentRefs'?: { 'NewQuestionButtonFragmentQuestionFragment': NewQuestionButtonFragmentQuestionFragment } }
  ) | null };

export type NewQuestionButtonFragmentQuestionFragment = (
  { __typename?: 'Question', id: string }
  & { ' $fragmentRefs'?: { 'AdminQuestionsFragmentQuestionFragment': AdminQuestionsFragmentQuestionFragment } }
) & { ' $fragmentName'?: 'NewQuestionButtonFragmentQuestionFragment' };

export type QuestionEditorFragmentMediaFragment = { __typename?: 'Media', id: string, path: string, title?: string | null, type: MediatypeEnumType } & { ' $fragmentName'?: 'QuestionEditorFragmentMediaFragment' };

export type QuestionEditorFragmentOptionFragment = { __typename?: 'Option', id: string, text: string, isCorrect: boolean } & { ' $fragmentName'?: 'QuestionEditorFragmentOptionFragment' };

export type QuestionEditorFragmentFragment = { __typename?: 'Question', id: string, text: string, allowMultipleAnswers: boolean, media?: (
    { __typename?: 'Media', id: string }
    & { ' $fragmentRefs'?: { 'QuestionEditorFragmentMediaFragment': QuestionEditorFragmentMediaFragment } }
  ) | null, options: Array<(
    { __typename?: 'Option', id: string }
    & { ' $fragmentRefs'?: { 'QuestionEditorFragmentOptionFragment': QuestionEditorFragmentOptionFragment } }
  )> } & { ' $fragmentName'?: 'QuestionEditorFragmentFragment' };

export type CreateMediaMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  title: Scalars['String']['input'];
}>;


export type CreateMediaMutation = { __typename?: 'Mutation', createMedia?: (
    { __typename?: 'Media', id: string }
    & { ' $fragmentRefs'?: { 'QuestionEditorFragmentMediaFragment': QuestionEditorFragmentMediaFragment } }
  ) | null };

export type EditMediaMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditMediaMutation = { __typename?: 'Mutation', editMedia?: (
    { __typename?: 'Media', id: string }
    & { ' $fragmentRefs'?: { 'QuestionEditorFragmentMediaFragment': QuestionEditorFragmentMediaFragment } }
  ) | null };

export type DeleteMediaMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMediaMutation = { __typename?: 'Mutation', deleteMedia?: boolean | null };

export type EditQuestionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  allowMultipleAnswers: Scalars['Boolean']['input'];
  mediaId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type EditQuestionMutation = { __typename?: 'Mutation', editQuestion?: (
    { __typename?: 'Question', id: string }
    & { ' $fragmentRefs'?: { 'QuestionEditorFragmentFragment': QuestionEditorFragmentFragment } }
  ) | null };

export type CreateOptionMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  isCorrect: Scalars['Boolean']['input'];
}>;


export type CreateOptionMutation = { __typename?: 'Mutation', createOption?: (
    { __typename?: 'Option', id: string }
    & { ' $fragmentRefs'?: { 'QuestionEditorFragmentOptionFragment': QuestionEditorFragmentOptionFragment } }
  ) | null };

export type EditOptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  isCorrect: Scalars['Boolean']['input'];
}>;


export type EditOptionMutation = { __typename?: 'Mutation', editOption?: (
    { __typename?: 'Option', id: string }
    & { ' $fragmentRefs'?: { 'QuestionEditorFragmentOptionFragment': QuestionEditorFragmentOptionFragment } }
  ) | null };

export type DeleteOptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOptionMutation = { __typename?: 'Mutation', deleteOption?: boolean | null };

export type QuestionsTableFragmentFragment = (
  { __typename?: 'Question', id: string, createdAt: any }
  & { ' $fragmentRefs'?: { 'QuestionsTableRowFragmentFragment': QuestionsTableRowFragmentFragment } }
) & { ' $fragmentName'?: 'QuestionsTableFragmentFragment' };

export type QuestionsTableRowFragmentFragment = { __typename?: 'Question', id: string, text: string, media?: { __typename?: 'Media', id: string, path: string, title?: string | null, type: MediatypeEnumType } | null, options: Array<{ __typename?: 'Option', id: string, text: string, isCorrect: boolean }> } & { ' $fragmentName'?: 'QuestionsTableRowFragmentFragment' };

export type DeleteQuestionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestion?: boolean | null };

export type QuizTitleFragmentFragment = { __typename?: 'Quiz', id: string, title: string, description: string } & { ' $fragmentName'?: 'QuizTitleFragmentFragment' };

export type CreateQuizMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz?: (
    { __typename?: 'Quiz', id: string }
    & { ' $fragmentRefs'?: { 'AdminQuizzesFragmentQuizFragment': AdminQuizzesFragmentQuizFragment } }
  ) | null };

export type NewQuizButtonFragmentQuizFragment = (
  { __typename?: 'Quiz', id: string }
  & { ' $fragmentRefs'?: { 'AdminQuizzesFragmentQuizFragment': AdminQuizzesFragmentQuizFragment } }
) & { ' $fragmentName'?: 'NewQuizButtonFragmentQuizFragment' };

export type QuizEditorFragmentFragment = { __typename?: 'Quiz', id: string, title: string, description: string } & { ' $fragmentName'?: 'QuizEditorFragmentFragment' };

export type EditQuizMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type EditQuizMutation = { __typename?: 'Mutation', editQuiz?: (
    { __typename?: 'Quiz' }
    & { ' $fragmentRefs'?: { 'QuizEditorFragmentFragment': QuizEditorFragmentFragment } }
  ) | null };

export type QuizzesTableFragmentFragment = (
  { __typename?: 'Quiz', id: string, createdAt: any }
  & { ' $fragmentRefs'?: { 'QuizzesTableRowFragmentFragment': QuizzesTableRowFragmentFragment } }
) & { ' $fragmentName'?: 'QuizzesTableFragmentFragment' };

export type QuizzesTableRowFragmentFragment = { __typename?: 'Quiz', id: string, title: string, description: string } & { ' $fragmentName'?: 'QuizzesTableRowFragmentFragment' };

export type DeleteQuizMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteQuizMutation = { __typename?: 'Mutation', deleteQuiz?: boolean | null };

export type ClearResultsMutationVariables = Exact<{
  quizId: Scalars['ID']['input'];
}>;


export type ClearResultsMutation = { __typename?: 'Mutation', clearResults?: number | null };

export type QuizSelectorFragmentFragment = { __typename?: 'Quiz', id: string, title: string } & { ' $fragmentName'?: 'QuizSelectorFragmentFragment' };

export type QuizStartButtonFragmentFragment = { __typename?: 'Quiz', id: string } & { ' $fragmentName'?: 'QuizStartButtonFragmentFragment' };

export type ToplistFragmentFragment = (
  { __typename?: 'Result', id: string, quiz: { __typename?: 'Quiz', id: string, title: string } }
  & { ' $fragmentRefs'?: { 'ToplistTableFragmentFragment': ToplistTableFragmentFragment } }
) & { ' $fragmentName'?: 'ToplistFragmentFragment' };

export type ToplistTableFragmentFragment = (
  { __typename?: 'Result', id: string }
  & { ' $fragmentRefs'?: { 'ToplistTableRowFragmentFragment': ToplistTableRowFragmentFragment } }
) & { ' $fragmentName'?: 'ToplistTableFragmentFragment' };

export type ToplistTableRowFragmentFragment = { __typename?: 'Result', id: string, nickname: string, score: number, total: number, time: number, quiz: { __typename?: 'Quiz', id: string, title: string } } & { ' $fragmentName'?: 'ToplistTableRowFragmentFragment' };

export type QuestionFragmentFragment = { __typename?: 'Question', id: string, text: string, allowMultipleAnswers: boolean, options: Array<{ __typename?: 'Option', id: string, text: string }>, media?: { __typename?: 'Media', id: string, path: string, title?: string | null, type: MediatypeEnumType } | null } & { ' $fragmentName'?: 'QuestionFragmentFragment' };

export type QuizNavigatorFragmentFragment = { __typename?: 'Quiz', id: string, questions: Array<{ __typename?: 'Question', id: string }> } & { ' $fragmentName'?: 'QuizNavigatorFragmentFragment' };

export type ResultFragmentFragment = (
  { __typename?: 'Result', id: string, score: number, total: number, quiz: (
    { __typename?: 'Quiz', id: string }
    & { ' $fragmentRefs'?: { 'SolutionsFragmentFragment': SolutionsFragmentFragment } }
  ) }
  & { ' $fragmentRefs'?: { 'ResultBasicInfoFragment': ResultBasicInfoFragment } }
) & { ' $fragmentName'?: 'ResultFragmentFragment' };

export type ResultBasicInfoFragment = { __typename?: 'Result', id: string, nickname: string, score: number, total: number, time: number } & { ' $fragmentName'?: 'ResultBasicInfoFragment' };

export type SolutionElementFragment = { __typename?: 'Question', id: string, text: string, options: Array<{ __typename?: 'Option', id: string, text: string, isCorrect: boolean }>, media?: { __typename?: 'Media', id: string, path: string, type: MediatypeEnumType } | null } & { ' $fragmentName'?: 'SolutionElementFragment' };

export type SolutionsFragmentFragment = { __typename?: 'Quiz', id: string, title: string, questions: Array<(
    { __typename?: 'Question', id: string }
    & { ' $fragmentRefs'?: { 'SolutionElementFragment': SolutionElementFragment } }
  )> } & { ' $fragmentName'?: 'SolutionsFragmentFragment' };

export type GetTokenMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type GetTokenMutation = { __typename?: 'Mutation', getToken?: string | null };

export type HomeQueryVariables = Exact<{
  topResultsQuizId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type HomeQuery = { __typename?: 'Query', topResults?: Array<(
    { __typename?: 'Result', id: string }
    & { ' $fragmentRefs'?: { 'ToplistFragmentFragment': ToplistFragmentFragment } }
  )> | null, quizzes?: Array<(
    { __typename?: 'Quiz', id: string }
    & { ' $fragmentRefs'?: { 'QuizSelectorFragmentFragment': QuizSelectorFragmentFragment;'QuizStartButtonFragmentFragment': QuizStartButtonFragmentFragment } }
  )> | null };

export type QuizQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type QuizQuery = { __typename?: 'Query', quiz?: (
    { __typename?: 'Quiz', id: string, questions: Array<(
      { __typename?: 'Question', id: string }
      & { ' $fragmentRefs'?: { 'QuestionFragmentFragment': QuestionFragmentFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'QuizNavigatorFragmentFragment': QuizNavigatorFragmentFragment } }
  ) | null };

export type CreateResultMutationVariables = Exact<{
  quizId: Scalars['ID']['input'];
  nickname: Scalars['String']['input'];
  answers: Array<Answer> | Answer;
  time: Scalars['Int']['input'];
}>;


export type CreateResultMutation = { __typename?: 'Mutation', createResult?: (
    { __typename?: 'Result', id: string }
    & { ' $fragmentRefs'?: { 'ResultFragmentFragment': ResultFragmentFragment } }
  ) | null };

export type AdminQuestionsFragmentQuestionFragment = (
  { __typename?: 'Question', id: string }
  & { ' $fragmentRefs'?: { 'QuestionEditorFragmentFragment': QuestionEditorFragmentFragment;'QuestionsTableFragmentFragment': QuestionsTableFragmentFragment } }
) & { ' $fragmentName'?: 'AdminQuestionsFragmentQuestionFragment' };

export type AdminQuizQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminQuizQuery = { __typename?: 'Query', quiz?: (
    { __typename?: 'Quiz', id: string, questions: Array<(
      { __typename?: 'Question', id: string }
      & { ' $fragmentRefs'?: { 'AdminQuestionsFragmentQuestionFragment': AdminQuestionsFragmentQuestionFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'QuizTitleFragmentFragment': QuizTitleFragmentFragment;'NewQuestionButtonFragmentFragment': NewQuestionButtonFragmentFragment } }
  ) | null };

export type AdminQuizzesFragmentQuizFragment = (
  { __typename?: 'Quiz', id: string, title: string, description: string }
  & { ' $fragmentRefs'?: { 'QuizEditorFragmentFragment': QuizEditorFragmentFragment;'QuizzesTableFragmentFragment': QuizzesTableFragmentFragment } }
) & { ' $fragmentName'?: 'AdminQuizzesFragmentQuizFragment' };

export type AdminQuizzesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminQuizzesQuery = { __typename?: 'Query', quizzes?: Array<(
    { __typename?: 'Quiz', id: string }
    & { ' $fragmentRefs'?: { 'AdminQuizzesFragmentQuizFragment': AdminQuizzesFragmentQuizFragment } }
  )> | null };

export const NewQuestionButtonFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewQuestionButtonFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<NewQuestionButtonFragmentFragment, unknown>;
export const QuestionEditorFragmentMediaFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<QuestionEditorFragmentMediaFragment, unknown>;
export const QuestionEditorFragmentOptionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Option"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]} as unknown as DocumentNode<QuestionEditorFragmentOptionFragment, unknown>;
export const QuestionEditorFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"allowMultipleAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Option"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]} as unknown as DocumentNode<QuestionEditorFragmentFragment, unknown>;
export const QuestionsTableRowFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]}}]} as unknown as DocumentNode<QuestionsTableRowFragmentFragment, unknown>;
export const QuestionsTableFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionsTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]}}]} as unknown as DocumentNode<QuestionsTableFragmentFragment, unknown>;
export const AdminQuestionsFragmentQuestionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminQuestionsFragmentQuestion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionsTableFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Option"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"allowMultipleAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionsTableRowFragment"}}]}}]} as unknown as DocumentNode<AdminQuestionsFragmentQuestionFragment, unknown>;
export const NewQuestionButtonFragmentQuestionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewQuestionButtonFragmentQuestion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminQuestionsFragmentQuestion"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Option"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"allowMultipleAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionsTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminQuestionsFragmentQuestion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionsTableFragment"}}]}}]} as unknown as DocumentNode<NewQuestionButtonFragmentQuestionFragment, unknown>;
export const QuizTitleFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizTitleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<QuizTitleFragmentFragment, unknown>;
export const QuizEditorFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<QuizEditorFragmentFragment, unknown>;
export const QuizzesTableRowFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<QuizzesTableRowFragmentFragment, unknown>;
export const QuizzesTableFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizzesTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<QuizzesTableFragmentFragment, unknown>;
export const AdminQuizzesFragmentQuizFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminQuizzesFragmentQuiz"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizEditorFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizzesTableFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizzesTableRowFragment"}}]}}]} as unknown as DocumentNode<AdminQuizzesFragmentQuizFragment, unknown>;
export const NewQuizButtonFragmentQuizFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewQuizButtonFragmentQuiz"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminQuizzesFragmentQuiz"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizzesTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminQuizzesFragmentQuiz"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizEditorFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizzesTableFragment"}}]}}]} as unknown as DocumentNode<NewQuizButtonFragmentQuizFragment, unknown>;
export const QuizSelectorFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizSelectorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<QuizSelectorFragmentFragment, unknown>;
export const QuizStartButtonFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizStartButtonFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<QuizStartButtonFragmentFragment, unknown>;
export const ToplistTableRowFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ToplistTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<ToplistTableRowFragmentFragment, unknown>;
export const ToplistTableFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ToplistTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ToplistTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ToplistTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<ToplistTableFragmentFragment, unknown>;
export const ToplistFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ToplistFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ToplistTableFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ToplistTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ToplistTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ToplistTableRowFragment"}}]}}]} as unknown as DocumentNode<ToplistFragmentFragment, unknown>;
export const QuestionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"allowMultipleAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<QuestionFragmentFragment, unknown>;
export const QuizNavigatorFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizNavigatorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<QuizNavigatorFragmentFragment, unknown>;
export const ResultBasicInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ResultBasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]} as unknown as DocumentNode<ResultBasicInfoFragment, unknown>;
export const SolutionElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SolutionElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<SolutionElementFragment, unknown>;
export const SolutionsFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SolutionsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SolutionElement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SolutionElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<SolutionsFragmentFragment, unknown>;
export const ResultFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ResultFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ResultBasicInfo"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SolutionsFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SolutionElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ResultBasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SolutionsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SolutionElement"}}]}}]}}]} as unknown as DocumentNode<ResultFragmentFragment, unknown>;
export const CreateQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowMultipleAnswers"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mediaId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowMultipleAnswers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowMultipleAnswers"}}},{"kind":"Argument","name":{"kind":"Name","value":"mediaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mediaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NewQuestionButtonFragmentQuestion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Option"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"allowMultipleAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionsTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminQuestionsFragmentQuestion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionsTableFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewQuestionButtonFragmentQuestion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminQuestionsFragmentQuestion"}}]}}]} as unknown as DocumentNode<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const CreateMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<CreateMediaMutation, CreateMediaMutationVariables>;
export const EditMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<EditMediaMutation, EditMediaMutationVariables>;
export const DeleteMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteMediaMutation, DeleteMediaMutationVariables>;
export const EditQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowMultipleAnswers"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mediaId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowMultipleAnswers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowMultipleAnswers"}}},{"kind":"Argument","name":{"kind":"Name","value":"mediaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mediaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Option"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"allowMultipleAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentOption"}}]}}]}}]} as unknown as DocumentNode<EditQuestionMutation, EditQuestionMutationVariables>;
export const CreateOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isCorrect"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"isCorrect"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isCorrect"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Option"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]} as unknown as DocumentNode<CreateOptionMutation, CreateOptionMutationVariables>;
export const EditOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isCorrect"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"isCorrect"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isCorrect"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Option"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]} as unknown as DocumentNode<EditOptionMutation, EditOptionMutationVariables>;
export const DeleteOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteOptionMutation, DeleteOptionMutationVariables>;
export const DeleteQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const CreateQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminQuizzesFragmentQuiz"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizzesTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminQuizzesFragmentQuiz"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizEditorFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizzesTableFragment"}}]}}]} as unknown as DocumentNode<CreateQuizMutation, CreateQuizMutationVariables>;
export const EditQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizEditorFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<EditQuizMutation, EditQuizMutationVariables>;
export const DeleteQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteQuizMutation, DeleteQuizMutationVariables>;
export const ClearResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}]}]}}]} as unknown as DocumentNode<ClearResultsMutation, ClearResultsMutationVariables>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const HomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Home"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topResultsQuizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topResultsQuizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ToplistFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizSelectorFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizStartButtonFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ToplistTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ToplistTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ToplistTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ToplistFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ToplistTableFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizSelectorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizStartButtonFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<HomeQuery, HomeQueryVariables>;
export const QuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Quiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizNavigatorFragment"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizNavigatorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"allowMultipleAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<QuizQuery, QuizQueryVariables>;
export const CreateResultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateResult"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Answer"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"time"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}},{"kind":"Argument","name":{"kind":"Name","value":"answers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answers"}}},{"kind":"Argument","name":{"kind":"Name","value":"time"},"value":{"kind":"Variable","name":{"kind":"Name","value":"time"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ResultFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ResultBasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SolutionElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SolutionsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SolutionElement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ResultFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Result"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ResultBasicInfo"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SolutionsFragment"}}]}}]}}]} as unknown as DocumentNode<CreateResultMutation, CreateResultMutationVariables>;
export const AdminQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizTitleFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NewQuestionButtonFragment"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminQuestionsFragmentQuestion"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragmentOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Option"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"allowMultipleAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentMedia"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragmentOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionsTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionsTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizTitleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewQuestionButtonFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminQuestionsFragmentQuestion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionEditorFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionsTableFragment"}}]}}]} as unknown as DocumentNode<AdminQuizQuery, AdminQuizQueryVariables>;
export const AdminQuizzesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminQuizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminQuizzesFragmentQuiz"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizEditorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableRowFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuizzesTableFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizzesTableRowFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminQuizzesFragmentQuiz"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Quiz"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizEditorFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuizzesTableFragment"}}]}}]} as unknown as DocumentNode<AdminQuizzesQuery, AdminQuizzesQueryVariables>;