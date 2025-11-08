import { Button } from "react-daisyui";
import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";

const CREATE_QUIZ_MUTATION = graphql(`
  mutation CreateQuiz($title: String!, $description: String!) {
    createQuiz(title: $title, description: $description) {
      id
      ...AdminQuizzesFragmentQuiz
    }
  }
`);

const NEW_QUIZ_BUTTON_FRAGMENT_QUIZ = graphql(`
  fragment NewQuizButtonFragmentQuiz on Quiz {
    id
    ...AdminQuizzesFragmentQuiz
  }
`);

export const NewQuizButton = () => {
  const [createQuiz] = useMutation(CREATE_QUIZ_MUTATION, {
    update(cache, { data }) {
      if (!data) return;
      cache.modify({
        fields: {
          quizzes(existingQuizzes = []) {
            const newQuizRef = cache.writeFragment({
              data: data.createQuiz,
              fragment: NEW_QUIZ_BUTTON_FRAGMENT_QUIZ,
              fragmentName: "NewQuizButtonFragmentQuiz",
            });
            return [...existingQuizzes, newQuizRef];
          },
        },
      });
    },
  });

  return (
    <Button
      color="success"
      onClick={async () => {
        await createQuiz({
          variables: {
            title: "New Quiz",
            description: "New Quiz Description",
          },
        });
      }}
    >
      Create Quiz
    </Button>
  );
};
