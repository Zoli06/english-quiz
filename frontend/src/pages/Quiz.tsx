import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Question } from "@/components/quiz/question/Question";
import { QuestionsNavigator } from "@/components/quiz/question-selector/QuestionsNavigator.tsx";
import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const QUIZ_QUERY = graphql(`
  query Quiz($id: ID!) {
    quiz(id: $id) {
      id
      ...QuestionsNavigatorFragment
      questions {
        ...QuestionFragment
        id
      }
    }
  }
`);

// There's a bug
// Saved answers change after submit for some reason
// Not going to fix it, it redirects to result page anyway
export default function Quiz() {
  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const quizId = useParams<{
    quizId: string;
  }>().quizId!;

  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<{ [key: string]: string[] }>(
    {},
  );

  const { loading, error, data } = useQuery(QUIZ_QUERY, {
    variables: { id: quizId! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>API error!</p>;
  if (!data || !data.quiz) return <p>Quiz not found</p>;

  if (!activeQuestionId) {
    if (data!.quiz.questions.length === 0) {
      return (
        <div>
          <p>No questions found</p>
          <Link to="/" className="text-blue-500">
            Go back
          </Link>
        </div>
      );
    }
    setActiveQuestionId(data!.quiz.questions[0].id);
  }

  const question = data!.quiz.questions.find(
    (element) => element.id === activeQuestionId,
  );
  if (!question) return <p>Error! Question not found</p>;

  const saveAnswers = (questionId: string, answerIds: string[]) => {
    setSavedAnswers({
      ...savedAnswers,
      [questionId]: answerIds,
    });
  };

  return (
    <>
      <QuestionsNavigator
        quiz={data!.quiz}
        savedAnswers={savedAnswers}
        activeQuestionId={activeQuestionId!}
        setActiveQuestionId={setActiveQuestionId}
      />
      <Question
        question={question}
        saveAnswers={saveAnswers}
        savedAnswerIds={savedAnswers[question.id] || []}
      />
    </>
  );
}
