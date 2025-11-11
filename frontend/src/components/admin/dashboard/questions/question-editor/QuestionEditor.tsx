import { useMutation } from "@apollo/client/react";
import { useCallback, useState } from "react";
import { Form } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";
import { QuestionEditorOptions } from "./QuestionEditorOptions.tsx";
import { QuestionEditorMedia } from "./QuestionEditorMedia.tsx";
import { QuestionEditorButtons } from "./QuestionEditorButtons.tsx";
import { QuestionEditorText } from "./QuestionEditorText.tsx";

const QUESTION_EDITOR_FRAGMENT_MEDIA = graphql(`
  fragment QuestionEditorFragmentMedia on Media {
    id
    path
    title
    type
  }
`);

const QUESTION_EDITOR_FRAGMENT_OPTION = graphql(`
  fragment QuestionEditorFragmentOption on Option {
    id
    text
    isCorrect
  }
`);

const QUESTION_EDITOR_FRAGMENT_QUESTION = graphql(`
  fragment QuestionEditorFragmentQuestion on Question {
    id
    text
    allowMultipleAnswers
    media {
      id
      ...QuestionEditorFragmentMedia
    }
    options {
      id
      ...QuestionEditorFragmentOption
    }
  }
`);

const QUESTION_EDITOR_FRAGMENT = graphql(`
  fragment QuestionEditorFragment on Quiz {
    id
    questions {
      id
      ...QuestionEditorFragmentQuestion
    }
  }
`);

const CREATE_MEDIA_MUTATION = graphql(`
  mutation CreateMedia($file: Upload!, $title: String!) {
    createMedia(file: $file, title: $title) {
      id
      ...QuestionEditorFragmentMedia
    }
  }
`);

const EDIT_MEDIA_MUTATION = graphql(`
  mutation EditMedia($id: ID!, $file: Upload, $title: String) {
    editMedia(id: $id, file: $file, title: $title) {
      id
      ...QuestionEditorFragmentMedia
    }
  }
`);

const DELETE_MEDIA_MUTATION = graphql(`
  mutation DeleteMedia($id: ID!) {
    deleteMedia(id: $id)
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
      ...QuestionEditorFragmentQuestion
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
      ...QuestionEditorFragmentOption
    }
  }
`);

const EDIT_OPTION_MUTATION = graphql(`
  mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {
    editOption(id: $id, text: $text, isCorrect: $isCorrect) {
      id
      ...QuestionEditorFragmentOption
    }
  }
`);

const DELETE_OPTION_MUTATION = graphql(`
  mutation DeleteOption($id: ID!) {
    deleteOption(id: $id)
  }
`);

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
      ...CreateQuestionMutationFragment
    }
  }
`);

const CREATE_QUESTION_MUTATION_FRAGMENT = graphql(`
  fragment CreateQuestionMutationFragment on Question {
    id
    ...QuestionEditorFragmentQuestion
    ...AdminQuestionsFragmentQuestion
  }
