import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StartDuel() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [opponentId, setOpponentId] = useState('');
  const [duration, setDuration] = useState(30);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    axios.get('http://localhost:1211/api/std/all')
      .then(res => {
        const others = res.data.filter(s => s.studentId.toString() !== studentId);
        setStudents(others);
        setFilteredStudents(others);
      })
      .catch(() => setError('Failed to load students.'));
  }, [studentId]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    setFilteredStudents(
      students.filter(s =>
        s.name.toLowerCase().includes(term) || s.regNo.toLowerCase().includes(term)
      )
    );
  };

  const startDuel = () => {
    setError('');
    setSuccess('');

    if (!opponentId) {
      setError('Select an opponent to start a duel.');
      return;
    }

    if (duration < 5 || duration > 180) {
      setError('Duration must be between 5 and 180 minutes.');
      return;
    }

    setLoading(true);
    axios.post('http://localhost:1211/api/duels/start', {
      challengerId: studentId,
      opponentId,
      duration
    }).then(res => {
      setSuccess('Duel started successfully!');
      setTimeout(() => {
        navigate(`/student/duel/${res.data.id}`);
      }, 1000);
    }).catch(err => {
      setError(err.response?.data?.message || 'Failed to start duel.');
    }).finally(() => setLoading(false));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-800 text-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Start a Duel</h2>

      {error && <div className="bg-red-500 p-2 rounded mb-3">{error}</div>}
      {success && <div className="bg-green-600 p-2 rounded mb-3">{success}</div>}

      <div className="mb-4">
        <label className="block mb-1">Search Opponent:</label>
        <input
          type="text"
          placeholder="Type name or Reg No..."
          value={search}
          onChange={handleSearch}
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />

        <select
          className="w-full p-2 bg-gray-700 rounded"
          value={opponentId}
          onChange={(e) => setOpponentId(e.target.value)}
        >
          <option value="">-- Select Opponent --</option>
          {filteredStudents.map((s) => (
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
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 rounded"
        />
      </div>

      <button
        onClick={startDuel}
        disabled={loading}
        className={`bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded ${loading && 'opacity-60 cursor-not-allowed'}`}
      >
        {loading ? 'Starting...' : 'Start Duel'}
      </button>
    </div>
  );
}

export default StartDuel;
