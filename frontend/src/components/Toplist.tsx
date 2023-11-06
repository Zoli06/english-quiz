import React, { useState, useEffect } from 'react';
import { Table } from 'react-daisyui';

export const Toplist = ({
  players,
}: {
  players: {
    playerId: number;
    name: string;
    score: number;
  }[];
}) => {
  // only sort if list changed
  const [sortedPlayers, setSortedPlayers] = useState(players);
  useEffect(() => {
    setSortedPlayers(
      players.sort((a, b) => {
        return b.score - a.score;
      })
    );
  }, [players]);

  return (
    <Table>
      <Table.Head>
        <span>Place</span>
        <span>Name</span>
        <span>Score</span>
      </Table.Head>
      <Table.Body>
        {sortedPlayers.map((player, index) => {
          return (
            <tr key={player.playerId}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          );
        })}
      </Table.Body>
    </Table>
  );
};
