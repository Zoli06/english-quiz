import { FragmentType, graphql, useFragment } from "@/gql";

const RESULT_BASIC_INFO = graphql(`
  fragment ResultBasicInfo on Result {
    id
    nickname
    score
    total
    time
  }
`);

export const ResultBasicInfo = (props: {
  result: FragmentType<typeof RESULT_BASIC_INFO>;
}) => {
  const result = useFragment(RESULT_BASIC_INFO, props.result);

  return (
    <>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl">Nickname: {result.nickname}</h2>
        <p className="text-2xl">
          Score: {result.score}/{result.total}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-2xl">
          Percentage: {Math.round((result.score / result.total) * 100)}%
        </p>
        <p className="text-2xl">
          Time: {Math.floor(result.time / 1000 / 60)}m{" "}
          {Math.floor((result.time / 1000) % 60)}s
        </p>
      </div>
    </>
  );
};
