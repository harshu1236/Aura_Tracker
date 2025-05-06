import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    regNo: '',
    studentName: '',
    password: '',
    courseType: '',
    courseBranch: '',
    semester: '',
    name: '',
    email: '',
  });

  const [courseData, setCourseData] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);

  // Fetch course options for both student and teacher
  useEffect(() => {
    axios
      .get('http://localhost:1211/api/public/available-course-options')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCourseData(res.data);
        } else {
          console.error('Invalid course options format:', res.data);
          setCourseData([]);
        }
      })
      .catch((err) => {
        console.error('API error:', err);
        setCourseData([]);
      });
  }, []);

  // Update filtered branches on courseType change
  useEffect(() => {
    if (formData.courseType) {
      const branches = [
        ...new Set(
          courseData
            .filter((c) => c.type === formData.courseType)
            .map((c) => c.branch)
        ),
      ];
      setFilteredBranches(branches);
      setFilteredSemesters([]);
      setFormData((prev) => ({
        ...prev,
        courseBranch: '',
        semester: '',
      }));
    }
  }, [formData.courseType, courseData]);

  // Update filtered semesters on branch change
  useEffect(() => {
    if (formData.courseType && formData.courseBranch) {
      const semesters = [
        ...new Set(
          courseData
            .filter(
              (c) =>
                c.type === formData.courseType &&
                c.branch === formData.courseBranch
            )
            .map((c) => c.semester)
        ),
      ].sort((a, b) => a - b);
      setFilteredSemesters(semesters);
      setFormData((prev) => ({ ...prev, semester: '' }));
    }
  }, [formData.courseBranch, formData.courseType, courseData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      semester: parseInt(formData.semester),
    };

    try {
      const url =
        role === 'student'
          ? 'http://localhost:1211/api/auth/signup'
          : 'http://localhost:1211/auth/teacher/signup';

      const res = await axios.post(url, payload);
      console.log('Signup successful:', res.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
    }
  };

  const uniqueCourseTypes = [...new Set(courseData.map((c) => c.type))];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="text-white block mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* Common Fields */}
          {role === 'student' ? (
            <>
              <input
                name="regNo"
                placeholder="Registration Number"
                value={formData.regNo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
              />
              <input
                name="studentName"
                placeholder="Full Name"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
              />
            </>
          ) : (
            <>
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
              />
            </>
          )}

          {/* Course Type */}
          <select
            name="courseType"
            value={formData.courseType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
          >
            <option value="">Select Course Type</option>
            {uniqueCourseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Course Branch */}
          <select
            name="courseBranch"
            value={formData.courseBranch}
            onChange={handleChange}
            disabled={!filteredBranches.length}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
          >
            <option value="">Select Branch</option>
            {filteredBranches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>

          {/* Semester */}
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            disabled={!filteredSemesters.length}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
          >
            <option value="">Select Semester</option>
            {filteredSemesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded font-semibold"
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
