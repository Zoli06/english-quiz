import { Button } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

const SUBMIT_BUTTON_FRAGMENT = graphql(`
  fragment SubmitButtonFragment on Quiz {
    id
  }
`);

const CREATE_RESULT_MUTATION = graphql(`
  mutation CreateResult(
    $quizId: ID!
    $nickname: String!
    $answers: [Answer!]!
    $time: Int!
  ) {
    createResult(
      quizId: $quizId
      nickname: $nickname
      answers: $answers
      time: $time
    ) {
      id
    }
  }
`);

export const SubmitButton = (props: {
  quiz: FragmentType<typeof SUBMIT_BUTTON_FRAGMENT>;
  shouldSubmit: boolean;
  savedAnswers: { [key: string]: string[] };
}) => {
  const navigate = useNavigate();
  const [startTimestamp] = useState(() => Date.now());
  const quiz = useFragment(SUBMIT_BUTTON_FRAGMENT, props.quiz);
  const { shouldSubmit, savedAnswers } = props;
  const [submitQuizMutation] = useMutation(CREATE_RESULT_MUTATION);

  const submitQuiz = async () => {
    const endTimestamp = Date.now();
    const timeTaken = endTimestamp - startTimestamp;

    const answers = Object.entries(savedAnswers).map(
      ([questionId, answerIds]) => {
        return {
          questionId: questionId,
          optionIds: answerIds,
        };
      },
    );

    const nickname = (() => {
      while (true) {
        const nickname = prompt("Enter your nickname");
        if (nickname) return nickname;
      }
    })();

    const { data } = await submitQuizMutation({
      variables: {
        quizId: quiz.id,
        nickname,
        answers,
        time: timeTaken,
      },
    });

    navigate(`/result/${data!.createResult?.id}`, {
      replace: true,
      state: { answers },
    });
  };

  return (
    <Button
      color={shouldSubmit ? "success" : "neutral"}
      onClick={async () => {
        if (window.confirm("Are you sure you want to submit?")) {
          window.onbeforeunload = null;
          await submitQuiz();
        }
      }}
    >
      Submit
    </Button>
  );
};
