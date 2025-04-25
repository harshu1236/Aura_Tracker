// src/components/home/Home.jsx
import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';

function Home() {
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentId = JSON.parse(localStorage.getItem('user'))?.studentId;
        if (!studentId) {
          console.error('Student ID not found in localStorage');
          return;
        }
        const data = await studentService.getStudentById(studentId);
        setStudentDetails(data);
      } catch (error) {
        console.error('Error fetching student details:', error.response || error.message);
      }
    };

    fetchStudentDetails();
  }, []);

  if (!studentDetails) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-lg text-gray-300 animate-pulse">Loading student details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <h1 className="text-4xl font-bold text-center text-teal-400 mb-12">
        Welcome, {studentDetails.studentName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 p-6 rounded-2xl shadow-2xl text-center">
          <img
            src={studentDetails.avatar || 'https://i.pravatar.cc/150'}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white object-cover"
          />
          <h2 className="text-2xl font-semibold text-white">{studentDetails.studentName}</h2>
          <p className="text-white text-opacity-80 mt-1">{studentDetails.regNo}</p>
        </div>

        {/* Details Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-700 to-indigo-800 p-6 rounded-2xl shadow-2xl border-t-4 border-teal-400">
          <h3 className="text-xl font-semibold text-white mb-6 border-b pb-2 border-white">
            Student Details
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between border-b border-gray-400 pb-2">
              <span className="font-medium text-gray-200">Registration Number:</span>
              <span className="text-teal-300">{studentDetails.regNo}</span>
            </li>
            <li className="flex justify-between border-b border-gray-400 pb-2">
              <span className="font-medium text-gray-200">Points:</span>
              <span className="text-yellow-400 font-semibold">{studentDetails.points}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-gray-200">Enrolled Courses:</span>
              <span className="text-green-400">{studentDetails.course?.length || 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
