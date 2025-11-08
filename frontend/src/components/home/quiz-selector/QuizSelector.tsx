import { Select } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";

const QUIZ_SELECTOR_FRAGMENT = graphql(`
  fragment QuizSelectorFragment on Quiz {
    id
    title
  }
`);

export const QuizSelector = (props: {
  quizzes: FragmentType<typeof QUIZ_SELECTOR_FRAGMENT>[];
  selectedQuiz: string | null;
  setSelectedQuiz: (quizId: string) => void;
}) => {
  const quizzes = useFragment(QUIZ_SELECTOR_FRAGMENT, props.quizzes);
  const { selectedQuiz, setSelectedQuiz } = props;

  return (
    <Select
      onChange={(e) => setSelectedQuiz(e.target.value)}
      value={selectedQuiz || quizzes[0].id}
      className="grow"
    >
      {quizzes.map((quiz) => {
        return (
          <Select.Option key={quiz.id} value={quiz.id}>
            {quiz.title}
          </Select.Option>
        );
      })}
    </Select>
  );
};
