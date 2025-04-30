// ... imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', courseId: '' });
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [editAssignmentId, setEditAssignmentId] = useState(null);
  const [editAssignment, setEditAssignment] = useState({ title: '', dueDate: '' });
  const [adding, setAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentSubmissionFiles, setStudentSubmissionFiles] = useState({});

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;
  const studentId = user?.studentId;
  const teacherId = user?.teacherId;

  const fetchAssignments = async () => {
    try {
      let courseList = [];
      if (role === 'STUDENT') {
        const res = await axios.get(`http://localhost:1211/api/courses/student/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        courseList = res.data;
        setCourses(courseList);

        const allAssignments = [];
        for (const course of courseList) {
          const res = await axios.get(`http://localhost:1211/api/assignments/course/${course.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const withCourse = res.data.map((a) => ({ ...a, courseName: course.courseName }));
          allAssignments.push(...withCourse);
        }
        setAssignments(allAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
      } else if (role === 'TEACHER') {
        const [assignmentRes, courseRes] = await Promise.all([
          axios.get(`http://localhost:1211/api/teacher/${teacherId}/assignments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:1211/api/teacher/${teacherId}/courses`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setAssignments(assignmentRes.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
        setCourses(courseRes.data);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error.response || error.message);
      toast.error('Failed to fetch assignments!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAssignments(); }, []);

  const handleInputChange = (e) => {
    setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
  };

  const handleAddAssignment = async () => {
    const { title, dueDate, courseId } = newAssignment;
    if (!title || !dueDate || !courseId) {
      toast.warn('Please fill all fields.');
      return;
    }
    if (!assignmentFile) {
      toast.warn('Please upload a file.');
      return;
    }

    setAdding(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('dueDate', dueDate);
      formData.append('file', assignmentFile);

      await axios.post(`http://localhost:1211/api/teacher/courses/${courseId}/assignments/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Assignment uploaded!');
      setNewAssignment({ title: '', dueDate: '', courseId: '' });
      setAssignmentFile(null);
      fetchAssignments();
    } catch (error) {
      console.error(error);
      toast.error('Upload failed.');
    } finally {
      setAdding(false);
    }
  };

  const handleSubmitAnswer = async (assignmentId, file) => {
    if (!file) {
      toast.warn('Please select a file to upload.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', file); // must match exactly with @RequestParam("file")
      formData.append('studentId', studentId);
  
      await axios.post(`http://localhost:1211/api/std/assignments/${assignmentId}/submit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Answer submitted!');
    } catch (error) {
      console.error(error);
      toast.error('Submission failed!');
    }
  };
  
  

  const handleDeleteAssignment = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:1211/api/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Deleted!');
      setAssignments(assignments.filter((a) => a.id !== id));
    } catch (error) {
      console.error(error);
      toast.error('Deletion failed!');
    }
  };

  const downloadFile = async (assignmentId, isSubmission = false) => {
    try {
      const url = isSubmission
        ? `http://localhost:1211/api/std/assignments/${assignmentId}/submission`
        : `http://localhost:1211/api/std/assignments/${assignmentId}/submissions`;

      const res = await axios.get(url, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` },
      });

      const blob = new Blob([res.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = isSubmission ? 'submission.pdf' : 'assignment.pdf';
      link.click();
    } catch (err) {
      toast.error('Download failed');
    }
  };

  if (loading) {
    return <div className="text-white text-center p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <ToastContainer />

      <h1 className="text-3xl font-bold text-center text-indigo-400 mb-8">
        {role === 'TEACHER' ? 'Assignments You Created' : 'Your Assignments'}
      </h1>

      {/* Search */}
      <input
        className="w-full max-w-lg mx-auto block mb-6 px-4 py-2 bg-gray-800 text-white rounded border border-gray-600"
        placeholder="Search by title or course..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Teacher Form */}
      {role === 'TEACHER' && (
        <div className="bg-gray-800 rounded-2xl p-6 mb-10 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-teal-300 mb-4">Add Assignment</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <input name="title" value={newAssignment.title} onChange={handleInputChange} placeholder="Title" className="px-3 py-2 bg-gray-700 rounded text-white" />
            <input type="date" name="dueDate" value={newAssignment.dueDate} onChange={handleInputChange} className="px-3 py-2 bg-gray-700 rounded text-white" />
            <select name="courseId" value={newAssignment.courseId} onChange={handleInputChange} className="px-3 py-2 bg-gray-700 rounded text-white">
              <option value="">Select Course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.courseName}</option>)}
            </select>
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setAssignmentFile(e.target.files[0])} className="text-white" />
          </div>
          <button onClick={handleAddAssignment} disabled={adding} className="mt-4 bg-indigo-600 px-6 py-2 rounded text-white">
            {adding ? 'Uploading...' : 'Upload Assignment'}
          </button>
        </div>
      )}

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments
          .filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || (a.courseName && a.courseName.toLowerCase().includes(searchQuery.toLowerCase())))
          .map((a, i) => (
            <motion.div key={a.id} className="bg-gray-800 p-5 rounded-xl shadow-lg" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <h3 className="text-lg font-semibold text-indigo-300">{a.title}</h3>
              <p className="text-sm text-gray-400">Course: {a.courseName}</p>
              <p className="text-sm text-yellow-400">Due: {a.dueDate}</p>

              <button onClick={() => downloadFile(a.id)} className="mt-2 text-sm text-teal-400 underline">Download Assignment</button>

              {role === 'TEACHER' && (
                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleDeleteAssignment(a.id)} className="bg-red-600 px-3 py-1 rounded">Delete</button>
                </div>
              )}

              {role === 'STUDENT' && (
                <>
                  <input type="file" accept=".pdf,.doc,.docx" className="mt-3 text-white" onChange={(e) => setStudentSubmissionFiles({ ...studentSubmissionFiles, [a.id]: e.target.files[0] })} />
                  <button onClick={() => handleSubmitAnswer(a.id, studentSubmissionFiles[a.id])} className="mt-2 bg-green-600 px-3 py-1 rounded text-white">Submit</button>
                  <button onClick={() => downloadFile(a.id, true)} className="mt-2 ml-2 text-sm text-blue-400 underline">Download My Submission</button>
                </>
              )}
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Assignment;
