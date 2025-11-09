import { getUploadUrl } from "@/config.ts";
import { Button, Table } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";
import { useMutation } from "@apollo/client/react";
import { Media } from "@/components/reusable/media/Media.tsx";

const QUESTIONS_TABLE_ROW_FRAGMENT = graphql(`
  fragment QuestionsTableRowFragment on Question {
    id
    text
    media {
      id
      path
      title
      type
    }
    options {
      id
      text
      isCorrect
    }
  }
`);

const DELETE_QUESTION_MUTATION = graphql(`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id)
  }
`);

export const QuestionsTableRow = (props: {
  question: FragmentType<typeof QUESTIONS_TABLE_ROW_FRAGMENT>;
  setEditedQuestionId: (id: string) => void;
}) => {
  const question = useFragment(QUESTIONS_TABLE_ROW_FRAGMENT, props.question);
  const setEditedQuestionId = props.setEditedQuestionId;
  const [deleteQuestion] = useMutation(DELETE_QUESTION_MUTATION, {
    update(cache, { data }, { variables }) {
      if (data?.deleteQuestion && variables?.id) {
        cache.evict({
          id: cache.identify({ __typename: "Question", id: variables.id }),
        });
        cache.gc();
      }
    },
  });

  return (
    <Table.Row>
      <h3>{question.text}</h3>
      {question.media ? (
        <Media
          src={getUploadUrl(question.media.path)}
          alt={question.media.title || "Media"}
          type={question.media.type}
        />
      ) : (
        <p>No media</p>
      )}
      <ul>
        {question.options.map((option) => {
          return (
            <li key={option.id}>
              <p
                className={
                  option.isCorrect ? "text-success font-bold" : "text-error"
                }
              >
                {option.text}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-4 justify-end">
        <Button
          onClick={() => {
            setEditedQuestionId(question.id);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            deleteQuestion({
              variables: {
                id: question.id,
              },
            }).then();
          }}
          color="error"
        >
          Delete
        </Button>
      </div>
    </Table.Row>
  );
};
