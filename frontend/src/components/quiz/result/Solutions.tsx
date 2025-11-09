import { FragmentType, graphql, useFragment } from "@/gql";
import { SolutionElement } from "@/components/quiz/result/SolutionElement.tsx";

const SOLUTIONS_FRAGMENT = graphql(`
  fragment SolutionsFragment on Quiz {
    id
    title
    questions {
      id
      ...SolutionElement
    }
  }
`);

export const Solutions = (props: {
  quiz: FragmentType<typeof SOLUTIONS_FRAGMENT>;
  savedAnswers: { [key: string]: string[] };
}) => {
  const quiz = useFragment(SOLUTIONS_FRAGMENT, props.quiz);

  return (
    <div>
      <h2 className="text-2xl mb-2">Your Answers:</h2>
      <div className="flex flex-col gap-4">
        {/* Selected answers are bolded, correct answers are green, incorrect answers are red */}
        {quiz.questions.map((question) => (
          <SolutionElement
            key={question.id}
            question={question}
            selectedOptionIds={props.savedAnswers[question.id] || []}
          />
        ))}
      </div>
    </div>
  );
};
