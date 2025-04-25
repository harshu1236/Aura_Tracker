// src/components/course/CoursePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState({ courseName: '', description: '' });
  const [adding, setAdding] = useState(false);
  const [chapters, setChapters] = useState({});
  const [newChapters, setNewChapters] = useState({});

  const token = localStorage.getItem('token');
  const studentId = JSON.parse(localStorage.getItem('user'))?.studentId;

  const fetchStudentCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:1211/api/courses/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const courseList = response.data;
      setCourses(courseList);

      const chapterMap = {};
      for (const course of courseList) {
        const res = await axios.get(`http://localhost:1211/api/chapters/course/${course.courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        chapterMap[course.courseId] = res.data;
      }
      setChapters(chapterMap);
    } catch (error) {
      console.error('Error fetching courses/chapters:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async () => {
    if (!newCourse.courseName || !newCourse.description) {
      alert('Please fill in both fields.');
      return;
    }

    setAdding(true);
    try {
      await axios.post(`http://localhost:1211/api/courses/save/${studentId}`, newCourse, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCourse({ courseName: '', description: '' });
      fetchStudentCourses();
    } catch (error) {
      console.error('Error adding course:', error.response || error.message);
    } finally {
      setAdding(false);
    }
  };

  const handleNewChapterChange = (courseId, field, value) => {
    setNewChapters((prev) => ({
      ...prev,
      [courseId]: { ...prev[courseId], [field]: value },
    }));
  };

  const handleAddChapter = async (courseId) => {
    const chapter = newChapters[courseId];
    if (!chapter?.title || !chapter?.description) {
      alert('Please fill in both chapter fields.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:1211/api/chapters/add/${courseId}`,
        chapter,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewChapters((prev) => ({ ...prev, [courseId]: { title: '', description: '' } }));
      fetchStudentCourses();
    } catch (error) {
      console.error('Error adding chapter:', error.response || error.message);
    }
  };

  const handleMarkChapterComplete = async (chapterId) => {
    try {
      await axios.post(`http://localhost:1211/api/chapters/complete/${chapterId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudentCourses();
    } catch (error) {
      console.error('Error marking complete:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <p className="text-2xl font-medium animate-pulse">Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-teal-400">Your Courses</h1>

      {/* Add Course */}
      <div className="bg-gray-800 p-6 rounded-xl max-w-4xl mx-auto mb-10 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
            value={newCourse.courseName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
            value={newCourse.description}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={handleAddCourse}
          disabled={adding}
          className="mt-4 bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded font-semibold"
        >
          {adding ? 'Adding...' : 'Add Course'}
        </button>
      </div>

      {/* Courses List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.courseId} className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-teal-300 mb-1">{course.courseName}</h3>
            <p className="text-gray-300 text-sm mb-2">{course.description}</p>
            <span className="text-xs text-gray-500">ID: {course.courseId}</span>

            {/* Add Chapter Form */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Add Chapter</h4>
              <input
                type="text"
                placeholder="Title"
                className="w-full mb-2 px-3 py-2 rounded bg-gray-700 border border-gray-600"
                value={newChapters[course.courseId]?.title || ''}
                onChange={(e) =>
                  handleNewChapterChange(course.courseId, 'title', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full mb-2 px-3 py-2 rounded bg-gray-700 border border-gray-600"
                value={newChapters[course.courseId]?.description || ''}
                onChange={(e) =>
                  handleNewChapterChange(course.courseId, 'description', e.target.value)
                }
              />
              <button
                onClick={() => handleAddChapter(course.courseId)}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded"
              >
                Add Chapter
              </button>
            </div>

            {/* Chapters List */}
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2 text-gray-300">Chapters</h4>
              <ul className="space-y-1">
                {(chapters[course.courseId] || []).map((chapter) => (
                  <li key={chapter.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={chapter.completed}
                      onChange={() => handleMarkChapterComplete(chapter.id)}
                    />
                    <div>
                      <span
                        className={`${
                          chapter.completed ? 'line-through text-gray-400' : 'text-white'
                        } font-medium`}
                      >
                        {chapter.title}
                      </span>
                      <p className="text-sm text-gray-400">{chapter.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
