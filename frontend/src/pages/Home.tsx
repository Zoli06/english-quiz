import { useQuery } from "@apollo/client/react";
import { useMemo, useState } from "react";
import { graphql } from "@/gql";
import { Toplist } from "@/components/home/toplist/Toplist.tsx";
import { QuizSelector } from "@/components/home/quiz-selector/QuizSelector.tsx";
import { QuizStartButton } from "@/components/home/quiz-start-button/QuizStartButton.tsx";

const HOME_QUERY = graphql(`
  query Home($topResultsQuizId: ID) {
    topResults(quizId: $topResultsQuizId, limit: 10) {
      id
      ...ToplistFragment
    }
    quizzes {
      id
      ...QuizSelectorFragment
      ...QuizStartButtonFragment
    }
  }
`);

export default function Home() {
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const { loading, error, data } = useQuery(HOME_QUERY, {
    variables: { topResultsQuizId: selectedQuizId || undefined },
  });

  const selectedQuiz = useMemo(() => {
    if (!data || !data.quizzes) return null;
    return data.quizzes.find((quiz) => quiz.id === selectedQuizId) || null;
  }, [data, selectedQuizId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { quizzes, topResults } = data!;

  if (!quizzes || quizzes.length === 0) {
    return (
      <div>
        <h1 className="text-4xl">No quizzes available</h1>
        <p>Check back later</p>
      </div>
    );
  }

  if (selectedQuizId === null) {
    setSelectedQuizId(quizzes[0].id);
  }

  return (
    <>
      <h1 className="text-4xl">Quizzes for the open day</h1>
      <div className="flex justify-center w-full mt-4">
        <div className="flex w-1/2 gap-2">
          <QuizSelector
            quizzes={quizzes}
            selectedQuiz={selectedQuizId}
            setSelectedQuiz={setSelectedQuizId}
          />
          <QuizStartButton quiz={selectedQuiz!} />
        </div>
      </div>
      {topResults && topResults.length > 0 && (
        <Toplist results={topResults} hideQuizName />
      )}
    </>
  );
}
