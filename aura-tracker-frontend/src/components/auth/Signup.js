import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    regNo: '',
    studentName: '',
    password: '',
    courseType: 'BTECH', // Default course type for student
    semester: '',
    course: '', // List of courses or a single course as a string
  });

  useEffect(() => {
    if (role === 'student') {
      setFormData({
        regNo: '',
        studentName: '',
        password: '',
        courseType: 'BTECH',
        semester: '',
        course: '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        role === 'student'
          ? 'http://localhost:1211/api/auth/signup'
          : 'http://localhost:1211/auth/teacher/signup';

      const payload = formData;

      const response = await axios.post(url, payload);
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="role" className="block text-sm text-gray-300 mb-1">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {role === 'student' ? (
            <>
              <div>
                <label htmlFor="regNo" className="block text-sm text-gray-300 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  id="regNo"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="studentName" className="block text-sm text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="courseType" className="block text-sm text-gray-300 mb-1">
                  Course Type
                </label>
                <select
                  id="courseType"
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="BTECH">BTECH</option>
                  <option value="MASTERS">MASTERS</option>
                  <option value="PHD">PHD</option>
                </select>
              </div>

              <div>
                <label htmlFor="semester" className="block text-sm text-gray-300 mb-1">
                  Semester
                </label>
                <input
                  type="number"
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="course" className="block text-sm text-gray-300 mb-1">
                  Course
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded font-semibold transition duration-200"
          >
            Sign Up
          </button>
          <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full text-indigo-300 mt-2 hover:underline text-sm"
            >
              Don’t have an account? Log In
            </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
