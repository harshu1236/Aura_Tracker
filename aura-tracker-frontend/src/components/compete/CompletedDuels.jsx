// src/components/compete/CompletedDuels.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompletedDuels = () => {
  const [duels, setDuels] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1211/api/duels/completed')
      .then(res => setDuels(res.data))
      .catch(() => console.error('Error fetching completed duels.'));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Completed Duels</h2>
      {duels.length === 0 ? (
        <p>No duels completed yet.</p>
      ) : (
        duels.map(duel => (
          <div key={duel.id} className="bg-gray-700 p-4 mb-3 rounded">
            <p><strong>Challenger:</strong> {duel.challenger?.name}</p>
            <p><strong>Opponent:</strong> {duel.opponent?.name}</p>
            <p><strong>Winner:</strong> {duel.winner?.name || 'Not Decided'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedDuels;
