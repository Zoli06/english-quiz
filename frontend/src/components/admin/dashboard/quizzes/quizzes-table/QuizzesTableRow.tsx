import { Button, Table } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "@/gql";
import { useMutation } from "@apollo/client/react";

const QUIZZES_TABLE_ROW_FRAGMENT = graphql(`
  fragment QuizzesTableRowFragment on Quiz {
    id
    title
    description
  }
`);

const DELETE_QUIZ_MUTATION = graphql(`
  mutation DeleteQuiz($id: ID!) {
    deleteQuiz(id: $id)
  }
`);

export const QuizzesTableRow = (props: {
  quiz: FragmentType<typeof QUIZZES_TABLE_ROW_FRAGMENT>;
  setEditedQuizId: (id: string | null) => void;
}) => {
  const quiz = useFragment(QUIZZES_TABLE_ROW_FRAGMENT, props.quiz);
  const navigate = useNavigate();
  const [deleteQuiz] = useMutation(DELETE_QUIZ_MUTATION, {
    update(cache, { data }, { variables }) {
      if (data?.deleteQuiz && variables?.id) {
        cache.evict({
          id: cache.identify({ __typename: "Quiz", id: variables.id }),
        });
        cache.gc();
      }
    },
  });

  const deleteQuizWithConfirmation = (id: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete this quiz: "${quiz.title}"?`,
      )
    ) {
      deleteQuiz({ variables: { id } }).then();
    }
  };

  return (
    <Table.Row key={quiz.id}>
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <span className="flex gap-4 justify-end">
        <Button
          onClick={() => {
            navigate(`/admin/dashboard/quiz/${quiz.id}`);
          }}
        >
          Questions
        </Button>
        <Button
          onClick={() => {
            props.setEditedQuizId(quiz.id);
          }}
        >
          Rename
        </Button>
        <Button
          onClick={() => {
            deleteQuizWithConfirmation(quiz.id);
          }}
          color="error"
        >
          Delete Quiz
        </Button>
      </span>
    </Table.Row>
  );
};
