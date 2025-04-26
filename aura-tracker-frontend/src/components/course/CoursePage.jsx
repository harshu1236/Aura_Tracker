import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState({});
  const [newChapters, setNewChapters] = useState({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const getUserFromStorage = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user;
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      return null;
    }
  };

  const user = getUserFromStorage();
  const studentId = user?.studentId;

  const fetchStudentCourses = async () => {
    if (!studentId) {
      console.error('No studentId found, cannot fetch courses.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:1211/api/courses/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const courseList = response.data;
      setCourses(courseList);

      const chapterMap = {};
      for (const course of courseList) {
        if (!course.id) {  // 🔥 CHANGED from course.courseId to course.id
          console.error('No id found for course', course);
          continue;
        }
        const res = await axios.get(`http://localhost:1211/api/chapters/course/${course.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        chapterMap[course.id] = res.data;
      }
      setChapters(chapterMap);
    } catch (error) {
      console.error('Error fetching courses/chapters:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  const handleInputChange = (courseId, field, value) => {
    setNewChapters((prev) => ({
      ...prev,
      [courseId]: {
        ...(prev[courseId] || {}), // 🛡️ Protect if no previous data
        [field]: value,
      },
    }));
  };

  const handleAddChapter = async (courseId) => {
    if (!courseId) {
      console.error('No courseId provided, cannot add chapter.');
      return;
    }
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
      setNewChapters((prev) => ({
        ...prev,
        [courseId]: { title: '', description: '' },
      }));
      fetchStudentCourses();
    } catch (error) {
      console.error('Error adding chapter:', error.response || error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">My Courses</h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-4">{course.courseName}</h2>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Chapters:</h3>
              <ul className="list-disc list-inside mb-4">
                {chapters[course.id]?.map((chapter) => (
                  <li key={chapter.chapterId}>
                    <strong>{chapter.title}</strong>: {chapter.description}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Chapter Title"
                  className="border p-2 rounded w-full mb-2"
                  value={newChapters[course.id]?.title || ''}
                  onChange={(e) => handleInputChange(course.id, 'title', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Chapter Description"
                  className="border p-2 rounded w-full mb-2"
                  value={newChapters[course.id]?.description || ''}
                  onChange={(e) => handleInputChange(course.id, 'description', e.target.value)}
                />
                <button
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                  onClick={() => handleAddChapter(course.id)}
                >
                  Add Chapter
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
