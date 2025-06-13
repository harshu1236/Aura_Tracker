import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StartDuel() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [opponentId, setOpponentId] = useState('');
  const [duration, setDuration] = useState(30); // default 30 mins
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    axios.get('http://localhost:1211/api/std/all')
      .then(res => {
        const others = res.data.filter(s => s.studentId.toString() !== studentId);
        setStudents(others);
      })
      .catch(() => setError('Failed to load students.'));
  }, [studentId]);

  const startDuel = () => {
    setError('');
    setSuccess('');

    if (!opponentId) {
      setError('Select an opponent to start a duel.');
      return;
    }

    axios.post('http://localhost:1211/api/duel/start', {
      challengerId: studentId,
      opponentId,
      duration
    }).then(res => {
      setSuccess('Duel started successfully!');
      navigate(`/student/duel/${res.data.id}`); // adjust based on actual route
    }).catch(err => {
      setError(err.response?.data?.message || 'Failed to start duel.');
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-800 text-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Start a Duel</h2>

      {error && <div className="bg-red-500 p-2 rounded mb-3">{error}</div>}
      {success && <div className="bg-green-600 p-2 rounded mb-3">{success}</div>}

      <div className="mb-4">
        <label className="block mb-1">Select Opponent:</label>
        <select
          className="w-full p-2 bg-gray-700 rounded"
          value={opponentId}
          onChange={(e) => setOpponentId(e.target.value)}
        >
          <option value="">-- Choose --</option>
          {students.map((s) => (
            <option key={s.studentId} value={s.studentId}>
              {s.name} ({s.regNo})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Duration (minutes):</label>
        <input
          type="number"
          min={5}
          max={180}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
        />
      </div>

      <button
        onClick={startDuel}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded"
      >
        Start Duel
      </button>
    </div>
  );
}

export default StartDuel;
