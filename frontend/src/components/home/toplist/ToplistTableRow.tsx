import { Table } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";

const TOPLIST_ROW_FRAGMENT = graphql(`
  fragment ToplistTableRowFragment on Result {
    id
    nickname
    score
    total
    time
    quiz {
      id
      title
    }
  }
`);

export const ToplistTableRow = (props: {
  results: FragmentType<typeof TOPLIST_ROW_FRAGMENT>;
  index: number;
  hideQuizName?: boolean;
}) => {
  const { index, hideQuizName } = props;
  const result = useFragment(TOPLIST_ROW_FRAGMENT, props.results);

  return (
    <Table.Row className="hover:bg-gray-900 text-lg">
      <p>{index + 1}</p>
      <p>{!hideQuizName && (result.quiz?.title || "Unknown Quiz")}</p>
      <p>{result.nickname}</p>
      <p>
        {result.score}/{result.total} (
        {Math.round((result.score / result.total) * 100)}%)
      </p>
      <p>
        {Math.floor(result.time / 1000 / 60)}m{" "}
        {Math.floor((result.time / 1000) % 60)}s
      </p>
    </Table.Row>
  );
};
