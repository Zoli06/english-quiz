import { FragmentType, graphql, useFragment } from "@/gql";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";
import { SubmitButton } from "@/components/quiz/question-selector/SubmitButton.tsx";

const QUESTIONS_NAVIGATOR_FRAGMENT = graphql(`
  fragment QuestionsNavigatorFragment on Quiz {
    id
    ...SubmitButtonFragment
    questions {
      id
    }
  }
`);

export const QuestionsNavigator = (props: {
  quiz: FragmentType<typeof QUESTIONS_NAVIGATOR_FRAGMENT>;
  savedAnswers: { [key: string]: string[] };
  activeQuestionId: string;
  setActiveQuestionId: (activeQuestionId: string) => void;
}) => {
  const navigate = useNavigate();
  const quiz = useFragment(QUESTIONS_NAVIGATOR_FRAGMENT, props.quiz);
  const questions = quiz.questions;
  const { activeQuestionId, setActiveQuestionId, savedAnswers } = props;

  const activeQuestionIndex = questions.findIndex(
    (element) => element.id === activeQuestionId,
  );
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
      <SubmitButton
        quiz={quiz}
        shouldSubmit={activeQuestionIndex === questions.length - 1}
        savedAnswers={savedAnswers}
      />
    </div>
  );
};
