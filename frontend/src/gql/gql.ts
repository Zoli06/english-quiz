/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment NewQuestionButtonFragment on Quiz {\n    id\n  }\n": typeof types.NewQuestionButtonFragmentFragmentDoc,
    "\n  mutation CreateQuestion(\n    $quizId: ID!\n    $text: String!\n    $allowMultipleAnswers: Boolean!\n    $mediaId: ID\n  ) {\n    createQuestion(\n      quizId: $quizId\n      text: $text\n      allowMultipleAnswers: $allowMultipleAnswers\n      mediaId: $mediaId\n    ) {\n      id\n      ...NewQuestionButtonFragmentQuestion\n    }\n  }\n": typeof types.CreateQuestionDocument,
    "\n  fragment NewQuestionButtonFragmentQuestion on Question {\n    id\n    ...AdminQuestionsFragmentQuestion\n  }\n": typeof types.NewQuestionButtonFragmentQuestionFragmentDoc,
    "\n  fragment QuestionEditorFragmentMedia on Media {\n    id\n    path\n    title\n    type\n  }\n": typeof types.QuestionEditorFragmentMediaFragmentDoc,
    "\n  fragment QuestionEditorFragmentOption on Option {\n    id\n    text\n    isCorrect\n  }\n": typeof types.QuestionEditorFragmentOptionFragmentDoc,
    "\n  fragment QuestionEditorFragment on Question {\n    id\n    text\n    allowMultipleAnswers\n    media {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n    options {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n": typeof types.QuestionEditorFragmentFragmentDoc,
    "\n  mutation CreateMedia($file: Upload!, $title: String!) {\n    createMedia(file: $file, title: $title) {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n  }\n": typeof types.CreateMediaDocument,
    "\n  mutation EditMedia($id: ID!, $file: Upload, $title: String) {\n    editMedia(id: $id, file: $file, title: $title) {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n  }\n": typeof types.EditMediaDocument,
    "\n  mutation DeleteMedia($id: ID!) {\n    deleteMedia(id: $id)\n  }\n": typeof types.DeleteMediaDocument,
    "\n  mutation EditQuestion(\n    $id: ID!\n    $text: String!\n    $allowMultipleAnswers: Boolean!\n    $mediaId: ID\n  ) {\n    editQuestion(\n      id: $id\n      text: $text\n      allowMultipleAnswers: $allowMultipleAnswers\n      mediaId: $mediaId\n    ) {\n      id\n      ...QuestionEditorFragment\n    }\n  }\n": typeof types.EditQuestionDocument,
    "\n  mutation CreateOption(\n    $questionId: ID!\n    $text: String!\n    $isCorrect: Boolean!\n  ) {\n    createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n": typeof types.CreateOptionDocument,
    "\n  mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {\n    editOption(id: $id, text: $text, isCorrect: $isCorrect) {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n": typeof types.EditOptionDocument,
    "\n  mutation DeleteOption($id: ID!) {\n    deleteOption(id: $id)\n  }\n": typeof types.DeleteOptionDocument,
    "\n  fragment QuestionsTableFragment on Question {\n    id\n    createdAt\n    ...QuestionsTableRowFragment\n  }\n": typeof types.QuestionsTableFragmentFragmentDoc,
    "\n  fragment QuestionsTableRowFragment on Question {\n    id\n    text\n    media {\n      id\n      path\n      title\n      type\n    }\n    options {\n      id\n      text\n      isCorrect\n    }\n  }\n": typeof types.QuestionsTableRowFragmentFragmentDoc,
    "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n": typeof types.DeleteQuestionDocument,
    "\n  fragment QuizTitleFragment on Quiz {\n    id\n    title\n    description\n  }\n": typeof types.QuizTitleFragmentFragmentDoc,
    "\n  mutation CreateQuiz($title: String!, $description: String!) {\n    createQuiz(title: $title, description: $description) {\n      id\n      ...AdminQuizzesFragmentQuiz\n    }\n  }\n": typeof types.CreateQuizDocument,
    "\n  fragment NewQuizButtonFragmentQuiz on Quiz {\n    id\n    ...AdminQuizzesFragmentQuiz\n  }\n": typeof types.NewQuizButtonFragmentQuizFragmentDoc,
    "\n  fragment QuizEditorFragment on Quiz {\n    id\n    title\n    description\n  }\n": typeof types.QuizEditorFragmentFragmentDoc,
    "\n  mutation EditQuiz($id: ID!, $title: String!, $description: String!) {\n    editQuiz(id: $id, title: $title, description: $description) {\n      ...QuizEditorFragment\n    }\n  }\n": typeof types.EditQuizDocument,
    "\n  fragment QuizzesTableFragment on Quiz {\n    id\n    createdAt\n    ...QuizzesTableRowFragment\n  }\n": typeof types.QuizzesTableFragmentFragmentDoc,
    "\n  fragment QuizzesTableRowFragment on Quiz {\n    id\n    title\n    description\n  }\n": typeof types.QuizzesTableRowFragmentFragmentDoc,
    "\n  mutation DeleteQuiz($id: ID!) {\n    deleteQuiz(id: $id)\n  }\n": typeof types.DeleteQuizDocument,
    "\n  mutation ClearResults($quizId: ID!) {\n    clearResults(quizId: $quizId)\n  }\n": typeof types.ClearResultsDocument,
    "\n  fragment QuizSelectorFragment on Quiz {\n    id\n    title\n  }\n": typeof types.QuizSelectorFragmentFragmentDoc,
    "\n  fragment QuizStartButtonFragment on Quiz {\n    id\n  }\n": typeof types.QuizStartButtonFragmentFragmentDoc,
    "\n  fragment ToplistFragment on Result {\n    id\n    quiz {\n      id\n      title\n    }\n    ...ToplistTableFragment\n  }\n": typeof types.ToplistFragmentFragmentDoc,
    "\n  fragment ToplistTableFragment on Result {\n    id\n    ...ToplistTableRowFragment\n  }\n": typeof types.ToplistTableFragmentFragmentDoc,
    "\n  fragment ToplistTableRowFragment on Result {\n    id\n    nickname\n    score\n    total\n    time\n    quiz {\n      id\n      title\n    }\n  }\n": typeof types.ToplistTableRowFragmentFragmentDoc,
    "\n  fragment QuestionFragment on Question {\n    id\n    text\n    allowMultipleAnswers\n    options {\n      id\n      text\n    }\n    media {\n      id\n      path\n      title\n      type\n    }\n  }\n": typeof types.QuestionFragmentFragmentDoc,
    "\n  fragment QuizNavigatorFragment on Quiz {\n    id\n    questions {\n      id\n    }\n  }\n": typeof types.QuizNavigatorFragmentFragmentDoc,
    "\n  fragment ResultFragment on Result {\n    id\n    score\n    total\n    ...ResultBasicInfo\n    quiz {\n      id\n      ...SolutionsFragment\n    }\n  }\n": typeof types.ResultFragmentFragmentDoc,
    "\n  fragment ResultBasicInfo on Result {\n    id\n    nickname\n    score\n    total\n    time\n  }\n": typeof types.ResultBasicInfoFragmentDoc,
    "\n  fragment SolutionElement on Question {\n    id\n    text\n    options {\n      id\n      text\n      isCorrect\n    }\n    media {\n      id\n      path\n      type\n    }\n  }\n": typeof types.SolutionElementFragmentDoc,
    "\n  fragment SolutionsFragment on Quiz {\n    id\n    title\n    questions {\n      id\n      ...SolutionElement\n    }\n  }\n": typeof types.SolutionsFragmentFragmentDoc,
    "\n  mutation GetToken($username: String!, $password: String!) {\n    getToken(username: $username, password: $password)\n  }\n": typeof types.GetTokenDocument,
    "\n  query Home($topResultsQuizId: ID) {\n    topResults(quizId: $topResultsQuizId, limit: 10) {\n      id\n      ...ToplistFragment\n    }\n    quizzes {\n      id\n      ...QuizSelectorFragment\n      ...QuizStartButtonFragment\n    }\n  }\n": typeof types.HomeDocument,
    "\n  query Quiz($id: ID!) {\n    quiz(id: $id) {\n      id\n      ...QuizNavigatorFragment\n      questions {\n        ...QuestionFragment\n        id\n      }\n    }\n  }\n": typeof types.QuizDocument,
    "\n  mutation CreateResult(\n    $quizId: ID!\n    $nickname: String!\n    $answers: [Answer!]!\n    $time: Int!\n  ) {\n    createResult(\n      quizId: $quizId\n      nickname: $nickname\n      answers: $answers\n      time: $time\n    ) {\n      id\n      ...ResultFragment\n    }\n  }\n": typeof types.CreateResultDocument,
    "\n  fragment AdminQuestionsFragmentQuestion on Question {\n    id\n    ...QuestionEditorFragment\n    ...QuestionsTableFragment\n  }\n": typeof types.AdminQuestionsFragmentQuestionFragmentDoc,
    "\n  query AdminQuiz($id: ID!) {\n    quiz(id: $id) {\n      id\n      ...QuizTitleFragment\n      ...NewQuestionButtonFragment\n      questions {\n        id\n        ...AdminQuestionsFragmentQuestion\n      }\n    }\n  }\n": typeof types.AdminQuizDocument,
    "\n  fragment AdminQuizzesFragmentQuiz on Quiz {\n    id\n    title\n    description\n    ...QuizEditorFragment\n    ...QuizzesTableFragment\n  }\n": typeof types.AdminQuizzesFragmentQuizFragmentDoc,
    "\n  query AdminQuizzes {\n    quizzes {\n      id\n      ...AdminQuizzesFragmentQuiz\n    }\n  }\n": typeof types.AdminQuizzesDocument,
};
const documents: Documents = {
    "\n  fragment NewQuestionButtonFragment on Quiz {\n    id\n  }\n": types.NewQuestionButtonFragmentFragmentDoc,
    "\n  mutation CreateQuestion(\n    $quizId: ID!\n    $text: String!\n    $allowMultipleAnswers: Boolean!\n    $mediaId: ID\n  ) {\n    createQuestion(\n      quizId: $quizId\n      text: $text\n      allowMultipleAnswers: $allowMultipleAnswers\n      mediaId: $mediaId\n    ) {\n      id\n      ...NewQuestionButtonFragmentQuestion\n    }\n  }\n": types.CreateQuestionDocument,
    "\n  fragment NewQuestionButtonFragmentQuestion on Question {\n    id\n    ...AdminQuestionsFragmentQuestion\n  }\n": types.NewQuestionButtonFragmentQuestionFragmentDoc,
    "\n  fragment QuestionEditorFragmentMedia on Media {\n    id\n    path\n    title\n    type\n  }\n": types.QuestionEditorFragmentMediaFragmentDoc,
    "\n  fragment QuestionEditorFragmentOption on Option {\n    id\n    text\n    isCorrect\n  }\n": types.QuestionEditorFragmentOptionFragmentDoc,
    "\n  fragment QuestionEditorFragment on Question {\n    id\n    text\n    allowMultipleAnswers\n    media {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n    options {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n": types.QuestionEditorFragmentFragmentDoc,
    "\n  mutation CreateMedia($file: Upload!, $title: String!) {\n    createMedia(file: $file, title: $title) {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n  }\n": types.CreateMediaDocument,
    "\n  mutation EditMedia($id: ID!, $file: Upload, $title: String) {\n    editMedia(id: $id, file: $file, title: $title) {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n  }\n": types.EditMediaDocument,
    "\n  mutation DeleteMedia($id: ID!) {\n    deleteMedia(id: $id)\n  }\n": types.DeleteMediaDocument,
    "\n  mutation EditQuestion(\n    $id: ID!\n    $text: String!\n    $allowMultipleAnswers: Boolean!\n    $mediaId: ID\n  ) {\n    editQuestion(\n      id: $id\n      text: $text\n      allowMultipleAnswers: $allowMultipleAnswers\n      mediaId: $mediaId\n    ) {\n      id\n      ...QuestionEditorFragment\n    }\n  }\n": types.EditQuestionDocument,
    "\n  mutation CreateOption(\n    $questionId: ID!\n    $text: String!\n    $isCorrect: Boolean!\n  ) {\n    createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n": types.CreateOptionDocument,
    "\n  mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {\n    editOption(id: $id, text: $text, isCorrect: $isCorrect) {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n": types.EditOptionDocument,
    "\n  mutation DeleteOption($id: ID!) {\n    deleteOption(id: $id)\n  }\n": types.DeleteOptionDocument,
    "\n  fragment QuestionsTableFragment on Question {\n    id\n    createdAt\n    ...QuestionsTableRowFragment\n  }\n": types.QuestionsTableFragmentFragmentDoc,
    "\n  fragment QuestionsTableRowFragment on Question {\n    id\n    text\n    media {\n      id\n      path\n      title\n      type\n    }\n    options {\n      id\n      text\n      isCorrect\n    }\n  }\n": types.QuestionsTableRowFragmentFragmentDoc,
    "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n": types.DeleteQuestionDocument,
    "\n  fragment QuizTitleFragment on Quiz {\n    id\n    title\n    description\n  }\n": types.QuizTitleFragmentFragmentDoc,
    "\n  mutation CreateQuiz($title: String!, $description: String!) {\n    createQuiz(title: $title, description: $description) {\n      id\n      ...AdminQuizzesFragmentQuiz\n    }\n  }\n": types.CreateQuizDocument,
    "\n  fragment NewQuizButtonFragmentQuiz on Quiz {\n    id\n    ...AdminQuizzesFragmentQuiz\n  }\n": types.NewQuizButtonFragmentQuizFragmentDoc,
    "\n  fragment QuizEditorFragment on Quiz {\n    id\n    title\n    description\n  }\n": types.QuizEditorFragmentFragmentDoc,
    "\n  mutation EditQuiz($id: ID!, $title: String!, $description: String!) {\n    editQuiz(id: $id, title: $title, description: $description) {\n      ...QuizEditorFragment\n    }\n  }\n": types.EditQuizDocument,
    "\n  fragment QuizzesTableFragment on Quiz {\n    id\n    createdAt\n    ...QuizzesTableRowFragment\n  }\n": types.QuizzesTableFragmentFragmentDoc,
    "\n  fragment QuizzesTableRowFragment on Quiz {\n    id\n    title\n    description\n  }\n": types.QuizzesTableRowFragmentFragmentDoc,
    "\n  mutation DeleteQuiz($id: ID!) {\n    deleteQuiz(id: $id)\n  }\n": types.DeleteQuizDocument,
    "\n  mutation ClearResults($quizId: ID!) {\n    clearResults(quizId: $quizId)\n  }\n": types.ClearResultsDocument,
    "\n  fragment QuizSelectorFragment on Quiz {\n    id\n    title\n  }\n": types.QuizSelectorFragmentFragmentDoc,
    "\n  fragment QuizStartButtonFragment on Quiz {\n    id\n  }\n": types.QuizStartButtonFragmentFragmentDoc,
    "\n  fragment ToplistFragment on Result {\n    id\n    quiz {\n      id\n      title\n    }\n    ...ToplistTableFragment\n  }\n": types.ToplistFragmentFragmentDoc,
    "\n  fragment ToplistTableFragment on Result {\n    id\n    ...ToplistTableRowFragment\n  }\n": types.ToplistTableFragmentFragmentDoc,
    "\n  fragment ToplistTableRowFragment on Result {\n    id\n    nickname\n    score\n    total\n    time\n    quiz {\n      id\n      title\n    }\n  }\n": types.ToplistTableRowFragmentFragmentDoc,
    "\n  fragment QuestionFragment on Question {\n    id\n    text\n    allowMultipleAnswers\n    options {\n      id\n      text\n    }\n    media {\n      id\n      path\n      title\n      type\n    }\n  }\n": types.QuestionFragmentFragmentDoc,
    "\n  fragment QuizNavigatorFragment on Quiz {\n    id\n    questions {\n      id\n    }\n  }\n": types.QuizNavigatorFragmentFragmentDoc,
    "\n  fragment ResultFragment on Result {\n    id\n    score\n    total\n    ...ResultBasicInfo\n    quiz {\n      id\n      ...SolutionsFragment\n    }\n  }\n": types.ResultFragmentFragmentDoc,
    "\n  fragment ResultBasicInfo on Result {\n    id\n    nickname\n    score\n    total\n    time\n  }\n": types.ResultBasicInfoFragmentDoc,
    "\n  fragment SolutionElement on Question {\n    id\n    text\n    options {\n      id\n      text\n      isCorrect\n    }\n    media {\n      id\n      path\n      type\n    }\n  }\n": types.SolutionElementFragmentDoc,
    "\n  fragment SolutionsFragment on Quiz {\n    id\n    title\n    questions {\n      id\n      ...SolutionElement\n    }\n  }\n": types.SolutionsFragmentFragmentDoc,
    "\n  mutation GetToken($username: String!, $password: String!) {\n    getToken(username: $username, password: $password)\n  }\n": types.GetTokenDocument,
    "\n  query Home($topResultsQuizId: ID) {\n    topResults(quizId: $topResultsQuizId, limit: 10) {\n      id\n      ...ToplistFragment\n    }\n    quizzes {\n      id\n      ...QuizSelectorFragment\n      ...QuizStartButtonFragment\n    }\n  }\n": types.HomeDocument,
    "\n  query Quiz($id: ID!) {\n    quiz(id: $id) {\n      id\n      ...QuizNavigatorFragment\n      questions {\n        ...QuestionFragment\n        id\n      }\n    }\n  }\n": types.QuizDocument,
    "\n  mutation CreateResult(\n    $quizId: ID!\n    $nickname: String!\n    $answers: [Answer!]!\n    $time: Int!\n  ) {\n    createResult(\n      quizId: $quizId\n      nickname: $nickname\n      answers: $answers\n      time: $time\n    ) {\n      id\n      ...ResultFragment\n    }\n  }\n": types.CreateResultDocument,
    "\n  fragment AdminQuestionsFragmentQuestion on Question {\n    id\n    ...QuestionEditorFragment\n    ...QuestionsTableFragment\n  }\n": types.AdminQuestionsFragmentQuestionFragmentDoc,
    "\n  query AdminQuiz($id: ID!) {\n    quiz(id: $id) {\n      id\n      ...QuizTitleFragment\n      ...NewQuestionButtonFragment\n      questions {\n        id\n        ...AdminQuestionsFragmentQuestion\n      }\n    }\n  }\n": types.AdminQuizDocument,
    "\n  fragment AdminQuizzesFragmentQuiz on Quiz {\n    id\n    title\n    description\n    ...QuizEditorFragment\n    ...QuizzesTableFragment\n  }\n": types.AdminQuizzesFragmentQuizFragmentDoc,
    "\n  query AdminQuizzes {\n    quizzes {\n      id\n      ...AdminQuizzesFragmentQuiz\n    }\n  }\n": types.AdminQuizzesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NewQuestionButtonFragment on Quiz {\n    id\n  }\n"): (typeof documents)["\n  fragment NewQuestionButtonFragment on Quiz {\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateQuestion(\n    $quizId: ID!\n    $text: String!\n    $allowMultipleAnswers: Boolean!\n    $mediaId: ID\n  ) {\n    createQuestion(\n      quizId: $quizId\n      text: $text\n      allowMultipleAnswers: $allowMultipleAnswers\n      mediaId: $mediaId\n    ) {\n      id\n      ...NewQuestionButtonFragmentQuestion\n    }\n  }\n"): (typeof documents)["\n  mutation CreateQuestion(\n    $quizId: ID!\n    $text: String!\n    $allowMultipleAnswers: Boolean!\n    $mediaId: ID\n  ) {\n    createQuestion(\n      quizId: $quizId\n      text: $text\n      allowMultipleAnswers: $allowMultipleAnswers\n      mediaId: $mediaId\n    ) {\n      id\n      ...NewQuestionButtonFragmentQuestion\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NewQuestionButtonFragmentQuestion on Question {\n    id\n    ...AdminQuestionsFragmentQuestion\n  }\n"): (typeof documents)["\n  fragment NewQuestionButtonFragmentQuestion on Question {\n    id\n    ...AdminQuestionsFragmentQuestion\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionEditorFragmentMedia on Media {\n    id\n    path\n    title\n    type\n  }\n"): (typeof documents)["\n  fragment QuestionEditorFragmentMedia on Media {\n    id\n    path\n    title\n    type\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionEditorFragmentOption on Option {\n    id\n    text\n    isCorrect\n  }\n"): (typeof documents)["\n  fragment QuestionEditorFragmentOption on Option {\n    id\n    text\n    isCorrect\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionEditorFragment on Question {\n    id\n    text\n    allowMultipleAnswers\n    media {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n    options {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n"): (typeof documents)["\n  fragment QuestionEditorFragment on Question {\n    id\n    text\n    allowMultipleAnswers\n    media {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n    options {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMedia($file: Upload!, $title: String!) {\n    createMedia(file: $file, title: $title) {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMedia($file: Upload!, $title: String!) {\n    createMedia(file: $file, title: $title) {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditMedia($id: ID!, $file: Upload, $title: String) {\n    editMedia(id: $id, file: $file, title: $title) {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n  }\n"): (typeof documents)["\n  mutation EditMedia($id: ID!, $file: Upload, $title: String) {\n    editMedia(id: $id, file: $file, title: $title) {\n      id\n      ...QuestionEditorFragmentMedia\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteMedia($id: ID!) {\n    deleteMedia(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteMedia($id: ID!) {\n    deleteMedia(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditQuestion(\n    $id: ID!\n    $text: String!\n    $allowMultipleAnswers: Boolean!\n    $mediaId: ID\n  ) {\n    editQuestion(\n      id: $id\n      text: $text\n      allowMultipleAnswers: $allowMultipleAnswers\n      mediaId: $mediaId\n    ) {\n      id\n      ...QuestionEditorFragment\n    }\n  }\n"): (typeof documents)["\n  mutation EditQuestion(\n    $id: ID!\n    $text: String!\n    $allowMultipleAnswers: Boolean!\n    $mediaId: ID\n  ) {\n    editQuestion(\n      id: $id\n      text: $text\n      allowMultipleAnswers: $allowMultipleAnswers\n      mediaId: $mediaId\n    ) {\n      id\n      ...QuestionEditorFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOption(\n    $questionId: ID!\n    $text: String!\n    $isCorrect: Boolean!\n  ) {\n    createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOption(\n    $questionId: ID!\n    $text: String!\n    $isCorrect: Boolean!\n  ) {\n    createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {\n    editOption(id: $id, text: $text, isCorrect: $isCorrect) {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n"): (typeof documents)["\n  mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {\n    editOption(id: $id, text: $text, isCorrect: $isCorrect) {\n      id\n      ...QuestionEditorFragmentOption\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteOption($id: ID!) {\n    deleteOption(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteOption($id: ID!) {\n    deleteOption(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionsTableFragment on Question {\n    id\n    createdAt\n    ...QuestionsTableRowFragment\n  }\n"): (typeof documents)["\n  fragment QuestionsTableFragment on Question {\n    id\n    createdAt\n    ...QuestionsTableRowFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionsTableRowFragment on Question {\n    id\n    text\n    media {\n      id\n      path\n      title\n      type\n    }\n    options {\n      id\n      text\n      isCorrect\n    }\n  }\n"): (typeof documents)["\n  fragment QuestionsTableRowFragment on Question {\n    id\n    text\n    media {\n      id\n      path\n      title\n      type\n    }\n    options {\n      id\n      text\n      isCorrect\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuizTitleFragment on Quiz {\n    id\n    title\n    description\n  }\n"): (typeof documents)["\n  fragment QuizTitleFragment on Quiz {\n    id\n    title\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateQuiz($title: String!, $description: String!) {\n    createQuiz(title: $title, description: $description) {\n      id\n      ...AdminQuizzesFragmentQuiz\n    }\n  }\n"): (typeof documents)["\n  mutation CreateQuiz($title: String!, $description: String!) {\n    createQuiz(title: $title, description: $description) {\n      id\n      ...AdminQuizzesFragmentQuiz\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NewQuizButtonFragmentQuiz on Quiz {\n    id\n    ...AdminQuizzesFragmentQuiz\n  }\n"): (typeof documents)["\n  fragment NewQuizButtonFragmentQuiz on Quiz {\n    id\n    ...AdminQuizzesFragmentQuiz\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuizEditorFragment on Quiz {\n    id\n    title\n    description\n  }\n"): (typeof documents)["\n  fragment QuizEditorFragment on Quiz {\n    id\n    title\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditQuiz($id: ID!, $title: String!, $description: String!) {\n    editQuiz(id: $id, title: $title, description: $description) {\n      ...QuizEditorFragment\n    }\n  }\n"): (typeof documents)["\n  mutation EditQuiz($id: ID!, $title: String!, $description: String!) {\n    editQuiz(id: $id, title: $title, description: $description) {\n      ...QuizEditorFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuizzesTableFragment on Quiz {\n    id\n    createdAt\n    ...QuizzesTableRowFragment\n  }\n"): (typeof documents)["\n  fragment QuizzesTableFragment on Quiz {\n    id\n    createdAt\n    ...QuizzesTableRowFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuizzesTableRowFragment on Quiz {\n    id\n    title\n    description\n  }\n"): (typeof documents)["\n  fragment QuizzesTableRowFragment on Quiz {\n    id\n    title\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteQuiz($id: ID!) {\n    deleteQuiz(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteQuiz($id: ID!) {\n    deleteQuiz(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClearResults($quizId: ID!) {\n    clearResults(quizId: $quizId)\n  }\n"): (typeof documents)["\n  mutation ClearResults($quizId: ID!) {\n    clearResults(quizId: $quizId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuizSelectorFragment on Quiz {\n    id\n    title\n  }\n"): (typeof documents)["\n  fragment QuizSelectorFragment on Quiz {\n    id\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuizStartButtonFragment on Quiz {\n    id\n  }\n"): (typeof documents)["\n  fragment QuizStartButtonFragment on Quiz {\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ToplistFragment on Result {\n    id\n    quiz {\n      id\n      title\n    }\n    ...ToplistTableFragment\n  }\n"): (typeof documents)["\n  fragment ToplistFragment on Result {\n    id\n    quiz {\n      id\n      title\n    }\n    ...ToplistTableFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ToplistTableFragment on Result {\n    id\n    ...ToplistTableRowFragment\n  }\n"): (typeof documents)["\n  fragment ToplistTableFragment on Result {\n    id\n    ...ToplistTableRowFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ToplistTableRowFragment on Result {\n    id\n    nickname\n    score\n    total\n    time\n    quiz {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  fragment ToplistTableRowFragment on Result {\n    id\n    nickname\n    score\n    total\n    time\n    quiz {\n      id\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionFragment on Question {\n    id\n    text\n    allowMultipleAnswers\n    options {\n      id\n      text\n    }\n    media {\n      id\n      path\n      title\n      type\n    }\n  }\n"): (typeof documents)["\n  fragment QuestionFragment on Question {\n    id\n    text\n    allowMultipleAnswers\n    options {\n      id\n      text\n    }\n    media {\n      id\n      path\n      title\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuizNavigatorFragment on Quiz {\n    id\n    questions {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment QuizNavigatorFragment on Quiz {\n    id\n    questions {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ResultFragment on Result {\n    id\n    score\n    total\n    ...ResultBasicInfo\n    quiz {\n      id\n      ...SolutionsFragment\n    }\n  }\n"): (typeof documents)["\n  fragment ResultFragment on Result {\n    id\n    score\n    total\n    ...ResultBasicInfo\n    quiz {\n      id\n      ...SolutionsFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ResultBasicInfo on Result {\n    id\n    nickname\n    score\n    total\n    time\n  }\n"): (typeof documents)["\n  fragment ResultBasicInfo on Result {\n    id\n    nickname\n    score\n    total\n    time\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SolutionElement on Question {\n    id\n    text\n    options {\n      id\n      text\n      isCorrect\n    }\n    media {\n      id\n      path\n      type\n    }\n  }\n"): (typeof documents)["\n  fragment SolutionElement on Question {\n    id\n    text\n    options {\n      id\n      text\n      isCorrect\n    }\n    media {\n      id\n      path\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SolutionsFragment on Quiz {\n    id\n    title\n    questions {\n      id\n      ...SolutionElement\n    }\n  }\n"): (typeof documents)["\n  fragment SolutionsFragment on Quiz {\n    id\n    title\n    questions {\n      id\n      ...SolutionElement\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GetToken($username: String!, $password: String!) {\n    getToken(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation GetToken($username: String!, $password: String!) {\n    getToken(username: $username, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Home($topResultsQuizId: ID) {\n    topResults(quizId: $topResultsQuizId, limit: 10) {\n      id\n      ...ToplistFragment\n    }\n    quizzes {\n      id\n      ...QuizSelectorFragment\n      ...QuizStartButtonFragment\n    }\n  }\n"): (typeof documents)["\n  query Home($topResultsQuizId: ID) {\n    topResults(quizId: $topResultsQuizId, limit: 10) {\n      id\n      ...ToplistFragment\n    }\n    quizzes {\n      id\n      ...QuizSelectorFragment\n      ...QuizStartButtonFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Quiz($id: ID!) {\n    quiz(id: $id) {\n      id\n      ...QuizNavigatorFragment\n      questions {\n        ...QuestionFragment\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Quiz($id: ID!) {\n    quiz(id: $id) {\n      id\n      ...QuizNavigatorFragment\n      questions {\n        ...QuestionFragment\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateResult(\n    $quizId: ID!\n    $nickname: String!\n    $answers: [Answer!]!\n    $time: Int!\n  ) {\n    createResult(\n      quizId: $quizId\n      nickname: $nickname\n      answers: $answers\n      time: $time\n    ) {\n      id\n      ...ResultFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateResult(\n    $quizId: ID!\n    $nickname: String!\n    $answers: [Answer!]!\n    $time: Int!\n  ) {\n    createResult(\n      quizId: $quizId\n      nickname: $nickname\n      answers: $answers\n      time: $time\n    ) {\n      id\n      ...ResultFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AdminQuestionsFragmentQuestion on Question {\n    id\n    ...QuestionEditorFragment\n    ...QuestionsTableFragment\n  }\n"): (typeof documents)["\n  fragment AdminQuestionsFragmentQuestion on Question {\n    id\n    ...QuestionEditorFragment\n    ...QuestionsTableFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminQuiz($id: ID!) {\n    quiz(id: $id) {\n      id\n      ...QuizTitleFragment\n      ...NewQuestionButtonFragment\n      questions {\n        id\n        ...AdminQuestionsFragmentQuestion\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminQuiz($id: ID!) {\n    quiz(id: $id) {\n      id\n      ...QuizTitleFragment\n      ...NewQuestionButtonFragment\n      questions {\n        id\n        ...AdminQuestionsFragmentQuestion\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AdminQuizzesFragmentQuiz on Quiz {\n    id\n    title\n    description\n    ...QuizEditorFragment\n    ...QuizzesTableFragment\n  }\n"): (typeof documents)["\n  fragment AdminQuizzesFragmentQuiz on Quiz {\n    id\n    title\n    description\n    ...QuizEditorFragment\n    ...QuizzesTableFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminQuizzes {\n    quizzes {\n      id\n      ...AdminQuizzesFragmentQuiz\n    }\n  }\n"): (typeof documents)["\n  query AdminQuizzes {\n    quizzes {\n      id\n      ...AdminQuizzesFragmentQuiz\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;