import { Button, Table } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "@/gql";
import { useMutation } from "@apollo/client/react";

const QUIZZES_TABLE_ROW_FRAGMENT = graphql(`
  fragment QuizzesTableRowFragment on Quiz {
    id
    title
    description
    results {
      id
    }
  }
`);

const DELETE_QUIZ_MUTATION = graphql(`
  mutation DeleteQuiz($id: ID!) {
    deleteQuiz(id: $id)
  }
`);

const CLEAR_RESULTS_MUTATION = graphql(`
  mutation ClearResults($quizId: ID!) {
    clearResults(quizId: $quizId)
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
  const [clearResults] = useMutation(CLEAR_RESULTS_MUTATION, {
    update(cache, { data }, { variables }) {
      // Get all result ID for the quiz using the quiz variable
      if (data?.clearResults && variables?.quizId) {
        const normalizedQuizId = cache.identify({
          __typename: "Quiz",
          id: variables.quizId,
        });
        const quizFragment = cache.readFragment<{
          results: { id: string }[];
        }>({
          id: normalizedQuizId,
          fragment: graphql(`
            fragment ClearResultsQuizFragment on Quiz {
              results {
                id
              }
            }
          `),
        });
        if (quizFragment) {
          for (const result of quizFragment.results) {
            cache.evict({
              id: cache.identify({ __typename: "Result", id: result.id }),
            });
          }
          cache.gc();
        }
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
          color="warning"
          onClick={async () => {
            if (
              !window.confirm(
                `Are you sure you want to clear all results for the quiz: "${quiz.title}"?`,
              )
            ) {
              return;
            }
            await clearResults({ variables: { quizId: quiz.id } });
          }}
        >
          Clear Results ({quiz.results.length})
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
