import {useMutation} from "@apollo/client/react";
import {graphql} from "@/gql";
import {useCallback, useState} from "react";
import {EditQuestionMutationVariables} from "@/gql/graphql.ts";
import {EditedOption, EditState} from "@/features/admin/questions/types/editedOption.ts";

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
            options {
                id
            }
            media {
                id
            }
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
            questionId
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

export const useEditQuestion = () => {
    const [editQuestion] = useMutation(EDIT_QUESTION_MUTATION);
    const [createOption] = useMutation(CREATE_OPTION_MUTATION);
    const [editOption] = useMutation(EDIT_OPTION_MUTATION);
    const [deleteOption] = useMutation(DELETE_OPTION_MUTATION);

    const [isSaving, setIsSaving] = useState(false);

    const handleEditQuestion = useCallback(async ({
                                                      question,
                                                      options,
                                                  }: {
        question: EditQuestionMutationVariables,
        options: EditedOption[],
    }) => {
        setIsSaving(true);
        try {
            // Create or edit options
            for (const option of options) {
                if (option.editState === EditState.Created) {
                    // Create new option
                    await createOption({
                        variables: {
                            questionId: question.id,
                            text: option.text,
                            isCorrect: option.isCorrect,
                        },
                    });
                } else if (option.editState === EditState.Edited) {
                    // Edit existing option
                    await editOption({
                        variables: {
                            id: option.id,
                            text: option.text,
                            isCorrect: option.isCorrect,
                        },
                    });
                } else if (option.editState === EditState.Deleted) {
                    // Delete option
                    await deleteOption({
                        variables: {
                            id: option.id,
                        },
                    });
                }
            }

            await editQuestion({
                variables: question,
            });
        } finally {
            setIsSaving(false);
        }
    }, [editQuestion, createOption, editOption, deleteOption]);

    return {
        isSaving,
        editQuestion: handleEditQuestion,
    };
}