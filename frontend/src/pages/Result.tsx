import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

const ATTEMPT_QUERY = gql`
  query Attempt($id: ID!) {
    attempt(id: $id) {
      id
      nickname
      score
      total
      time
    }
  }
`;

type AttemptQueryVariablesType = {
  id: number;
};

type AttemptQueryResponseType = {
  attempt: {
    id: number;
    nickname: string;
    score: number;
    total: number;
    time: number;
  };
};

export const Result = () => {
  const navigate = useNavigate();

  const attemptId = parseInt(useParams<{ attemptId: string }>().attemptId!);

  const { loading, error, data } = useQuery<
    AttemptQueryResponseType,
    AttemptQueryVariablesType
  >(ATTEMPT_QUERY, {
    variables: { id: attemptId! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { attempt } = data!;

  console.log(attempt);
  return (
    <div
      className={`-m-4 w-[calc(100%+2rem)] h-full bg-gradient-to-br rounded-box p-4
            ${
              attempt.score / attempt.total > 0.5
                ? "from-green-600/25 to-green-500/5"
                : "from-red-600/25 to-red-500/5"
            }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center h-12">
          <Button
            onClick={() => {
              navigate("/");
            }}
            className="w-fit absolute top-4 left-4"
            color="primary"
          >
            Home
          </Button>
          <h1 className="text-3xl font-bold w-full text-center">Results</h1>
        </div>
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl">Nickname: {attempt.nickname}</h2>
          <p className="text-2xl">
            Score: {attempt.score}/{attempt.total}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-2xl">
            Percentage: {Math.round((attempt.score / attempt.total) * 100)}%
          </p>
          <p className="text-2xl">
            Time: {Math.floor(attempt.time / 1000 / 60)}m{" "}
            {Math.floor((attempt.time / 1000) % 60)}s
          </p>
        </div>
      </div>
    </div>
  );
};
