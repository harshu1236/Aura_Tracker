// src/components/compete/MyDuels.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyDuels = () => {
  const [duels, setDuels] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:1211/api/duels/student/${localStorage.getItem('studentId')}`)
      .then(res => setDuels(res.data))
      .catch(() => console.error('Error fetching duels.'));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">My Duels</h2>
      {duels.map((duel) => (
        <div key={duel.id} className="bg-gray-800 p-4 mb-3 rounded shadow">
          <p><strong>ID:</strong> {duel.id}</p>
          <p><strong>Opponent:</strong> {duel.opponent?.name}</p>
          <p><strong>Status:</strong> {duel.completed ? '✅ Completed' : '⏳ Ongoing'}</p>
          <Link to={`/student/duel/${duel.id}`} className="text-blue-400 underline">Enter Room</Link>
        </div>
      ))}
    </div>
  );
};

export default MyDuels;
