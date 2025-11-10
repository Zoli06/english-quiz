import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Question } from "@/components/quiz/question/Question";
import { QuizNavigator } from "@/components/quiz/quiz-navigator/QuizNavigator.tsx";
import { useMutation, useQuery } from "@apollo/client/react";
import { DocumentType, graphql } from "@/gql";
import { ApolloClient } from "@apollo/client";
import Result from "@/components/quiz/result/Result.tsx";
import MutateResult = ApolloClient.MutateResult;

const QUIZ_QUERY = graphql(`
  query Quiz($id: ID!, $shuffleSeed: Int!) {
    quiz(id: $id) {
      id
      ...QuizNavigatorFragment
      questions(shuffleSeed: $shuffleSeed) {
        ...QuestionFragment
        id
      }
    }
  }
`);

const CREATE_RESULT_MUTATION = graphql(`
  mutation CreateResult(
    $quizId: ID!
    $nickname: String!
    $answers: [Answer!]!
    $time: Int!
    $shuffleSeed: Int!
  ) {
    createResult(
      quizId: $quizId
      nickname: $nickname
      answers: $answers
      time: $time
    ) {
      id
      ...ResultFragment
      # Just removing unused variable warning
      quiz {
        id
        questions(shuffleSeed: $shuffleSeed) {
          id
        }
      }
    }
  }
`);

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

  const [shuffleSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<{ [key: string]: string[] }>(
    {},
  );

  const saveAnswers = (questionId: string, answerIds: string[]) => {
    setSavedAnswers({
      ...savedAnswers,
      [questionId]: answerIds,
    });
  };

  // region Submission logic
  const [startTimestamp] = useState(() => Date.now());
  const [createResult] = useMutation(CREATE_RESULT_MUTATION);
  const [result, setResult] = useState<MutateResult<
    DocumentType<typeof CREATE_RESULT_MUTATION>
  > | null>(null);

  const submit = useCallback(async () => {
    const endTimestamp = Date.now();
    const timeTaken = endTimestamp - startTimestamp;

    const answers = Object.entries(savedAnswers).map(
      ([questionId, answerIds]) => {
        return {
          questionId: questionId,
          optionIds: answerIds,
        };
      },
    );

    const nickname = (() => {
      while (true) {
        const nickname = prompt("Enter your nickname");
        if (nickname) return nickname;
      }
    })();

    setResult(
      await createResult({
        variables: {
          quizId,
          nickname,
          answers,
          time: timeTaken,
          shuffleSeed,
        },
      }),
    );

    window.onbeforeunload = null;
  }, [createResult, quizId, savedAnswers, startTimestamp, shuffleSeed]);
  // endregion

  const { loading, error, data } = useQuery(QUIZ_QUERY, {
    variables: { id: quizId, shuffleSeed },
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

  if (result?.error) {
    return <p>Submission error</p>;
  }

  const question = data!.quiz.questions.find(
    (element) => element.id === activeQuestionId,
  );
  if (!question) return <p>Error! Question not found</p>;

  return result ? (
    <Result result={result.data!.createResult!} savedAnswers={savedAnswers} />
  ) : (
    <>
      <QuizNavigator
        quiz={data!.quiz}
        activeQuestionId={activeQuestionId!}
        setActiveQuestionId={setActiveQuestionId}
        submit={submit}
      />
      <Question
        question={question}
        saveAnswers={saveAnswers}
        savedAnswerIds={savedAnswers[question.id] || []}
      />
    </>
  );
}
