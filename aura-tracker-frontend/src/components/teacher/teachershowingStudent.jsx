import React, { useEffect, useState } from 'react';

const TeacherShowingStudent = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Ensure you're parsing this correctly
  const teacherId = user?.teacherId; // Now this will fetch the teacherId from the user object

  useEffect(() => {
    if (user?.role?.toLowerCase() === 'teacher' && teacherId && token) {
      fetchStudents();  // Proceed only if the teacherId and role are correct
    } else {
      setError('You must be logged in as a teacher.');
    }
  }, [user, token, teacherId]);  // Ensure dependencies are correct to re-trigger when needed

  const fetchStudents = () => {
    fetch(`http://localhost:1211/api/teacher/${teacherId}/students`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch students');
        return response.json();
      })
      .then(data => {
        console.log('Students fetched:', data);
        setStudents(data);
      })
      .catch(err => {
        console.error('Error:', err);
        setError('Failed to fetch student data.');
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h2 className="text-4xl font-extrabold text-center text-indigo-500 mb-6">Students Assigned to You</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {students.length === 0 && !error ? (
        <p className="text-center text-gray-400">No students enrolled in your courses.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {students.map(student => (
            <div key={student.studentId} className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 p-6">
              <h3 className="text-xl font-semibold text-indigo-400 mb-2">{student.studentName}</h3>
              <p className="text-gray-300"><span className="font-medium">Reg No:</span> {student.regNo}</p>
              <p className="text-gray-300"><span className="font-medium">Semester:</span> {student.semester}</p>
              <p className="text-gray-300"><span className="font-medium">Points:</span> {student.points}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherShowingStudent;
