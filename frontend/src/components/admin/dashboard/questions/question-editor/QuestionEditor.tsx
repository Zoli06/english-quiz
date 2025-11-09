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

const QUESTION_EDITOR_FRAGMENT = graphql(`
  fragment QuestionEditorFragment on Question {
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
      ...QuestionEditorFragment
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

export const QuestionEditor = (props: {
  question: FragmentType<typeof QUESTION_EDITOR_FRAGMENT>;
  close: () => void;
}) => {
  // region Fragments and Props
  const originalQuestion = useFragment(
    QUESTION_EDITOR_FRAGMENT,
    props.question,
  );
  const originalMedia = useFragment(
    QUESTION_EDITOR_FRAGMENT_MEDIA,
    originalQuestion.media,
  );
  const originalOptions = useFragment(
    QUESTION_EDITOR_FRAGMENT_OPTION,
    originalQuestion.options,
  );
  const { close } = props;
  // endregion

  // region Mutations
  const [createMedia] = useMutation(CREATE_MEDIA_MUTATION, {
    update(cache, { data }) {
      // Add media to question in cache
      if (data?.createMedia) {
        const questionId = originalQuestion.id;
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
    update(cache, { data }) {
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

      // Add option to question in cache
      if (
        data?.createOption &&
        id &&
        text !== undefined &&
        isCorrect !== undefined
      ) {
        const questionId = originalQuestion.id;
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
  // endregion

  // region State
  const [id, setId] = useState(originalQuestion.id);
  const [text, setText] = useState(originalQuestion.text);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(
    originalQuestion.allowMultipleAnswers,
  );
  const [options, setOptions] = useState(originalOptions);
  const [mediaId, setMediaId] = useState(originalMedia?.id || null);
  const [mediaTitle, setMediaTitle] = useState(originalMedia?.title || "");
  const [isSaving, setIsSaving] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  // endregion

  const editQuestion = useCallback(async () => {
    setIsSaving(true);

    // IDs that are in the edited option but not in the original option
    const createdOptions = options.filter(
      (option) => !originalOptions.find((o) => o.id === option.id),
    );
    // IDs that are in the original option but not in the edited option
    const deletedOptions = originalOptions.filter(
      (option) => !options.find((o) => o.id === option.id),
    );
    // Options with the same ID but different data
    const editedOptions = options.filter((option) => {
      const originalOption = originalOptions.find((o) => o.id === option.id);
      return (
        originalOption &&
        (originalOption.text !== option.text ||
          originalOption.isCorrect !== option.isCorrect)
      );
    });

    const isQuestionEdited =
      originalQuestion.text !== text ||
      originalQuestion.allowMultipleAnswers !== allowMultipleAnswers;

    const asyncOperations: Promise<unknown>[] = [];

    createdOptions.forEach((option) => {
      asyncOperations.push(
        createOptionMutation({
          variables: {
            questionId: id,
            text: option.text,
            isCorrect: option.isCorrect,
          },
        }),
      );
    });

    deletedOptions.forEach((option) => {
      asyncOperations.push(
        deleteOptionMutation({
          variables: {
            id: option.id,
          },
        }),
      );
    });

    editedOptions.forEach((option) => {
      asyncOperations.push(
        editOptionMutation({
          variables: {
            id: option.id,
            text: option.text,
            isCorrect: option.isCorrect,
          },
        }),
      );
    });

    const isMediaDeleted = originalMedia && !mediaId && !mediaFile;
    const isMediaEdited =
      (originalMedia && mediaFile && mediaId === originalMedia.id) ||
      (originalMedia && mediaTitle !== originalMedia.title);
    const isMediaAdded = !originalMedia && mediaFile;

    if (isQuestionEdited || isMediaAdded) {
      asyncOperations.push(
        (async () => {
          let mediaIdToUse = mediaId;
          if (isMediaAdded) {
            const { data } = await createMedia({
              variables: { file: mediaFile!, title: mediaTitle },
            });
            mediaIdToUse = data?.createMedia?.id || null;
            setMediaId(mediaIdToUse);
          }

          await editQuestionMutation({
            variables: {
              id,
              text,
              allowMultipleAnswers,
              mediaId: mediaIdToUse,
            },
          });
        })(),
      );
    } else if (isMediaDeleted) {
      asyncOperations.push(
        deleteMedia({ variables: { id: originalMedia!.id } }),
      );
    } else if (isMediaEdited) {
      asyncOperations.push(
        editMedia({
          variables: {
            id: originalMedia!.id,
            file: mediaFile,
            title: mediaTitle,
          },
        }),
      );
    }

    await Promise.all(asyncOperations);

    setIsSaving(false);
  }, [
    options,
    originalOptions,
    originalQuestion.text,
    originalQuestion.allowMultipleAnswers,
    originalMedia,
    text,
    allowMultipleAnswers,
    mediaId,
    mediaFile,
    mediaTitle,
    createOptionMutation,
    id,
    deleteOptionMutation,
    editOptionMutation,
    deleteMedia,
    editMedia,
    createMedia,
    editQuestionMutation,
  ]);

  // Reset state when question changes
  if (originalQuestion.id !== id) {
    setId(originalQuestion.id);
    setText(originalQuestion.text);
    setAllowMultipleAnswers(originalQuestion.allowMultipleAnswers);
    setOptions(originalOptions);
    setMediaId(originalMedia?.id || null);
    setMediaTitle(originalMedia?.title || "");
    setMediaFile(null);
  }

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
