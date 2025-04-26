import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';
import teacherService from '../../services/teacherService';

function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const studentId = JSON.parse(localStorage.getItem('user'))?.studentId;
        const teacherId = JSON.parse(localStorage.getItem('user'))?.teacherId;
        
        if (studentId) {
          setIsStudent(true);
          const data = await studentService.getStudentById(studentId);
          setUserDetails(data);
        } else if (teacherId) {
          setIsStudent(false);
          const data = await teacherService.getTeacherById(teacherId);
          setUserDetails(data);
        } else {
          console.error('User ID not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user details:', error.response || error.message);
      }
    };

    fetchUserDetails();
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
      {isStudent ? (
        <>
          <h1 className="text-4xl font-bold text-center text-teal-400 mb-12">
            Welcome, {userDetails.studentName}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Profile Card */}
            <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 p-6 rounded-2xl shadow-2xl text-center">
              <img
                src={userDetails.avatar || 'https://i.pravatar.cc/150'}
                alt="Avatar"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white object-cover"
              />
              <h2 className="text-2xl font-semibold text-white">{userDetails.studentName}</h2>
              <p className="text-white text-opacity-80 mt-1">{userDetails.regNo}</p>
            </div>

            {/* Details Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-700 to-indigo-800 p-6 rounded-2xl shadow-2xl border-t-4 border-teal-400">
              <h3 className="text-xl font-semibold text-white mb-6 border-b pb-2 border-white">
                Student Details
              </h3>
              <ul className="space-y-4">
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
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center text-teal-400 mb-12">
            Welcome, {userDetails.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Profile Card */}
            <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 p-6 rounded-2xl shadow-2xl text-center">
              <img
                src={userDetails.avatar || 'https://i.pravatar.cc/150'}
                alt="Avatar"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white object-cover"
              />
              <h2 className="text-2xl font-semibold text-white">{userDetails.name}</h2>
              <p className="text-white text-opacity-80 mt-1">{userDetails.email}</p>
            </div>

            {/* Teacher Details */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-700 to-indigo-800 p-6 rounded-2xl shadow-2xl border-t-4 border-teal-400">
              <h3 className="text-xl font-semibold text-white mb-6 border-b pb-2 border-white">
                Teacher Details
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="font-medium text-gray-200">Email:</span>
                  <span className="text-teal-300">{userDetails.email}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-200">Courses:</span>
                  <span className="text-green-400">{userDetails.courses?.length || 0}</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
