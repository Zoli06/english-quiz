import config from "../config";
import { gql, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { Button, Input, Table, Form, FileInput, Checkbox } from "react-daisyui";
import { ADMIN_QUIZ_QUERY } from "../pages/AdminQuizView";

const CREATE_MEDIA_MUTATION = gql`
  mutation CreateMedia($file: Upload!, $title: String!) {
    createMedia(file: $file, title: $title) {
      id
      url
      title
      type
    }
  }
`;

type CreateMediaMutationVariablesType = {
  file: File;
  title: string;
};

type CreateMediaMutationResponseType = {
  createMedia: {
    id: number;
    url: string;
    title: string;
    type: "image" | "video";
  };
};

const EDIT_MEDIA_MUTATION = gql`
  mutation EditMedia($id: ID!, $file: Upload!, $title: String!) {
    editMedia(id: $id, file: $file, title: $title) {
      id
      url
      title
      type
    }
  }
`;

type EditMediaMutationVariablesType = {
  id: number;
  file: File;
  title: string;
};

type EditMediaMutationResponseType = {
  editMedia: {
    id: number;
    url: string;
    title: string;
    type: "image" | "video";
  };
};

const DELETE_MEDIA_MUTATION = gql`
  mutation DeleteMedia($id: ID!) {
    deleteMedia(id: $id)
  }
`;

type DeleteMediaMutationVariablesType = {
  id: number;
};

type DeleteMediaMutationResponseType = {
  deleteMedia: boolean;
};

export const QuestionEditor = ({
  question,
  saveQuestion,
  close,
}: {
  question: {
    id: number;
    text: string;
    media?: {
      id: number;
      url: string;
      title: string;
      type: "image" | "video";
    };
    options: { id: number | null; text: string; isCorrect: boolean }[];
    allowMultipleAnswers: boolean;
    quizId: number;
  };
  saveQuestion: (question: {
    id: number | null;
    text: string;
    options: { id: number | null; text: string; isCorrect: boolean }[];
    allowMultipleAnswers: boolean;
    mediaId?: number;
  }) => void;
  deleteQuestion: (questionId: number) => void;
  close: () => void;
}) => {
  const [createMedia] = useMutation<
    CreateMediaMutationResponseType,
    CreateMediaMutationVariablesType
  >(CREATE_MEDIA_MUTATION, {
    refetchQueries: [
      { query: ADMIN_QUIZ_QUERY, variables: { id: question.quizId } },
    ],
  });
  const [editMedia] = useMutation<
    EditMediaMutationResponseType,
    EditMediaMutationVariablesType
  >(EDIT_MEDIA_MUTATION, {
    refetchQueries: [
      { query: ADMIN_QUIZ_QUERY, variables: { id: question.quizId } },
    ],
  });
  const [deleteMedia] = useMutation<
    DeleteMediaMutationResponseType,
    DeleteMediaMutationVariablesType
  >(DELETE_MEDIA_MUTATION, {
    refetchQueries: [
      { query: ADMIN_QUIZ_QUERY, variables: { id: question.quizId } },
    ],
  });

  const [id, setId] = useState(question.id);
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState(question.options);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(
    question.allowMultipleAnswers,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [removeMedia, setRemoveMedia] = useState(false);
  const [mediaTitle, setMediaTitle] = useState(question.media?.title || "");

  // Reset state when question changes
  if (id !== question.id) {
    setId(question.id);
    setText(question.text);
    setOptions(question.options);
    setAllowMultipleAnswers(question.allowMultipleAnswers);
    setMedia(null);
    setRemoveMedia(false);
  }

  return (
    <Form
      className="p-4"
      onSubmit={() => {
        if (media) {
          if (question.media) {
            editMedia({
              variables: {
                id: question.media.id,
                file: media,
                title: mediaTitle,
              },
              onCompleted: (data) => {
                saveQuestion({
                  id,
                  text,
                  options,
                  allowMultipleAnswers,
                  mediaId: data.editMedia.id,
                });
              },
            }).then();
          } else {
            createMedia({
              variables: { file: media, title: mediaTitle },
              onCompleted: (data) => {
                saveQuestion({
                  id,
                  text,
                  options,
                  allowMultipleAnswers,
                  mediaId: data.createMedia.id,
                });
              },
            }).then();
          }
        } else if (removeMedia && question.media) {
          deleteMedia({ variables: { id: question.media.id } }).then();
        } else {
          saveQuestion({ id, text, options, allowMultipleAnswers });
        }
        close();
      }}
    >
      <h3 className="text-lg">Question</h3>
      <Input
        type="text"
        placeholder="Question"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full"
      />
      <h3 className="text-lg mt-4">Image or video (optional)</h3>
      <p className="text-sm">
        Allowed file extensions: png, jpg, jpeg, gif, mp4, avi, mov, wmv, flv,
        mkv
      </p>
      <div className="flex items-center">
        <FileInput
          placeholder="Image or video"
          className="w-full"
          bordered
          // Take a look at backend/.env
          accept=".png, .jpg, .jpeg, .gif, .mp4, .avi, .mov, .wmv, .flv, .mkv"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setMedia(e.target.files[0]);
              setRemoveMedia(false);
            }
          }}
          ref={fileInputRef}
        />
        <Button
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            setMedia(null);
            setRemoveMedia(true);
          }}
          className="ml-4"
          color="error"
          type="button"
        >
          Delete
        </Button>
      </div>
      {/* Media preview */}
      {!removeMedia &&
        (media ? (
          <div className="mt-4">
            {media.type.startsWith("image") ? (
              <img
                src={URL.createObjectURL(media)}
                alt="Preview for question media"
                className="w-full"
              />
            ) : (
              <video
                src={URL.createObjectURL(media)}
                className="w-full"
                controls
              />
            )}
          </div>
        ) : (
          question.media && (
            <div className="mt-4">
              {question.media.type.startsWith("image") ? (
                <img
                  src={config.apiUrl + question.media.url}
                  alt="Question media"
                  className="w-full"
                />
              ) : (
                <video
                  src={config.apiUrl + question.media.url}
                  className="w-full"
                  controls
                />
              )}
            </div>
          )
        ))}
      {/* Media title */}
      {!removeMedia && (question.media || media) && (
        <>
          <h3 className="text-lg mt-4">Media title (optional)</h3>
          <Input
            type="text"
            placeholder="Media title"
            value={mediaTitle}
            onChange={(e) => setMediaTitle(e.target.value)}
            className="w-full mt-4"
          />
        </>
      )}
      {/* Options */}
      <h3 className="text-lg mt-4">Options</h3>
      <Form.Label title="Allow multiple answers">
        <Checkbox
          checked={allowMultipleAnswers}
          onChange={(e) => {
            if (!e.target.checked) {
              const newOptions = [...options];
              newOptions.forEach((option) => {
                option.isCorrect = false;
              });
              if (newOptions.length > 0) {
                newOptions[0].isCorrect = true;
              }
              setOptions(newOptions);
            }
            setAllowMultipleAnswers(e.target.checked);
          }}
        />
      </Form.Label>
      <Table>
        <Table.Head>
          <span>Is correct?</span>
          <span>Text</span>
          <span>Delete</span>
        </Table.Head>
        <Table.Body>
          {options.map((option, index) => {
            return (
              <Table.Row key={option.id || index}>
                <Checkbox
                  checked={option.isCorrect}
                  onChange={() => {
                    const newOptions = [...options];
                    if (allowMultipleAnswers) {
                      newOptions[index].isCorrect =
                        !newOptions[index].isCorrect;
                    } else {
                      newOptions.forEach((option) => {
                        option.isCorrect = false;
                      });
                      newOptions[index].isCorrect = true;
                    }
                    setOptions(newOptions);
                  }}
                />
                <Input
                  type="text"
                  placeholder="Option"
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index].text = e.target.value;
                    setOptions(newOptions);
                  }}
                  required
                />
                <Button
                  onClick={() => {
                    const newOptions = [...options];
                    newOptions.splice(index, 1);
                    setOptions(newOptions);
                  }}
                  type="button"
                >
                  Delete
                </Button>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Button
        onClick={() => {
          setOptions([...options, { id: null, text: "", isCorrect: false }]);
        }}
        className="mt-4"
        type="button"
      >
        Add Option
      </Button>
      <div className="mt-4 flex flex-row gap-4">
        <Button type="submit" color="primary" className="grow">
          Save
        </Button>
        {/* <Button
          onClick={() => {
            deleteQuestion(question.id);
            close();
          }}
          className='ml-4'
          color='error'
          type='button'
        >
          Delete
        </Button> */}
        <Button onClick={close} className="grow" type="button">
          Cancel
        </Button>
      </div>
    </Form>
  );
};
