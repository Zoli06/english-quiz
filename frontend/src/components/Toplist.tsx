import React, { useState, useEffect } from 'react';
import { Table } from 'react-daisyui';

export const Toplist = ({
  attempts
}: {
  attempts: {
    id: string;
    nickname: string;
    score: number;
    total: number;
  }[];
}) => {
  // only sort if list changed
  const [sortedAttempts, setSortedAttempts] = useState(attempts);
  useEffect(() => {
    setSortedAttempts(
      attempts.sort((a, b) => {
        return (b.score / b.total) - (a.score / a.total);
      })
    );
  }, [attempts]);

  return (
    <Table>
      <Table.Head>
        <span>Place</span>
        <span>Name</span>
        <span>Score</span>
      </Table.Head>
      <Table.Body>
        {sortedAttempts.map((attempt, index) => {
          return (
            <tr key={attempt.id}>
              <td>{index + 1}</td>
              <td>{attempt.nickname}</td>
              <td>
                {attempt.score}/{attempt.total} ({Math.round(attempt.score / attempt.total * 100)}%)
              </td>
            </tr>
          );
        })}
      </Table.Body>
    </Table>
  );
}
