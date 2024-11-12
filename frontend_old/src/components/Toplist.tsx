import React from 'react';
import { Table } from 'react-daisyui';

export const Toplist = ({
  attempts,
  hideQuizName,
}: {
  attempts: {
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
  hideQuizName?: boolean;
}) => {
  return (
    <Table>
      <Table.Head>
        <span>Place</span>
        {!hideQuizName && <span>Quiz</span>}
        <span>Name</span>
        <span>Score</span>
        <span>Time</span>
      </Table.Head>
      <Table.Body>
        {attempts.map((attempt, index) => {
          return (
            <tr key={attempt.id} className='hover:bg-gray-900 text-lg'>
              <td>{index + 1}</td>
              <td>{!hideQuizName && attempt.quiz.title}</td>
              <td>{attempt.nickname}</td>
              <td>
                {attempt.score}/{attempt.total} ({Math.round(attempt.score / attempt.total * 100)}%)
              </td>
              <td>{Math.floor(attempt.time / 1000 / 60)}m {Math.floor(attempt.time / 1000 % 60)}s</td>
            </tr>
          );
        })}
      </Table.Body>
    </Table>
  );
}
