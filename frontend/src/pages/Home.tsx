import React, {  useState } from 'react';
import { Toplist } from '../components/Toplist';
import { Button, Select, Artboard } from 'react-daisyui';
import { gql, useQuery } from '@apollo/client';

const HOME_QUERY = gql`
  query Home($topAttemptsQuizId: ID) {
    topAttempts(quizId: $topAttemptsQuizId, limit: 10) {
      id
      nickname
      score
      total
      quiz {
        id
        title
      }
      time
    }
    quizzes {
      id
      title
    }
  }
`;

type HomeQueryVariablesType = {
  topAttemptsQuizId?: string;
};

type HomeQueryResponseType = {
  topAttempts: {
    id: string;
    nickname: string;
    score: number;
    total: number;
    quiz: {
      id: string;
      title: string;
    };
    time: number;
  }[];
  quizzes: {
    id: string;
    title: string;
  }[];
};

export const Home = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const { loading, error, data } = useQuery<
    HomeQueryResponseType,
    HomeQueryVariablesType
  >(HOME_QUERY, {
    variables: { topAttemptsQuizId: selectedQuiz || undefined },
    onCompleted: (data) => {
      if (!selectedQuiz) setSelectedQuiz(data.quizzes[0].id);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { topAttempts, quizzes } = data!;

  const startQuiz = (quizId: string) => {
    window.location.href = `/quiz/${quizId}`;
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Artboard className='p-4 max-w-3xl'>
        <h1 className='text-4xl'>Quiz App</h1>
        <div className='flex justify-start w-full mt-4'>
          <Select
            onChange={(e) => setSelectedQuiz(e.target.value)}
            value={selectedQuiz || ''}
          >
            {quizzes.map((quiz) => {
              return (
                <Select.Option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </Select.Option>
              );
            })}
          </Select>
          <Button
            onClick={() => {
              // I'm in a hurry
              if (selectedQuiz) startQuiz(selectedQuiz);
              startQuiz(quizzes[0].id);
            }}
            className='ml-2'
            color='primary'
          >
            Start quiz
          </Button>
        </div>
        <h2 className='text-2xl mt-4'>
          Top attempts for{' '}
          {
            quizzes.find(
              (quiz) => quiz.id.toString() === selectedQuiz?.toString()
            )?.title
          }
        </h2>
        <Toplist attempts={topAttempts} hideQuizName />
      </Artboard>
    </div>
  );
};
