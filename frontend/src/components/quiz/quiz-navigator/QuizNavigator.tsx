import { FragmentType, graphql, useFragment } from "@/gql";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";

const QUIZ_NAVIGATOR_FRAGMENT = graphql(`
  fragment QuizNavigatorFragment on Quiz {
    id
    questions(shuffleSeed: $shuffleSeed) {
      id
    }
  }
`);

export const QuizNavigator = (props: {
  quiz: FragmentType<typeof QUIZ_NAVIGATOR_FRAGMENT>;
  activeQuestionId: string;
  setActiveQuestionId: (activeQuestionId: string) => void;
  submit: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const quiz = useFragment(QUIZ_NAVIGATOR_FRAGMENT, props.quiz);
  const questions = quiz.questions;
  const { activeQuestionId, setActiveQuestionId, submit } = props;

  const activeQuestionIndex = questions.findIndex(
    (element) => element.id === activeQuestionId,
  );
  const shouldSubmit = activeQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-row justify-between w-full">
      <Button
        color="error"
        onClick={() => {
          if (window.confirm("Are you sure you want to cancel?")) {
            window.onbeforeunload = null;
            navigate("/");
          }
        }}
      >
        Cancel
      </Button>
      <div className="flex flex-row gap-4">
        <Button
          color="primary"
          disabled={activeQuestionIndex === 0}
          onClick={() =>
            setActiveQuestionId(questions[activeQuestionIndex - 1].id)
          }
        >
          Previous
        </Button>
        <span className="flex items-center gap-2 text-xl">
          {activeQuestionIndex + 1}/{questions.length}
        </span>
        <Button
          color="primary"
          disabled={activeQuestionIndex === questions.length - 1}
          onClick={() =>
            setActiveQuestionId(questions[activeQuestionIndex + 1].id)
          }
        >
          Next
        </Button>
      </div>
      <Button
        color={shouldSubmit ? "success" : "neutral"}
        onClick={async () => {
          if (
            !shouldSubmit &&
            !window.confirm("Are you sure you want to submit?")
          )
            return;
          await submit();
        }}
      >
        Submit
      </Button>
    </div>
  );
};
