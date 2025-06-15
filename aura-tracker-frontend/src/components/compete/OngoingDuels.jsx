// src/components/compete/OngoingDuels.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OngoingDuels = () => {
  const [duels, setDuels] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1211/api/duels/ongoing')
      .then(res => setDuels(res.data))
      .catch(() => console.error('Error fetching ongoing duels.'));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Ongoing Duels</h2>
      {duels.length === 0 ? (
        <p>No active duels.</p>
      ) : (
        duels.map(duel => (
          <div key={duel.id} className="bg-gray-800 p-4 mb-3 rounded">
            <p><strong>Challenger:</strong> {duel.challenger?.name}</p>
            <p><strong>Opponent:</strong> {duel.opponent?.name}</p>
            <p><strong>Deadline:</strong> {new Date(duel.deadline).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OngoingDuels;
