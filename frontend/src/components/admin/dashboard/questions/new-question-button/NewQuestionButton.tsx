import { Button } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";
import { useMutation } from "@apollo/client/react";

const NEW_QUESTION_BUTTON_FRAGMENT = graphql(`
  fragment NewQuestionButtonFragment on Quiz {
    id
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
      ...NewQuestionButtonFragmentQuestion
    }
  }
`);

const NEW_QUESTION_BUTTON_FRAGMENT_QUESTION = graphql(`
  fragment NewQuestionButtonFragmentQuestion on Question {
    id
    ...AdminQuestionsFragmentQuestion
  }
`);

export const NewQuestionButton = (props: {
  quiz: FragmentType<typeof NEW_QUESTION_BUTTON_FRAGMENT>;
  onQuestionCreated?: (questionId: string) => void;
}) => {
  const quiz = useFragment(NEW_QUESTION_BUTTON_FRAGMENT, props.quiz);
  const [createQuestion] = useMutation(CREATE_QUESTION_MUTATION, {
    update(cache, { data }, { variables }) {
      if (data?.createQuestion && variables?.quizId) {
        const quizId = variables.quizId;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const newQuestion = useFragment(
          NEW_QUESTION_BUTTON_FRAGMENT_QUESTION,
          data.createQuestion,
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
                fragment: NEW_QUESTION_BUTTON_FRAGMENT_QUESTION,
                fragmentName: "NewQuestionButtonFragmentQuestion",
              });
              return [...existingQuestionRefs, newQuestionRef];
            },
          },
        });
      }
    },
  });

  return (
    <Button
      color="success"
      onClick={async () => {
        const question = await createQuestion({
          variables: {
            quizId: quiz.id,
            text: "New Question",
            allowMultipleAnswers: false,
            mediaId: null,
          },
        });
        if (question.data?.createQuestion?.id && props.onQuestionCreated) {
          props.onQuestionCreated(question.data.createQuestion.id);
        }
      }}
    >
      Create Question
    </Button>
  );
};
