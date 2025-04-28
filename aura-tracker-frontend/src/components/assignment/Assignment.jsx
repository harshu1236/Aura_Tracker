import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    dueDate: '',
    courseId: '',
  });
  const [editAssignmentId, setEditAssignmentId] = useState(null);
  const [editAssignment, setEditAssignment] = useState({ title: '', dueDate: '' });
  const [adding, setAdding] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;
  const studentId = user?.studentId;
  const teacherId = user?.teacherId;

  const fetchAssignments = async () => {
    try {
      if (role === 'STUDENT') {
        const courseRes = await axios.get(`http://localhost:1211/api/courses/student/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const courseList = courseRes.data;
        setCourses(courseList);

        const allAssignments = [];
        for (const course of courseList) {
          const res = await axios.get(`http://localhost:1211/api/assignments/course/${course.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const assignmentsWithCourse = res.data.map((a) => ({
            ...a,
            courseName: course.courseName,
          }));
          allAssignments.push(...assignmentsWithCourse);
        }

        allAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        setAssignments(allAssignments);
      } else if (role === 'TEACHER') {
        const res = await axios.get(`http://localhost:1211/api/teacher/${teacherId}/assignments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sortedAssignments = res.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        setAssignments(sortedAssignments);

        const courseRes = await axios.get(`http://localhost:1211/api/teacher/${teacherId}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(courseRes.data);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error.response || error.message);
      toast.error('Failed to fetch assignments!');
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
      toast.warn('Please fill all fields.');
      return;
    }

    setAdding(true);
    try {
      if (role === 'TEACHER') {
        await axios.post(`http://localhost:1211/api/teacher/${courseId}/assignments`, {
          title,
          dueDate,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success('Assignment added successfully!');
      } else {
        toast.error('Students are not allowed to add assignments.');
        setAdding(false);
        return;
      }

      setNewAssignment({ title: '', dueDate: '', courseId: '' });
      fetchAssignments();
    } catch (error) {
      console.error('Error adding assignment:', error.response || error.message);
      toast.error('Failed to add assignment!');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteAssignment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) return;

    try {
      await axios.delete(`http://localhost:1211/api/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Assignment deleted!');
      setAssignments((prevAssignments) => prevAssignments.filter((assignment) => assignment.id !== id)); // Directly remove from UI
    } catch (error) {
      console.error('Error deleting assignment:', error.response || error.message);
      toast.error('Failed to delete assignment!');
    }
  };

  const startEditing = (assignment) => {
    setEditAssignmentId(assignment.id);
    setEditAssignment({ title: assignment.title, dueDate: assignment.dueDate });
  };

  const cancelEditing = () => {
    setEditAssignmentId(null);
    setEditAssignment({ title: '', dueDate: '' });
  };

  const handleEditChange = (e) => {
    setEditAssignment({ ...editAssignment, [e.target.name]: e.target.value });
  };

  const handleUpdateAssignment = async () => {
    try {
      await axios.put(`http://localhost:1211/api/assignments/${editAssignmentId}`, editAssignment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Assignment updated!');
      cancelEditing();
      fetchAssignments();
    } catch (error) {
      console.error('Error updating assignment:', error.response || error.message);
      toast.error('Failed to update assignment!');
    }
  };

  useEffect(() => {
    fetchAssignments();
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
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-400">
        {role === 'TEACHER' ? 'Assignments You Created' : 'Your Assignments'}
      </h1>

      {role === 'TEACHER' && (
        <motion.div 
          className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                <option key={course.id} value={course.id}>
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
        </motion.div>
      )}

      {assignments.length === 0 ? (
        <p className="text-center text-gray-400">No assignments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {assignments.map((assignment, index) => (
            <motion.div 
              key={assignment.id} 
              className="bg-gray-800 p-5 rounded-2xl shadow-lg relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {editAssignmentId === assignment.id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editAssignment.title}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white border border-gray-600"
                  />
                  <input
                    type="date"
                    name="dueDate"
                    value={editAssignment.dueDate}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white border border-gray-600"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleUpdateAssignment} className="bg-green-600 px-3 py-1 rounded text-white">Save</button>
                    <button onClick={cancelEditing} className="bg-red-600 px-3 py-1 rounded text-white">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-indigo-300">{assignment.title}</h3>
                  <p className="text-gray-400 mt-1">
                    <span className="font-medium text-teal-300">Course:</span> {assignment.courseName || (assignment.courses && assignment.courses.courseName)}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-yellow-400">Due Date:</span> {assignment.dueDate}
                  </p>
                  {role === 'TEACHER' && (
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => startEditing(assignment)} className="bg-blue-600 px-3 py-1 rounded text-white">Edit</button>
                      <button onClick={() => handleDeleteAssignment(assignment.id)} className="bg-red-600 px-3 py-1 rounded text-white">Delete</button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignment;
