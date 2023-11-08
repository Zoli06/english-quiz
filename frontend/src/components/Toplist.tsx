import React from 'react';
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
  return (
    <Table>
      <Table.Head>
        <span>Place</span>
        <span>Name</span>
        <span>Score</span>
      </Table.Head>
      <Table.Body>
        {attempts.map((attempt, index) => {
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
