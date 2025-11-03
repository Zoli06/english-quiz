import {useMutation, useQuery} from "@apollo/client/react";
import {graphql} from "@/gql";
import {useCallback, useState} from "react";
import {EditOptionMutationVariables, EditQuestionMutationVariables} from "@/gql/graphql.ts";
import {SetOptional} from "type-fest";

const QUESTION_OPTIONS_QUERY = graphql(`
    query QuestionOptions($questionId: ID!) {
        question(id: $questionId) {
            id
            options {
                id
            }
        }
    }
`);

const EDIT_QUESTION_MUTATION = graphql(`
    mutation EditQuestion(
        $id: ID!
        $text: String!
        $allowMultipleAnswers: Boolean!
        $mediaId: ID
    ) {
        editQuestion(
            id: $id
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

const CREATE_OPTION_MUTATION = graphql(`
    mutation CreateOption(
        $questionId: ID!
        $text: String!
        $isCorrect: Boolean!
    ) {
        createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {
            id
            text
            isCorrect
        }
    }
`);

const EDIT_OPTION_MUTATION = graphql(`
    mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {
        editOption(id: $id, text: $text, isCorrect: $isCorrect) {
            id
            text
            isCorrect
        }
    }
`);

const DELETE_OPTION_MUTATION = graphql(`
    mutation DeleteOption($id: ID!) {
        deleteOption(id: $id)
    }
`);

export const useEditQuestion = (
    questionId: string
) => {
    const {data, loading, error, refetch} = useQuery(QUESTION_OPTIONS_QUERY, {
        variables: {questionId},
    });

    const [editQuestion] = useMutation(EDIT_QUESTION_MUTATION);
    const [createOption] = useMutation(CREATE_OPTION_MUTATION);
    const [editOption] = useMutation(EDIT_OPTION_MUTATION);
    const [deleteOption] = useMutation(DELETE_OPTION_MUTATION);

    const [isSaving, setIsSaving] = useState(false);

    const handleEditQuestion = useCallback(async ({
                                                      question,
                                                      options,
                                                  }: {
        question: Omit<EditQuestionMutationVariables, 'id'>,
        options: SetOptional<EditOptionMutationVariables, 'id'>[],
    }) => {
        setIsSaving(true);
        try {
            await editQuestion({
                variables: {
                    id: questionId,
                    ...question,
                },
            });

            const existingOptionIds = data?.question?.options.map((opt) => opt.id) || [];
            const submittedOptionIds = options
                .filter((opt) => opt.id)
                .map((opt) => opt.id as string);

            // Delete options that were removed
            for (const optionId of existingOptionIds) {
                if (!submittedOptionIds.includes(optionId)) {
                    await deleteOption({variables: {id: optionId}});
                }
            }

            // Create or edit options
            for (const option of options) {
                if (option.id) {
                    // Edit existing option
                    await editOption({
                        variables: {
                            id: option.id,
                            text: option.text,
                            isCorrect: option.isCorrect,
                        },
                    });
                } else {
                    // Create new option
                    await createOption({
                        variables: {
                            questionId,
                            text: option.text,
                            isCorrect: option.isCorrect,
                        },
                    });
                }
            }

            await refetch();
        } finally {
            setIsSaving(false);
        }
    }, [questionId, editQuestion, createOption, editOption, deleteOption, data, refetch]);

    return {
        loading,
        error,
        isSaving,
        refetch,
        editQuestion: handleEditQuestion,
    };
}