import React, { useState } from 'react';
import { Toplist } from '../components/Toplist';
import { Button } from 'react-daisyui';
import { gql, useQuery } from '@apollo/client';

const HOME_QUERY = gql`
  query Home {
    topAttempts {
      id
      nickname
      score
      total
    }
    quizzes {
      id
      title
    }
  }
`;

type HomeQueryType = {
  topAttempts: {
    id: string;
    nickname: string;
    score: number;
    total: number;
  }[];
  quizzes: {
    id: string;
    title: string;
  }[];
};

export const Home = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const { loading, error, data } = useQuery<HomeQueryType>(HOME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { topAttempts, quizzes } = data!;

  const startQuiz = (quizId: string) => {
    window.location.href = `/quiz/${quizId}`;
  };

  return (
    <div>
      <Toplist attempts={topAttempts} />
      <h1>Quizzes</h1>
      <select
        className='select select-bordered'
        onChange={(e) => setSelectedQuiz(e.target.value)}
      >
        {quizzes.map((quiz) => {
          return (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title}
            </option>
          );
        })}
      </select>
      <Button
        onClick={() => {
          // I'm in a hurry
          if (selectedQuiz) startQuiz(selectedQuiz);
          startQuiz(quizzes[0].id);
        }}

      >
        Start quiz
      </Button>
    </div>
  );
};
