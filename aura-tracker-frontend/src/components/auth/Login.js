import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({ regNo: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (role === 'student') {
      setFormData({ regNo: '', password: '' });
    } else {
      setFormData({ email: '', password: '' });
    }
  }, [role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url =
        role === 'student'
          ? 'http://localhost:1211/api/auth/login'
          : 'http://localhost:1211/auth/teacher/login';

      const response = await axios.post(url, formData, { withCredentials: true });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        const userData = {
          ...(response.data.student || response.data.teacher),
          role: role.toUpperCase()  // 👈 Role bhi save ho raha hai ab
        };

        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/home', { replace: true });
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">Login</h2>

        {error && (
          <div className="bg-red-600 text-white text-sm rounded px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="role" className="block text-sm mb-1 text-gray-300">
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
            <div>
              <label htmlFor="regNo" className="block text-sm mb-1 text-gray-300">
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
          ) : (
            <div>
              <label htmlFor="email" className="block text-sm mb-1 text-gray-300">
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
          )}

          <div>
            <label htmlFor="password" className="block text-sm mb-1 text-gray-300">
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
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition duration-200 text-white font-semibold py-2 rounded"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full text-indigo-300 mt-2 hover:underline text-sm"
          >
            Don’t have an account? Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
