import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const ATTEMPT_QUERY = gql`
  query Attempt($id: ID!) {
    attempt(id: $id) {
      id
      nickname
      score
      total
    }
  }
`;

type AttemptQueryType = {
  attempt: {
    id: string;
    nickname: string;
    score: number;
    total: number;
  };
};

export const Attempt = () => {
  const { attemptId } = useParams<{ attemptId: string }>();

  const { loading, error, data } = useQuery<AttemptQueryType>(ATTEMPT_QUERY, {
    variables: { id: attemptId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { attempt } = data!;

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1>Attempt</h1>
          <h2>{attempt.nickname}</h2>
          <p>
            Score: {attempt.score}/{attempt.total}
          </p>
        </div>
      </div>
    </div>
  );
}