`);

export const QuestionEditor = (props: {
  quiz: FragmentType<typeof QUESTION_EDITOR_FRAGMENT>;
  questionId: string | null;
  close: () => void;
}) => {
  // region Fragments and Props
  const originalQuiz = useFragment(QUESTION_EDITOR_FRAGMENT, props.quiz);

  const originalQuestion = useFragment(
    QUESTION_EDITOR_FRAGMENT_QUESTION,
    originalQuiz.questions.find((q) => q.id === props.questionId) || null,
  );
  const originalMedia = useFragment(
    QUESTION_EDITOR_FRAGMENT_MEDIA,
    originalQuestion?.media,
  );
  const originalOptions = useFragment(
    QUESTION_EDITOR_FRAGMENT_OPTION,
    originalQuestion?.options,
  );
  const { close } = props;
  // endregion

  // region Mutations
  const [createMedia] = useMutation(CREATE_MEDIA_MUTATION, {
    update(cache, { data }) {
      // Add media to question in cache
      if (data?.createMedia) {
        const questionId = originalQuestion?.id;
        if (!questionId) return;
        const questionRef = cache.identify({
          __typename: "Question",
          id: questionId,
        });
        cache.modify({
          id: questionRef,
          fields: {
            media() {
              return { ...data.createMedia };
            },
          },
        });
      }
    },
  });
  const [editMedia] = useMutation(EDIT_MEDIA_MUTATION);
  const [deleteMedia] = useMutation(DELETE_MEDIA_MUTATION, {
    update(cache, { data }, { variables }) {
      if (data?.deleteMedia && variables?.id) {
        cache.evict({
          id: cache.identify({ __typename: "Media", id: variables.id }),
        });
        cache.gc();
      }
    },
  });
  const [editQuestionMutation] = useMutation(EDIT_QUESTION_MUTATION);
  const [createOptionMutation] = useMutation(CREATE_OPTION_MUTATION, {
    update(cache, { data }, { variables }) {
      const id = data?.createOption?.id;

      // It doesn't cause issues as far as I tested
      // It doesn't even call other hooks so it's not really a hook
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const text = useFragment(
        QUESTION_EDITOR_FRAGMENT_OPTION,
        data?.createOption,
      )?.text;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const isCorrect = useFragment(
        QUESTION_EDITOR_FRAGMENT_OPTION,
        data?.createOption,
      )?.isCorrect;

      const questionId = variables?.questionId;

      // Add option to question in cache
      if (
        data?.createOption &&
        questionId &&
        id &&
        text !== undefined &&
        isCorrect !== undefined
      ) {
        const questionRef = cache.identify({
          __typename: "Question",
          id: questionId,
        });
        cache.modify({
          id: questionRef,
          fields: {
            options(existingOptionRefs = []) {
              const newOptionRef = cache.writeFragment({
                data: { id, text, isCorrect, __typename: "Option" },
                fragment: QUESTION_EDITOR_FRAGMENT_OPTION,
              });
              return [...existingOptionRefs, newOptionRef];
            },
          },
        });
      }
    },
  });
  const [editOptionMutation] = useMutation(EDIT_OPTION_MUTATION);
  const [deleteOptionMutation] = useMutation(DELETE_OPTION_MUTATION, {
    update(cache, { data }, { variables }) {
      if (data?.deleteOption && variables?.id) {
        cache.evict({
          id: cache.identify({ __typename: "Option", id: variables.id }),
        });
        cache.gc();
      }
    },
  });
  const [createQuestion] = useMutation(CREATE_QUESTION_MUTATION, {
    update(cache, { data }, { variables }) {
      if (data?.createQuestion && variables?.quizId) {
        const quizId = variables.quizId;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const newQuestion = useFragment(
          CREATE_QUESTION_MUTATION_FRAGMENT,
          data?.createQuestion,
        );
        const quizRef = cache.identify({ __typename: "Quiz", id: quizId });
        // If we delete a question and then create a new one will get a warning
        // Basically a dangling reference is created because the deleted question is still in the cache
        cache.modify({
          id: quizRef,
          fields: {
            questions(existingQuestionRefs = []) {
              const newQuestionRef = cache.writeFragment({
                data: newQuestion,
                fragment: CREATE_QUESTION_MUTATION_FRAGMENT,
                fragmentName: "CreateQuestionMutationFragment",
              });
              return [...existingQuestionRefs, newQuestionRef];
            },
          },
        });
      }
    },
  });
  // endregion

  // region State
  const [id, setId] = useState(originalQuestion?.id || null);
  const [text, setText] = useState(originalQuestion?.text || "");
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(
    originalQuestion?.allowMultipleAnswers || false,
  );
  const [options, setOptions] = useState(originalOptions || []);
  const [mediaId, setMediaId] = useState(originalMedia?.id || null);
  const [mediaTitle, setMediaTitle] = useState(originalMedia?.title || "");
  const [isSaving, setIsSaving] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  // endregion

  const editQuestion = useCallback(async () => {
    setIsSaving(true);

    // IDs that are in the edited option but not in the original option
    const createdOptions = options.filter(
      (option) => !originalOptions?.find((o) => o.id === option.id),
    );
    // IDs that are in the original option but not in the edited option
    const deletedOptions = originalOptions?.filter(
      (option) => !options.find((o) => o.id === option.id),
    );
    // Options with the same ID but different data
    const editedOptions = options.filter((option) => {
      const originalOption = originalOptions?.find((o) => o.id === option.id);
      return (
        originalOption &&
        (originalOption.text !== option.text ||
          originalOption.isCorrect !== option.isCorrect)
      );
    });

    const isQuestionCreated = !originalQuestion;
    const isQuestionEdited =
      !isQuestionCreated &&
      (originalQuestion?.text !== text ||
        originalQuestion?.allowMultipleAnswers !== allowMultipleAnswers ||
        originalMedia?.id !== mediaId);

    const isMediaCreated = !originalMedia && mediaFile;
    const isMediaEdited =
      (originalMedia && mediaFile && mediaId === originalMedia.id) ||
      (originalMedia && mediaTitle !== originalMedia.title);
    const isMediaDeleted = originalMedia && !mediaId && !mediaFile;

    let finalMediaId = mediaId;
    if (isMediaDeleted) {
      await deleteMedia({ variables: { id: originalMedia.id } });
      finalMediaId = null;
    } else if (isMediaEdited) {
      const { data } = await editMedia({
        variables: {
          id: originalMedia!.id,
          file: mediaFile || undefined,
          title: mediaTitle !== originalMedia!.title ? mediaTitle : undefined,
        },
      });
      finalMediaId = data?.editMedia?.id || null;
    } else if (isMediaCreated) {
      const { data } = await createMedia({
        variables: {
          file: mediaFile!,
          title: mediaTitle,
        },
      });
      finalMediaId = data?.createMedia?.id || null;
    }

    let finalQuestionId = id;
    if (isQuestionCreated) {
      const { data } = await createQuestion({
        variables: {
          quizId: originalQuiz.id,
          text,
          allowMultipleAnswers,
          mediaId: finalMediaId,
        },
      });
      finalQuestionId = data?.createQuestion?.id || null;
      setId(finalQuestionId);
    } else if (isQuestionEdited) {
      await editQuestionMutation({
        variables: {
          id: id!,
          text,
          allowMultipleAnswers,
          mediaId: finalMediaId,
        },
      });
    }

    if (!finalQuestionId) {
      setIsSaving(false);
      console.error("Failed to create question");
      return;
    }

    for (const option of createdOptions) {
      await createOptionMutation({
        variables: {
          questionId: finalQuestionId,
          text: option.text,
          isCorrect: option.isCorrect,
        },
      });
    }

    for (const option of editedOptions) {
      await editOptionMutation({
        variables: {
          id: option.id,
          text: option.text,
          isCorrect: option.isCorrect,
        },
      });
    }

    for (const option of deletedOptions || []) {
      await deleteOptionMutation({
        variables: {
          id: option.id,
        },
      });
    }

    setIsSaving(false);
  }, [
    allowMultipleAnswers,
    createMedia,
    createOptionMutation,
    createQuestion,
    deleteMedia,
    deleteOptionMutation,
    editMedia,
    editOptionMutation,
    editQuestionMutation,
    id,
    mediaFile,
    mediaId,
    mediaTitle,
    options,
    originalMedia,
    originalOptions,
    originalQuestion,
    originalQuiz.id,
    text,
  ]);

  // region Reset state when question changes
  if ((originalQuestion?.id || null) !== id) {
    setId(originalQuestion?.id || null);
    setText(originalQuestion?.text || "");
    setAllowMultipleAnswers(originalQuestion?.allowMultipleAnswers || false);
    setOptions(originalOptions || []);
    setMediaId(originalMedia?.id || null);
    setMediaTitle(originalMedia?.title || "");
    setMediaFile(null);
  }
  // endregion

  return (
    <Form
      className="p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await editQuestion();
        close();
      }}
    >
      <QuestionEditorText text={text} setText={setText} />
      <QuestionEditorMedia
        originalMedia={originalMedia || null}
        mediaFile={mediaFile}
        setMediaFile={setMediaFile}
        mediaId={mediaId}
        setMediaId={setMediaId}
        mediaTitle={mediaTitle}
        setMediaTitle={setMediaTitle}
      />
      <QuestionEditorOptions
        options={options}
        setOptions={setOptions}
        allowMultipleAnswers={allowMultipleAnswers}
        setAllowMultipleAnswers={setAllowMultipleAnswers}
      />
      <QuestionEditorButtons isSaving={isSaving} close={close} />
    </Form>
  );
};
