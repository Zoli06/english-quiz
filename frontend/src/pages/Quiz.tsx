import React from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '../components/Question';

export const Quiz = () => {
  let { quizId, questionId } = useParams<{
    quizId: string;
    questionId: string;
  }>();
  questionId ??= '0';

  const questions = [
    {
      questionId: '0',
      question: 'Anyad szeret?',
      answers: [
        {
          answerId: '0',
          answer: 'igen',
        },
        {
          answerId: '1',
          answer: 'nem',
        },
      ],
    },
  ];

  const question = questions.find(
    (element) => element.questionId === questionId
  );
  if (!question) return null;

  const submitAnswer = () => {
    console.log('a');
  };

  return <Question question={question} submitAnswer={submitAnswer} />;
};
