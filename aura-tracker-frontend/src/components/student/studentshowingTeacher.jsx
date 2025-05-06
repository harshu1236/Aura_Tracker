import React, { useEffect, useState } from 'react';

const StudentShowingTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
const studentId = user?.studentId;


    if (studentId && user?.role === 'STUDENT') {
      fetchTeachers(studentId);
    } else {
      setError('Student ID is missing or you are not logged in as a student.');
    }
  }, []);

  const fetchTeachers = (studentId) => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:1211/api/std/${studentId}/teachers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Received non-JSON response');
        }
      })
      .then((data) => {
        console.log('Teachers Data:', data);
        setTeachers(data);
      })
      .catch((err) => {
        console.error('Error fetching teachers:', err);
        setError('Failed to fetch teachers.');
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">Your Teachers</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        {teachers.length === 0 && !error ? (
          <p className="text-gray-300 text-center">No teachers found for your enrolled courses.</p>
        ) : (
          <ul className="space-y-4">
            {teachers.map((teacher) => (
              <li
                key={teacher.teacherId}
                className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200 p-4 rounded-lg shadow-md"
              >
                <p className="text-lg font-semibold text-white">{teacher.name}</p>
                <p className="text-sm text-teal-300">{teacher.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentShowingTeacher;
