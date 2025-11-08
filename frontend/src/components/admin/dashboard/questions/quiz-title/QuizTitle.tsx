import { FragmentType, graphql, useFragment } from "@/gql";

const QUIZ_TITLE_FRAGMENT = graphql(`
  fragment QuizTitleFragment on Quiz {
    id
    title
    description
  }
`);

export const QuizTitle = (props: {
  quiz: FragmentType<typeof QUIZ_TITLE_FRAGMENT>;
}) => {
  const quiz = useFragment(QUIZ_TITLE_FRAGMENT, props.quiz);

  return (
    <>
      <h1 className="text-4xl mt-4">{quiz.title}</h1>
      <h2 className="text-2xl">{quiz.description}</h2>
    </>
  );
};
