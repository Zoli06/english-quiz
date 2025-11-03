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
    "\n    mutation GetToken($username: String!, $password: String!) {\n        getToken(username: $username, password: $password)\n    }\n": typeof types.GetTokenDocument,
    "\n    fragment QuestionEditorFragment on Question {\n        id\n        text\n        media {\n            id\n            url\n            title\n            type\n        }\n        options {\n            id\n            text\n            isCorrect\n        }\n        allowMultipleAnswers\n    }\n": typeof types.QuestionEditorFragmentFragmentDoc,
    "\n    mutation CreateMedia($file: Upload!, $title: String!) {\n        createMedia(file: $file, title: $title) {\n            id\n            url\n            title\n            type\n        }\n    }\n": typeof types.CreateMediaDocument,
    "\n    mutation EditMedia($id: ID!, $file: Upload!, $title: String!) {\n        editMedia(id: $id, file: $file, title: $title) {\n            id\n            url\n            title\n            type\n        }\n    }\n": typeof types.EditMediaDocument,
    "\n    mutation DeleteMedia($id: ID!) {\n        deleteMedia(id: $id)\n    }\n": typeof types.DeleteMediaDocument,
    "\n    mutation CreateQuestion(\n        $quizId: ID!\n        $text: String!\n        $allowMultipleAnswers: Boolean!\n        $mediaId: ID\n    ) {\n        createQuestion(\n            quizId: $quizId\n            text: $text\n            allowMultipleAnswers: $allowMultipleAnswers\n            mediaId: $mediaId\n        ) {\n            id\n            text\n            allowMultipleAnswers\n            media {\n                id\n                url\n                title\n                type\n            }\n            createdAt\n        }\n    }\n": typeof types.CreateQuestionDocument,
    "\n    query QuestionOptions($questionId: ID!) {\n        question(id: $questionId) {\n            id\n            options {\n                id\n            }\n        }\n    }\n": typeof types.QuestionOptionsDocument,
    "\n    mutation EditQuestion(\n        $id: ID!\n        $text: String!\n        $allowMultipleAnswers: Boolean!\n        $mediaId: ID\n    ) {\n        editQuestion(\n            id: $id\n            text: $text\n            allowMultipleAnswers: $allowMultipleAnswers\n            mediaId: $mediaId\n        ) {\n            id\n            text\n            allowMultipleAnswers\n            media {\n                id\n                url\n                title\n                type\n            }\n            createdAt\n        }\n    }\n": typeof types.EditQuestionDocument,
    "\n    mutation CreateOption(\n        $questionId: ID!\n        $text: String!\n        $isCorrect: Boolean!\n    ) {\n        createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {\n            id\n            text\n            isCorrect\n        }\n    }\n": typeof types.CreateOptionDocument,
    "\n    mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {\n        editOption(id: $id, text: $text, isCorrect: $isCorrect) {\n            id\n            text\n            isCorrect\n        }\n    }\n": typeof types.EditOptionDocument,
    "\n    mutation DeleteOption($id: ID!) {\n        deleteOption(id: $id)\n    }\n": typeof types.DeleteOptionDocument,
    "\n    query AdminQuiz($id: ID!) {\n        quiz(id: $id) {\n            id\n            title\n            description\n            questions {\n                id\n                text\n                allowMultipleAnswers\n                options {\n                    id\n                    text\n                    isCorrect\n                }\n                media {\n                    id\n                    url\n                    title\n                    type\n                }\n                createdAt\n            }\n        }\n    }\n": typeof types.AdminQuizDocument,
    "\n    mutation DeleteQuestion($id: ID!) {\n        deleteQuestion(id: $id)\n    }\n": typeof types.DeleteQuestionDocument,
    "\n    query Admin {\n        quizzes {\n            id\n            title\n            description\n        }\n    }\n": typeof types.AdminDocument,
    "\n    mutation CreateQuiz($title: String!, $description: String!) {\n        createQuiz(title: $title, description: $description) {\n            id\n            title\n            description\n        }\n    }\n": typeof types.CreateQuizDocument,
    "\n    mutation EditQuiz($id: ID!, $title: String!, $description: String!) {\n        editQuiz(id: $id, title: $title, description: $description) {\n            id\n            title\n            description\n        }\n    }\n": typeof types.EditQuizDocument,
    "\n    mutation DeleteQuiz($id: ID!) {\n        deleteQuiz(id: $id)\n    }\n": typeof types.DeleteQuizDocument,
    "\n    query Home($topAttemptsQuizId: ID) {\n        topAttempts(quizId: $topAttemptsQuizId, limit: 10) {\n            id\n            nickname\n            score\n            total\n            quiz {\n                id\n                title\n            }\n            time\n        }\n        quizzes {\n            id\n            title\n        }\n    }\n": typeof types.HomeDocument,
    "\n    query Quiz($id: ID!) {\n        quiz(id: $id) {\n            id\n            questions {\n                id\n                text\n                allowMultipleAnswers\n                options {\n                    id\n                    text\n                }\n                media {\n                    id\n                    url\n                    title\n                    type\n                }\n            }\n        }\n    }\n": typeof types.QuizDocument,
    "\n    mutation SubmitAttempt(\n        $quizId: ID!\n        $nickname: String!\n        $answers: [Answer!]!\n        $time: Int!\n    ) {\n        submitAttempt(\n            quizId: $quizId\n            nickname: $nickname\n            answers: $answers\n            time: $time\n        ) {\n            attempt {\n                id\n            }\n            quiz {\n                id\n                questions {\n                    id\n                    options {\n                        id\n                        text\n                        isCorrect\n                    }\n                }\n            }\n        }\n    }\n": typeof types.SubmitAttemptDocument,
    "\n  query Attempt($id: ID!) {\n    attempt(id: $id) {\n      id\n      nickname\n      score\n      total\n      time\n    }\n  }\n": typeof types.AttemptDocument,
};
const documents: Documents = {
    "\n    mutation GetToken($username: String!, $password: String!) {\n        getToken(username: $username, password: $password)\n    }\n": types.GetTokenDocument,
    "\n    fragment QuestionEditorFragment on Question {\n        id\n        text\n        media {\n            id\n            url\n            title\n            type\n        }\n        options {\n            id\n            text\n            isCorrect\n        }\n        allowMultipleAnswers\n    }\n": types.QuestionEditorFragmentFragmentDoc,
    "\n    mutation CreateMedia($file: Upload!, $title: String!) {\n        createMedia(file: $file, title: $title) {\n            id\n            url\n            title\n            type\n        }\n    }\n": types.CreateMediaDocument,
    "\n    mutation EditMedia($id: ID!, $file: Upload!, $title: String!) {\n        editMedia(id: $id, file: $file, title: $title) {\n            id\n            url\n            title\n            type\n        }\n    }\n": types.EditMediaDocument,
    "\n    mutation DeleteMedia($id: ID!) {\n        deleteMedia(id: $id)\n    }\n": types.DeleteMediaDocument,
    "\n    mutation CreateQuestion(\n        $quizId: ID!\n        $text: String!\n        $allowMultipleAnswers: Boolean!\n        $mediaId: ID\n    ) {\n        createQuestion(\n            quizId: $quizId\n            text: $text\n            allowMultipleAnswers: $allowMultipleAnswers\n            mediaId: $mediaId\n        ) {\n            id\n            text\n            allowMultipleAnswers\n            media {\n                id\n                url\n                title\n                type\n            }\n            createdAt\n        }\n    }\n": types.CreateQuestionDocument,
    "\n    query QuestionOptions($questionId: ID!) {\n        question(id: $questionId) {\n            id\n            options {\n                id\n            }\n        }\n    }\n": types.QuestionOptionsDocument,
    "\n    mutation EditQuestion(\n        $id: ID!\n        $text: String!\n        $allowMultipleAnswers: Boolean!\n        $mediaId: ID\n    ) {\n        editQuestion(\n            id: $id\n            text: $text\n            allowMultipleAnswers: $allowMultipleAnswers\n            mediaId: $mediaId\n        ) {\n            id\n            text\n            allowMultipleAnswers\n            media {\n                id\n                url\n                title\n                type\n            }\n            createdAt\n        }\n    }\n": types.EditQuestionDocument,
    "\n    mutation CreateOption(\n        $questionId: ID!\n        $text: String!\n        $isCorrect: Boolean!\n    ) {\n        createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {\n            id\n            text\n            isCorrect\n        }\n    }\n": types.CreateOptionDocument,
    "\n    mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {\n        editOption(id: $id, text: $text, isCorrect: $isCorrect) {\n            id\n            text\n            isCorrect\n        }\n    }\n": types.EditOptionDocument,
    "\n    mutation DeleteOption($id: ID!) {\n        deleteOption(id: $id)\n    }\n": types.DeleteOptionDocument,
    "\n    query AdminQuiz($id: ID!) {\n        quiz(id: $id) {\n            id\n            title\n            description\n            questions {\n                id\n                text\n                allowMultipleAnswers\n                options {\n                    id\n                    text\n                    isCorrect\n                }\n                media {\n                    id\n                    url\n                    title\n                    type\n                }\n                createdAt\n            }\n        }\n    }\n": types.AdminQuizDocument,
    "\n    mutation DeleteQuestion($id: ID!) {\n        deleteQuestion(id: $id)\n    }\n": types.DeleteQuestionDocument,
    "\n    query Admin {\n        quizzes {\n            id\n            title\n            description\n        }\n    }\n": types.AdminDocument,
    "\n    mutation CreateQuiz($title: String!, $description: String!) {\n        createQuiz(title: $title, description: $description) {\n            id\n            title\n            description\n        }\n    }\n": types.CreateQuizDocument,
    "\n    mutation EditQuiz($id: ID!, $title: String!, $description: String!) {\n        editQuiz(id: $id, title: $title, description: $description) {\n            id\n            title\n            description\n        }\n    }\n": types.EditQuizDocument,
    "\n    mutation DeleteQuiz($id: ID!) {\n        deleteQuiz(id: $id)\n    }\n": types.DeleteQuizDocument,
    "\n    query Home($topAttemptsQuizId: ID) {\n        topAttempts(quizId: $topAttemptsQuizId, limit: 10) {\n            id\n            nickname\n            score\n            total\n            quiz {\n                id\n                title\n            }\n            time\n        }\n        quizzes {\n            id\n            title\n        }\n    }\n": types.HomeDocument,
    "\n    query Quiz($id: ID!) {\n        quiz(id: $id) {\n            id\n            questions {\n                id\n                text\n                allowMultipleAnswers\n                options {\n                    id\n                    text\n                }\n                media {\n                    id\n                    url\n                    title\n                    type\n                }\n            }\n        }\n    }\n": types.QuizDocument,
    "\n    mutation SubmitAttempt(\n        $quizId: ID!\n        $nickname: String!\n        $answers: [Answer!]!\n        $time: Int!\n    ) {\n        submitAttempt(\n            quizId: $quizId\n            nickname: $nickname\n            answers: $answers\n            time: $time\n        ) {\n            attempt {\n                id\n            }\n            quiz {\n                id\n                questions {\n                    id\n                    options {\n                        id\n                        text\n                        isCorrect\n                    }\n                }\n            }\n        }\n    }\n": types.SubmitAttemptDocument,
    "\n  query Attempt($id: ID!) {\n    attempt(id: $id) {\n      id\n      nickname\n      score\n      total\n      time\n    }\n  }\n": types.AttemptDocument,
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
export function graphql(source: "\n    mutation GetToken($username: String!, $password: String!) {\n        getToken(username: $username, password: $password)\n    }\n"): (typeof documents)["\n    mutation GetToken($username: String!, $password: String!) {\n        getToken(username: $username, password: $password)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment QuestionEditorFragment on Question {\n        id\n        text\n        media {\n            id\n            url\n            title\n            type\n        }\n        options {\n            id\n            text\n            isCorrect\n        }\n        allowMultipleAnswers\n    }\n"): (typeof documents)["\n    fragment QuestionEditorFragment on Question {\n        id\n        text\n        media {\n            id\n            url\n            title\n            type\n        }\n        options {\n            id\n            text\n            isCorrect\n        }\n        allowMultipleAnswers\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateMedia($file: Upload!, $title: String!) {\n        createMedia(file: $file, title: $title) {\n            id\n            url\n            title\n            type\n        }\n    }\n"): (typeof documents)["\n    mutation CreateMedia($file: Upload!, $title: String!) {\n        createMedia(file: $file, title: $title) {\n            id\n            url\n            title\n            type\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation EditMedia($id: ID!, $file: Upload!, $title: String!) {\n        editMedia(id: $id, file: $file, title: $title) {\n            id\n            url\n            title\n            type\n        }\n    }\n"): (typeof documents)["\n    mutation EditMedia($id: ID!, $file: Upload!, $title: String!) {\n        editMedia(id: $id, file: $file, title: $title) {\n            id\n            url\n            title\n            type\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteMedia($id: ID!) {\n        deleteMedia(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteMedia($id: ID!) {\n        deleteMedia(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateQuestion(\n        $quizId: ID!\n        $text: String!\n        $allowMultipleAnswers: Boolean!\n        $mediaId: ID\n    ) {\n        createQuestion(\n            quizId: $quizId\n            text: $text\n            allowMultipleAnswers: $allowMultipleAnswers\n            mediaId: $mediaId\n        ) {\n            id\n            text\n            allowMultipleAnswers\n            media {\n                id\n                url\n                title\n                type\n            }\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation CreateQuestion(\n        $quizId: ID!\n        $text: String!\n        $allowMultipleAnswers: Boolean!\n        $mediaId: ID\n    ) {\n        createQuestion(\n            quizId: $quizId\n            text: $text\n            allowMultipleAnswers: $allowMultipleAnswers\n            mediaId: $mediaId\n        ) {\n            id\n            text\n            allowMultipleAnswers\n            media {\n                id\n                url\n                title\n                type\n            }\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query QuestionOptions($questionId: ID!) {\n        question(id: $questionId) {\n            id\n            options {\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    query QuestionOptions($questionId: ID!) {\n        question(id: $questionId) {\n            id\n            options {\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation EditQuestion(\n        $id: ID!\n        $text: String!\n        $allowMultipleAnswers: Boolean!\n        $mediaId: ID\n    ) {\n        editQuestion(\n            id: $id\n            text: $text\n            allowMultipleAnswers: $allowMultipleAnswers\n            mediaId: $mediaId\n        ) {\n            id\n            text\n            allowMultipleAnswers\n            media {\n                id\n                url\n                title\n                type\n            }\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation EditQuestion(\n        $id: ID!\n        $text: String!\n        $allowMultipleAnswers: Boolean!\n        $mediaId: ID\n    ) {\n        editQuestion(\n            id: $id\n            text: $text\n            allowMultipleAnswers: $allowMultipleAnswers\n            mediaId: $mediaId\n        ) {\n            id\n            text\n            allowMultipleAnswers\n            media {\n                id\n                url\n                title\n                type\n            }\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateOption(\n        $questionId: ID!\n        $text: String!\n        $isCorrect: Boolean!\n    ) {\n        createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {\n            id\n            text\n            isCorrect\n        }\n    }\n"): (typeof documents)["\n    mutation CreateOption(\n        $questionId: ID!\n        $text: String!\n        $isCorrect: Boolean!\n    ) {\n        createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {\n            id\n            text\n            isCorrect\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {\n        editOption(id: $id, text: $text, isCorrect: $isCorrect) {\n            id\n            text\n            isCorrect\n        }\n    }\n"): (typeof documents)["\n    mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {\n        editOption(id: $id, text: $text, isCorrect: $isCorrect) {\n            id\n            text\n            isCorrect\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteOption($id: ID!) {\n        deleteOption(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteOption($id: ID!) {\n        deleteOption(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query AdminQuiz($id: ID!) {\n        quiz(id: $id) {\n            id\n            title\n            description\n            questions {\n                id\n                text\n                allowMultipleAnswers\n                options {\n                    id\n                    text\n                    isCorrect\n                }\n                media {\n                    id\n                    url\n                    title\n                    type\n                }\n                createdAt\n            }\n        }\n    }\n"): (typeof documents)["\n    query AdminQuiz($id: ID!) {\n        quiz(id: $id) {\n            id\n            title\n            description\n            questions {\n                id\n                text\n                allowMultipleAnswers\n                options {\n                    id\n                    text\n                    isCorrect\n                }\n                media {\n                    id\n                    url\n                    title\n                    type\n                }\n                createdAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteQuestion($id: ID!) {\n        deleteQuestion(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteQuestion($id: ID!) {\n        deleteQuestion(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Admin {\n        quizzes {\n            id\n            title\n            description\n        }\n    }\n"): (typeof documents)["\n    query Admin {\n        quizzes {\n            id\n            title\n            description\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateQuiz($title: String!, $description: String!) {\n        createQuiz(title: $title, description: $description) {\n            id\n            title\n            description\n        }\n    }\n"): (typeof documents)["\n    mutation CreateQuiz($title: String!, $description: String!) {\n        createQuiz(title: $title, description: $description) {\n            id\n            title\n            description\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation EditQuiz($id: ID!, $title: String!, $description: String!) {\n        editQuiz(id: $id, title: $title, description: $description) {\n            id\n            title\n            description\n        }\n    }\n"): (typeof documents)["\n    mutation EditQuiz($id: ID!, $title: String!, $description: String!) {\n        editQuiz(id: $id, title: $title, description: $description) {\n            id\n            title\n            description\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteQuiz($id: ID!) {\n        deleteQuiz(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteQuiz($id: ID!) {\n        deleteQuiz(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Home($topAttemptsQuizId: ID) {\n        topAttempts(quizId: $topAttemptsQuizId, limit: 10) {\n            id\n            nickname\n            score\n            total\n            quiz {\n                id\n                title\n            }\n            time\n        }\n        quizzes {\n            id\n            title\n        }\n    }\n"): (typeof documents)["\n    query Home($topAttemptsQuizId: ID) {\n        topAttempts(quizId: $topAttemptsQuizId, limit: 10) {\n            id\n            nickname\n            score\n            total\n            quiz {\n                id\n                title\n            }\n            time\n        }\n        quizzes {\n            id\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Quiz($id: ID!) {\n        quiz(id: $id) {\n            id\n            questions {\n                id\n                text\n                allowMultipleAnswers\n                options {\n                    id\n                    text\n                }\n                media {\n                    id\n                    url\n                    title\n                    type\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query Quiz($id: ID!) {\n        quiz(id: $id) {\n            id\n            questions {\n                id\n                text\n                allowMultipleAnswers\n                options {\n                    id\n                    text\n                }\n                media {\n                    id\n                    url\n                    title\n                    type\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SubmitAttempt(\n        $quizId: ID!\n        $nickname: String!\n        $answers: [Answer!]!\n        $time: Int!\n    ) {\n        submitAttempt(\n            quizId: $quizId\n            nickname: $nickname\n            answers: $answers\n            time: $time\n        ) {\n            attempt {\n                id\n            }\n            quiz {\n                id\n                questions {\n                    id\n                    options {\n                        id\n                        text\n                        isCorrect\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation SubmitAttempt(\n        $quizId: ID!\n        $nickname: String!\n        $answers: [Answer!]!\n        $time: Int!\n    ) {\n        submitAttempt(\n            quizId: $quizId\n            nickname: $nickname\n            answers: $answers\n            time: $time\n        ) {\n            attempt {\n                id\n            }\n            quiz {\n                id\n                questions {\n                    id\n                    options {\n                        id\n                        text\n                        isCorrect\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Attempt($id: ID!) {\n    attempt(id: $id) {\n      id\n      nickname\n      score\n      total\n      time\n    }\n  }\n"): (typeof documents)["\n  query Attempt($id: ID!) {\n    attempt(id: $id) {\n      id\n      nickname\n      score\n      total\n      time\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;