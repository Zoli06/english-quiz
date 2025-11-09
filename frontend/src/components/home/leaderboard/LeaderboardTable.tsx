import { Table } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";
import { LeaderboardTableRow } from "@/components/home/leaderboard/LeaderboardTableRow.tsx";

const LEADERBOARD_TABLE_FRAGMENT = graphql(`
  fragment LeaderboardTableFragment on Result {
    id
    ...LeaderboardTableRowFragment
  }
`);

export const LeaderboardTable = (props: {
  results: FragmentType<typeof LEADERBOARD_TABLE_FRAGMENT>[];
  hideQuizName?: boolean;
}) => {
  const results = useFragment(LEADERBOARD_TABLE_FRAGMENT, props.results);

  return (
    <Table>
      <Table.Head>
        <span>Place</span>
        {!props.hideQuizName && <span>Quiz</span>}
        <span>Name</span>
        <span>Score</span>
        <span>Time</span>
      </Table.Head>
      <Table.Body>
        {results.map((result, index) => {
          return (
            <LeaderboardTableRow
              results={result}
              index={index}
              key={result.id}
              hideQuizName={props.hideQuizName}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};
