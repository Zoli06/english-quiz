import { Table } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";
import { ToplistTableRow } from "@/components/home/toplist/ToplistTableRow.tsx";

const TOPLIST_TABLE_FRAGMENT = graphql(`
  fragment ToplistTableFragment on Result {
    id
    ...ToplistTableRowFragment
  }
`);

export const ToplistTable = (props: {
  results: FragmentType<typeof TOPLIST_TABLE_FRAGMENT>[];
  hideQuizName?: boolean;
}) => {
  const results = useFragment(TOPLIST_TABLE_FRAGMENT, props.results);

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
            <ToplistTableRow
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
