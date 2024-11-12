import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Artboard, Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';

const ATTEMPT_QUERY = gql`
  query Attempt($id: ID!) {
    attempt(id: $id) {
      id
      nickname
      score
      total
      time
    }
  }
`;

type AttemptQueryVariablesType = {
  id: string;
};

type AttemptQueryResponseType = {
  attempt: {
    id: string;
    nickname: string;
    score: number;
    total: number;
    time: number;
  };
};

export const Attempt = () => {
  const navigate = useNavigate();

  const { attemptId } = useParams<{ attemptId: string }>();

  const { loading, error, data } = useQuery<
    AttemptQueryResponseType,
    AttemptQueryVariablesType
  >(ATTEMPT_QUERY, {
    variables: { id: attemptId! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { attempt } = data!;

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Artboard className='max-w-3xl'>
        {/* Add tint based on the score eg. green for 100%, red for 0% */}
        <div
          className={`relative p-4 w-full h-full bg-gradient-to-br rounded-box
            ${
              attempt.score >= 0
                ? 'from-green-600/25 to-green-500/5'
                : 'from-red-600/25 to-red-500/5'
            }`}
        >
          <div className='flex flex-col gap-4'>
            <div className='flex flex-row justify-between items-center h-12'>
              <Button
                onClick={() => {
                  navigate('/');
                }}
                className='w-fit absolute top-4 left-4'
                color='primary'
              >
                Home
              </Button>
              <h1 className='text-3xl font-bold w-full text-center'>Results</h1>
            </div>
            <div className='flex flex-row justify-between'>
              <h2 className='text-2xl'>Nickname: {attempt.nickname}</h2>
              <p className='text-2xl'>
                Score: {attempt.score}/{attempt.total}
              </p>
            </div>
            <div className='flex flex-row justify-between'>
              <p className='text-2xl'>
                Percentage: {Math.round((attempt.score / attempt.total) * 100)}%
              </p>
              <p className='text-2xl'>
                Time: {Math.floor(attempt.time / 1000 / 60)}m{' '}
                {Math.floor((attempt.time / 1000) % 60)}s
              </p>
            </div>
          </div>
        </div>
      </Artboard>
    </div>
  );
};
