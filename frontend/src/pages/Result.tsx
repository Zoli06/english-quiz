import { useQuery } from "@apollo/client/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-daisyui";
import { graphql } from "@/gql";
import { useEffect } from "react";

const RESULT_QUERY = graphql(`
  query Result($id: ID!) {
    result(id: $id) {
      id
      nickname
      score
      total
      time
      quiz {
        id
        title
        questions {
          id
          text
          options {
            id
            text
            isCorrect
          }
        }
      }
    }
  }
`);

export default function Result() {
  const location = useLocation();
  const answers = location.state?.answers as {
    questionId: string;
    optionIds: string[];
  }[];
  window.history.replaceState({}, "");
  const navigate = useNavigate();
  const resultId = useParams<{ resultId: string }>().resultId!;

  useEffect(() => {
    if (!answers) {
      navigate("/");
    }
  }, [answers, navigate]);

  const { loading, error, data } = useQuery(RESULT_QUERY, {
    variables: { id: resultId! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { result } = data!;

  if (!result) {
    return <p>Error loading result data.</p>;
  }

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
        <div>
          <h2 className="text-2xl mb-2">Your Answers:</h2>
          <div className="flex flex-col gap-4">
            {/* Selected answers are bolded, correct answers are green, incorrect answers are red */}
            {result.quiz.questions.map((question) => {
              const userAnswer = answers.find(
                (ans) => ans.questionId === question.id,
              );
              return (
                <div key={question.id} className="border-b pb-2">
                  <h3 className="text-xl font-semibold mb-1">
                    {question.text}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {question.options.map((option) => {
                      const isSelected = userAnswer?.optionIds.includes(
                        option.id,
                      );
                      const isCorrect = option.isCorrect;
                      let className = "";
                      if (isSelected && isCorrect) {
                        className = "font-bold text-green-600";
                      } else if (isSelected && !isCorrect) {
                        className = "font-bold text-red-600";
                      } else if (!isSelected && isCorrect) {
                        className = "text-green-600";
                      }
                      return (
                        <span key={option.id} className={className}>
                          {option.text}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
