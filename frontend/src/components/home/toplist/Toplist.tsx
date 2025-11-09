import { FragmentType, graphql, useFragment } from "@/gql";
import { ToplistTable } from "@/components/home/toplist/ToplistTable.tsx";

const TOPLIST_FRAGMENT = graphql(`
  fragment ToplistFragment on Result {
    id
    quiz {
      id
      title
    }
    ...ToplistTableFragment
  }
`);

export const Toplist = (props: {
  results: FragmentType<typeof TOPLIST_FRAGMENT>[];
  hideQuizName?: boolean;
}) => {
  const results = useFragment(TOPLIST_FRAGMENT, props.results);

  return (
    <>
      <h2 className="text-3xl mt-4">
        Leaderboard for {results[0].quiz?.title || "Unknown Quiz"}
      </h2>
      <ToplistTable results={results} hideQuizName={props.hideQuizName} />
    </>
  );
};
