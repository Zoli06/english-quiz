import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '../components/Question';
import { QuestionSelector } from '../components/QuestionSelector';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from 'react-daisyui';

const QUIZ_QUERY = gql`
  query Quiz($id: ID!) {
    quiz(id: $id) {
      id
      questions {
        id
        text
        allowMultipleAnswers
        options {
          id
          text
        }
      }
    }
  }
`;

type QuizQueryType = {
  quiz: {
    id: string;
    questions: {
      id: string;
      text: string;
      allowMultipleAnswers: boolean;
      options: {
        id: string;
        text: string;
      }[];
    }[];
  };
};

const ATTEMPT_SUBMISSION_MUTATION = gql`
  mutation SubmitAttempt(
    $quizId: ID!
    $nickname: String!
    $answers: [Answer!]!
  ) {
    submitAttempt(quizId: $quizId, nickname: $nickname, answers: $answers) {
      id
    }
  }
`;

type AttemptSubmissionMutationVariablesType = {
  quizId: string;
  nickname: string;
  answers: {
    questionId: string;
    optionIds: string[];
  }[];
};

type AttemptSubmissionMutationResponseType = {
  submitAttempt: {
    id: string;
  };
};

// There's a bug
// Saved answers change after submit for some reason
// Not going to fix it, it redirects to result page anyway
export const Quiz = () => {
  const { quizId } = useParams<{
    quizId: string;
  }>();

  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<{ [key: string]: string[] }>(
    {}
  );

  const { loading, error, data } = useQuery<QuizQueryType>(QUIZ_QUERY, {
    variables: { id: quizId },
  });

  const [submitQuizMutation] = useMutation<
    AttemptSubmissionMutationResponseType,
    AttemptSubmissionMutationVariablesType
  >(ATTEMPT_SUBMISSION_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>API error!</p>;

  if (!activeQuestionId) setActiveQuestionId(data!.quiz.questions[0].id);

  const question = data!.quiz.questions.find(
    (element) => element.id === activeQuestionId
  );
  if (!question) return <p>Error! Question not found</p>;

  const saveAnswers = (questionId: string, answerIds: string[]) => {
    setSavedAnswers({
      ...savedAnswers,
      [questionId]: answerIds,
    });
  };

  const submitQuiz = async () => {
    const answers = Object.entries(savedAnswers).map(
      ([questionId, answerIds]) => {
        return {
          questionId,
          optionIds: answerIds,
        };
      }
    );

    const { data } = await submitQuizMutation({
      variables: {
        quizId: quizId!,
        nickname: 'Anonymous',
        answers,
      },
    });

    console.log(JSON.stringify(data));

    window.location.href = `/result/${data!.submitAttempt.id}`;
  };

  return (
    <>
      <QuestionSelector
        questions={data!.quiz.questions}
        activeQuestionId={activeQuestionId!}
        setActiveQuestionId={setActiveQuestionId}
      />
      <Question
        question={question}
        saveAnswers={saveAnswers}
        savedAnswers={savedAnswers[question.id] || []}
      />
      <Button onClick={submitQuiz}>Submit Quiz</Button>
    </>
  );
};
