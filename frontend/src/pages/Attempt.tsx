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
      <Artboard className='max-w-3xl relative p-4'>
        <Button
          onClick={() => {
            navigate('/');
          }}
          className='absolute top-4 left-4'
        >
          Home
        </Button>
        <h1 className='text-3xl'>Attempt Result</h1>
        <h2 className='text-2xl'>Nickname: {attempt.nickname}</h2>
        <p className='text-2xl'>
          Score: {attempt.score}/{attempt.total}
        </p>
        <p className='text-2xl'>
          Percentage: {Math.round((attempt.score / attempt.total) * 100)}%
        </p>
        <p className='text-2xl'>Time: {Math.floor(attempt.time / 1000 / 60)}m {Math.floor(attempt.time / 1000 % 60)}s</p>
      </Artboard>
    </div>
  );
};
