import React, { useState } from 'react';
import { Toplist } from '../components/Toplist';
import { QuizSelector } from '../components/QuizSelector';
import { Button } from 'react-daisyui';

export const Home = () => {
  const quizzes = [
    { quizId: 1, name: 'Quiz 1' },
    { quizId: 2, name: 'Quiz 2' },
    { quizId: 3, name: 'Quiz 3' },
  ];
  const players = [
    { playerId: 1, name: 'John Doe', score: 100 },
    { playerId: 2, name: 'Jane Doe', score: 90 },
    { playerId: 3, name: 'John Smith', score: 80 },
  ];

  const [quizId, setQuizId] = useState(quizzes[0].quizId);

  const startQuiz = () => {
    window.location.href = `/quiz/${quizId}`;
  };

  return (
    <div>
      <Toplist players={players} />
      <QuizSelector quizzes={quizzes} quizId={quizId} setQuizId={setQuizId} />
      <Button color='primary' onClick={startQuiz}>
        Start
      </Button>
    </div>
  );
};
