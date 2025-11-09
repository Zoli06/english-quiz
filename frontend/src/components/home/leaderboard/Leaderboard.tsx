import { FragmentType, graphql, useFragment } from "@/gql";
import { LeaderboardTable } from "@/components/home/leaderboard/LeaderboardTable.tsx";

const LEADERBOARD_FRAGMENT = graphql(`
  fragment LeaderboardFragment on Quiz {
    id
    title
    results(limit: 20) {
      id
      ...LeaderboardTableFragment
    }
  }
`);

export const Leaderboard = (props: {
  quiz: FragmentType<typeof LEADERBOARD_FRAGMENT>;
  hideQuizName?: boolean;
}) => {
  const quiz = useFragment(LEADERBOARD_FRAGMENT, props.quiz);

  return (
    <>
      <h2 className="text-3xl mt-4">
        Leaderboard for {quiz.title || "Unknown Quiz"}
      </h2>
      {quiz.results.length === 0 ? (
        <p className="mt-4">No results yet. Be the first to take the quiz!</p>
      ) : (
        <LeaderboardTable
          results={quiz.results}
          hideQuizName={props.hideQuizName}
        />
      )}
    </>
  );
};
