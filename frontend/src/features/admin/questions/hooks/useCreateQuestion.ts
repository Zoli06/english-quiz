import {graphql} from "@/gql";
import {useCallback} from "react";
import {useMutation} from "@apollo/client/react";
import {CreateQuestionMutationVariables} from "@/gql/graphql.ts";

const CREATE_QUESTION_MUTATION = graphql(`
    mutation CreateQuestion(
        $quizId: ID!
        $text: String!
        $allowMultipleAnswers: Boolean!
        $mediaId: ID
    ) {
        createQuestion(
            quizId: $quizId
            text: $text
            allowMultipleAnswers: $allowMultipleAnswers
            mediaId: $mediaId
        ) {
            id
            text
            allowMultipleAnswers
            media {
                id
                url
                title
                type
            }
            createdAt
        }
    }
`);

export const useCreateQuestion = () => {
    const [createQuestionMutation] = useMutation(CREATE_QUESTION_MUTATION);

    const createQuestion = useCallback(
        async (
            question: CreateQuestionMutationVariables
        ) => {
            const response = await createQuestionMutation({
                variables: question,
            });
            return response.data?.createQuestion;
        }
        , [createQuestionMutation]
    );

    return {
        createQuestion
    }
}