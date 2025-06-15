// src/components/compete/DuelRoom.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function DuelRoom() {
  const { duelId } = useParams();
  const [duel, setDuel] = useState(null);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  // Fetch duel details
  useEffect(() => {
    axios.get(`http://localhost:1211/api/duels/student/${localStorage.getItem('studentId')}`)
      .then(res => {
        const match = res.data.find(d => d.id.toString() === duelId);
        if (match) {
          setDuel(match);
        } else {
          setError('Duel not found or access denied.');
        }
      })
      .catch(() => setError('Failed to load duel.'));
  }, [duelId]);

  // Timer countdown
  useEffect(() => {
    if (!duel || duel.completed) return;

    const interval = setInterval(() => {
      const now = moment();
      const end = moment(duel.deadline);
      const diff = moment.duration(end.diff(now));

      if (diff.asMilliseconds() <= 0) {
        setTimeLeft('Time is up!');
        clearInterval(interval);
      } else {
        setTimeLeft(`${diff.minutes()}m ${diff.seconds()}s remaining`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duel]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!duel) return <div className="text-white p-4">Loading duel...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-gray-800 text-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Duel Room #{duel.id}</h2>

      <div className="mb-4">
        <p><strong>Challenger:</strong> {duel.challenger?.name} ({duel.challenger?.regNo})</p>
        <p><strong>Opponent:</strong> {duel.opponent?.name} ({duel.opponent?.regNo})</p>
        <p><strong>Started at:</strong> {moment(duel.startTime).format('LLL')}</p>
        <p><strong>Deadline:</strong> {moment(duel.deadline).format('LLL')}</p>
        <p><strong>Time Left:</strong> {timeLeft}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Codeforces Problem</h3>
        {duel.problemUrl ? (
          <a
            href={duel.problemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            [{duel.contestId}{duel.problemIndex}] {duel.problemName}
          </a>
        ) : (
          <p>No problem assigned yet.</p>
        )}
      </div>

      {duel.completed && (
        <div className="bg-green-700 p-4 rounded mt-4">
          <h3 className="text-lg font-semibold">Duel Completed</h3>
          <p><strong>Winner:</strong> {duel.winner ? duel.winner.name : 'Draw / Not decided'}</p>
        </div>
      )}
    </div>
  );
}

export default DuelRoom;
