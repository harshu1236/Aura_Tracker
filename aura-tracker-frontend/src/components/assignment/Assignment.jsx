// src/components/assignment/Assignment.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    dueDate: '',
    courseId: '',
  });
  const [adding, setAdding] = useState(false);

  const token = localStorage.getItem('token');
  const student = JSON.parse(localStorage.getItem('user'));
  const studentId = student?.studentId;

  const fetchAssignmentsForStudent = async () => {
    try {
      const courseRes = await axios.get(`http://localhost:1211/api/courses/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const courseList = courseRes.data;
      setCourses(courseList);

      const allAssignments = [];
      for (const course of courseList) {
        const res = await axios.get(`http://localhost:1211/api/assignments/course/${course.courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const assignmentsWithCourse = res.data.map((a) => ({
          ...a,
          courseName: course.courseName,
        }));
        allAssignments.push(...assignmentsWithCourse);
      }

      setAssignments(allAssignments);
    } catch (error) {
      console.error('Error fetching assignments:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
  };

  const handleAddAssignment = async () => {
    const { title, dueDate, courseId } = newAssignment;

    if (!title || !dueDate || !courseId) {
      alert('Please fill all fields.');
      return;
    }

    setAdding(true);
    try {
      await axios.post(`http://localhost:1211/api/assignments/save/${courseId}`, {
        title,
        dueDate,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNewAssignment({ title: '', dueDate: '', courseId: '' });
      fetchAssignmentsForStudent();
    } catch (error) {
      console.error('Error adding assignment:', error.response || error.message);
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    fetchAssignmentsForStudent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-400">
        Your Assignments
      </h1>

      {/* Add Assignment Form */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-xl mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-teal-400">Add New Assignment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newAssignment.title}
            onChange={handleInputChange}
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <input
            type="date"
            name="dueDate"
            value={newAssignment.dueDate}
            onChange={handleInputChange}
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <select
            name="courseId"
            value={newAssignment.courseId}
            onChange={handleInputChange}
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
          >
            <option value="" disabled>Select Course</option>
            {courses.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddAssignment}
          disabled={adding}
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 px-6 py-2 text-white rounded font-semibold"
        >
          {adding ? 'Adding...' : 'Add Assignment'}
        </button>
      </div>

      {/* Assignment Cards */}
      {assignments.length === 0 ? (
        <p className="text-center text-gray-400">No assignments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-gray-800 p-5 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-indigo-300">{assignment.title}</h3>
              <p className="text-gray-400 mt-1">
                <span className="font-medium text-teal-300">Course:</span> {assignment.courseName}
              </p>
              <p className="text-gray-400">
                <span className="font-medium text-yellow-400">Due Date:</span> {assignment.dueDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignment;
