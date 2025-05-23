import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';
import teacherService from '../../services/teacherService';

function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [role, setRole] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { role: userRole, studentId, teacherId, name, email } = user || {};
      setRole(userRole);

      if (userRole === 'STUDENT' && studentId) {
        const data = await studentService.getStudentById(studentId);
        setUserDetails(data);
      } else if (userRole === 'TEACHER' && teacherId) {
        const data = await teacherService.getTeacherById(teacherId);
        setUserDetails(data);
      } else if (userRole === 'ADMIN') {
        // Set minimal admin details directly from localStorage
        setUserDetails({ name, email });
      } else {
        console.error('Invalid user role or ID');
      }
    } catch (error) {
      console.error('Error fetching user details:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [updateTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedTimestamp = localStorage.getItem('coursesUpdatedAt');
      if (storedTimestamp) {
        setUpdateTrigger(Number(storedTimestamp));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-lg text-gray-300 animate-pulse">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <h1 className="text-4xl font-bold text-center text-teal-400 mb-12">
        Welcome, {userDetails.name || userDetails.studentName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 p-6 rounded-2xl shadow-2xl text-center">
          <img
            src={userDetails.avatar || 'https://i.pravatar.cc/150'}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white object-cover"
          />
          <h2 className="text-2xl font-semibold text-white">
            {userDetails.name || userDetails.studentName}
          </h2>
          <p className="text-white text-opacity-80 mt-1">
            {userDetails.email || userDetails.regNo || 'Administrator'}
          </p>
        </div>

        {/* Details Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-700 to-indigo-800 p-6 rounded-2xl shadow-2xl border-t-4 border-teal-400">
          <h3 className="text-xl font-semibold text-white mb-6 border-b pb-2 border-white">
            {role === 'STUDENT' ? 'Student Details' : role === 'TEACHER' ? 'Teacher Details' : 'Admin Panel'}
          </h3>
          <ul className="space-y-4">
            {role === 'STUDENT' && (
              <>
                <li className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="font-medium text-gray-200">Registration Number:</span>
                  <span className="text-teal-300">{userDetails.regNo}</span>
                </li>
                <li className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="font-medium text-gray-200">Points:</span>
                  <span className="text-yellow-400 font-semibold">{userDetails.points}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-200">Enrolled Courses:</span>
                  <span className="text-green-400">{userDetails.course?.length || 0}</span>
                </li>
              </>
            )}
            {role === 'TEACHER' && (
              <>
                <li className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="font-medium text-gray-200">Email:</span>
                  <span className="text-teal-300">{userDetails.email}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-200">Courses:</span>
                  <span className="text-green-400">{userDetails.courses?.length || 0}</span>
                </li>
              </>
            )}
            {role === 'ADMIN' && (
              <>
                <li className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="font-medium text-gray-200">Email:</span>
                  <span className="text-teal-300">{userDetails.email}</span>
                </li>
                <li className="text-gray-200">
                  You have administrative privileges. You can manage users, courses, and monitor system activity.
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
