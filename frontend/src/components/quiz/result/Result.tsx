import { FragmentType, graphql, useFragment } from "@/gql";
import { ResultBasicInfo } from "@/components/quiz/result/ResultBasicInfo.tsx";
import { Solutions } from "@/components/quiz/result/Solutions.tsx";
import { HomeButton } from "@/components/reusable/home-button/HomeButton.tsx";

const RESULT_FRAGMENT = graphql(`
  fragment ResultFragment on Result {
    id
    score
    total
    ...ResultBasicInfo
    quiz {
      id
      ...SolutionsFragment
    }
  }
`);

export default function Result(props: {
  result: FragmentType<typeof RESULT_FRAGMENT>;
  savedAnswers: { [key: string]: string[] };
}) {
  const result = useFragment(RESULT_FRAGMENT, props.result);

  return (
    <div
      className={`-m-4 w-[calc(100%+2rem)] h-full bg-linear-to-br rounded-box p-4
            ${
              result.score / result.total > 0.5
                ? "from-green-600/25 to-green-500/5"
                : "from-red-600/25 to-red-500/5"
            }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center h-12">
          <HomeButton />
          <h1 className="text-3xl font-bold w-full text-center">Results</h1>
        </div>
        <ResultBasicInfo result={result} />
        <Solutions quiz={result.quiz} savedAnswers={props.savedAnswers} />
      </div>
    </div>
  );
}
