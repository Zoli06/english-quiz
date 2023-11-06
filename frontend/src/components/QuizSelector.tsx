import React from 'react';
import { Select } from 'react-daisyui';

export const QuizSelector = ({
  quizzes,
  quizId,
  setQuizId,
}: {
  quizzes: { quizId: number; name: string }[];
  quizId: number;
  setQuizId: (quizId: number) => void;
}) => {
  return (
    <div>
      <Select
        placeholder='Select a quiz'
        className='w-64'
        onChange={(e) => setQuizId(Number(e.target.value))}
        value={quizId}
      >
        {quizzes.map((quiz) => (
          <option
            key={quiz.quizId}
            value={quiz.quizId}
            onClick={() => setQuizId(quiz.quizId)}
          >
            {quiz.name}
          </option>
        ))}
      </Select>
    </div>
  );
};
