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
  const [adding, setAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentSubmissionFiles, setStudentSubmissionFiles] = useState({});
  const [submissionsByAssignment, setSubmissionsByAssignment] = useState({}); // New state for student submissions

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;
  const studentId = user?.studentId;
  const teacherId = user?.teacherId;

  // Fetch assignments + courses and for teachers, fetch student submissions
  const fetchAssignments = async () => {
    try {
      if (role === 'STUDENT') {
        const { data: courseList } = await axios.get(`http://localhost:1211/api/std/${studentId}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(courseList);

        const allAssignments = [];
        for (const course of courseList) {
          const { data: assignments } = await axios.get(`http://localhost:1211/api/std/${studentId}/courses/${course.courseId}/assignments`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const withCourse = assignments.map(a => ({ ...a, courseName: course.courseName }));
          allAssignments.push(...withCourse);
        }
        setAssignments(allAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
      } else if (role === 'TEACHER') {
        const [courseRes] = await Promise.all([
          axios.get(`http://localhost:1211/api/teacher/${teacherId}/courses`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const teacherCourses = courseRes.data;
        setCourses(teacherCourses);

        const allAssignments = [];
        for (const course of teacherCourses) {
          const { data: courseAssignments } = await axios.get(`http://localhost:1211/api/teacher/courses/${course.courseId}/assignments`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const withCourse = courseAssignments.map(a => ({ ...a, courseName: course.courseName }));
          allAssignments.push(...withCourse);
        }
        setAssignments(allAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));

        // Fetch student submissions for each assignment
        await fetchSubmissionsForAssignments(allAssignments);
      }
    } catch (err) {
      toast.error('Failed to load assignments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch submissions for assignments (for teacher)
  const fetchSubmissionsForAssignments = async (assignments) => {
    const allSubs = {};
    for (const assignment of assignments) {
      try {
        // Assuming assignment has "id" or "assignmentId"
        const assignmentId = assignment.id || assignment.assignmentId;
        const { data } = await axios.get(`http://localhost:1211/api/teacher/assignments/${assignmentId}/submissions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        allSubs[assignmentId] = data;
      } catch (err) {
        console.error(`Failed to load submissions for assignment ${assignment.assignmentId}`, err);
      }
    }
    setSubmissionsByAssignment(allSubs);
  };

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddAssignment = async () => {
    const { title, dueDate, courseId } = newAssignment;
    if (!title || !dueDate || !courseId || !assignmentFile) return toast.warn('All fields required');

    try {
      setAdding(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('dueDate', dueDate);
      formData.append('file', assignmentFile);

      await axios.post(`http://localhost:1211/api/teacher/${teacherId}/courses/${courseId}/assignments`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Assignment uploaded');
      setNewAssignment({ title: '', dueDate: '', courseId: '' });
      setAssignmentFile(null);
      fetchAssignments();
    } catch (err) {
      toast.error('Upload failed');
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const handleSubmitAnswer = async (assignmentId, file) => {
    if (!file) return toast.warn('Select file');
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post(`http://localhost:1211/api/std/${studentId}/assignments/${assignmentId}/submit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Submitted');
    } catch (err) {
      toast.error('Submission failed');
      console.error(err);
    }
  };

  const downloadFile = async (url) => {
    try {
      const endpoint = role === 'TEACHER'
        ? `http://localhost:1211/api/teacher/download-submission?fileUrl=${encodeURIComponent(url)}`
        : `http://localhost:1211/api/std/assignment-file?fileUrl=${encodeURIComponent(url)}`;

      const { data } = await axios.get(endpoint, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` },
      });

      const blob = new Blob([data]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = url.split('/').pop();
      link.click();
    } catch (err) {
      toast.error('Download failed');
      console.error(err);
    }
  };

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-indigo-400 mb-8">
        {role === 'TEACHER' ? 'Your Uploaded Assignments' : 'Your Assignments'}
      </h1>

      <input
        className="w-full max-w-lg mx-auto block mb-6 px-4 py-2 bg-gray-800 text-white rounded border border-gray-600"
        placeholder="Search by title or course..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {role === 'TEACHER' && (
        <div className="bg-gray-800 rounded-2xl p-6 mb-10 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-teal-300 mb-4">Add Assignment</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <input
              name="title"
              value={newAssignment.title}
              onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })}
              placeholder="Title"
              className="px-3 py-2 bg-gray-700 rounded text-white"
            />
            <input
              type="date"
              name="dueDate"
              value={newAssignment.dueDate}
              onChange={e => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
              className="px-3 py-2 bg-gray-700 rounded text-white"
            />
            <select
              name="courseId"
              value={newAssignment.courseId}
              onChange={e => setNewAssignment({ ...newAssignment, courseId: e.target.value })}
              className="px-3 py-2 bg-gray-700 rounded text-white"
            >
              <option value="">Select Course</option>
              {courses.map(c => <option key={c.courseId} value={c.courseId}>{c.courseName}</option>)}
            </select>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => setAssignmentFile(e.target.files[0])}
              className="text-white"
            />
          </div>
          <button
            onClick={handleAddAssignment}
            disabled={adding}
            className="mt-4 bg-indigo-600 px-6 py-2 rounded text-white"
          >
            {adding ? 'Uploading...' : 'Upload Assignment'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.filter(a =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (a.courseName && a.courseName.toLowerCase().includes(searchQuery.toLowerCase()))
        )
          .map((a, i) => {
            const assignmentId = a.id || a.assignmentId;
            return (
              <motion.div
                key={assignmentId}
                className="bg-gray-800 p-5 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-indigo-300">{a.title}</h3>
                <p className="text-sm text-gray-400">Course: {a.courseName}</p>
                <p className="text-sm text-yellow-400">Due: {a.dueDate}</p>

                <button
                  onClick={() => downloadFile(a.fileUrl)}
                  className="mt-2 text-sm text-teal-400 underline"
                >
                  Download Assignment
                </button>

                {role === 'STUDENT' && (
                  <>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="mt-3 text-white"
                      onChange={(e) => setStudentSubmissionFiles({ ...studentSubmissionFiles, [assignmentId]: e.target.files[0] })}
                    />
                    <button
                      onClick={() => handleSubmitAnswer(assignmentId, studentSubmissionFiles[assignmentId])}
                      className="mt-2 bg-green-600 px-3 py-1 rounded text-white"
                    >
                      Submit
                    </button>
                  </>
                )}

                {/* Teacher view: student submissions list with download */}
                {role === 'TEACHER' && submissionsByAssignment[assignmentId]?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-teal-300 mb-2">Student Submissions:</h4>
                    <ul className="space-y-2 max-h-48 overflow-auto">
                      {submissionsByAssignment[assignmentId].map(sub => (
                        <li
                          key={sub.submissionId}
                          className="flex justify-between items-center bg-gray-700 rounded px-3 py-1"
                        >
                          <span>{sub.studentName}</span>
                          <button
                            onClick={() => downloadFile(sub.fileUrl)}
                            className="text-sm text-indigo-400 underline"
                          >
                            Download
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default Assignment;
