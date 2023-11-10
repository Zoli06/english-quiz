import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '../components/Question';
import { QuestionSelector } from '../components/QuestionSelector';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Artboard } from 'react-daisyui';

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
        media {
          id
          url
          title
          type
        }
      }
    }
  }
`;

type QuizQueryVariablesType = {
  id: string;
};

type QuizQueryResponseType = {
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
      media: {
        id: string;
        url: string;
        title: string;
        type: 'image' | 'video';
      };
    }[];
  };
};

const ATTEMPT_SUBMISSION_MUTATION = gql`
  mutation SubmitAttempt(
    $quizId: ID!
    $nickname: String!
    $answers: [Answer!]!
    $time: Int!
  ) {
    submitAttempt(quizId: $quizId, nickname: $nickname, answers: $answers, time: $time) {
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
  time: number;
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
  const [startTimestamp, setStartTimestamp] = useState<number>(Date.now());

  const { loading, error, data } = useQuery<
    QuizQueryResponseType,
    QuizQueryVariablesType
  >(QUIZ_QUERY, {
    variables: { id: quizId! },
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
    const endTimestamp = Date.now();
    const timeTaken = endTimestamp - startTimestamp;

    const answers = Object.entries(savedAnswers).map(
      ([questionId, answerIds]) => {
        return {
          questionId,
          optionIds: answerIds,
        };
      }
    );

    const nickname = (() => {
      while (true) {
        const nickname = prompt('Enter your nickname');
        if (nickname) return nickname;
      }
    })();

    const { data } = await submitQuizMutation({
      variables: {
        quizId: quizId!,
        nickname,
        answers,
        time: timeTaken,
      },
    });

    window.location.href = `/result/${data!.submitAttempt.id}`;
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Artboard className='max-w-3xl p-4'>
        <QuestionSelector
          questions={data!.quiz.questions}
          activeQuestionId={activeQuestionId!}
          setActiveQuestionId={setActiveQuestionId}
          submitQuiz={submitQuiz}
        />
        <Question
          question={question}
          saveAnswers={saveAnswers}
          savedAnswers={savedAnswers[question.id] || []}
        />
      </Artboard>
    </div>
  );
};
