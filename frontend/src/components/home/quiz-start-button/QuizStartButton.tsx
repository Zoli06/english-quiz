import { FragmentType, graphql, useFragment } from "@/gql";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

const QUIZ_START_BUTTON_FRAGMENT = graphql(`
  fragment QuizStartButtonFragment on Quiz {
    id
  }
`);

export const QuizStartButton = (props: {
  quiz: FragmentType<typeof QUIZ_START_BUTTON_FRAGMENT> | null;
}) => {
  const navigate = useNavigate();
  const quiz = useFragment(QUIZ_START_BUTTON_FRAGMENT, props.quiz);

  return (
    <Button
      onClick={() => navigate(`/quiz/${quiz?.id}`)}
      className="grow"
      color="success"
      disabled={!quiz}
    >
      Start quiz
    </Button>
  );
};
