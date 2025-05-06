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
      return user || null;
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      return null;
    }
  };

  const user = getUserFromStorage();
  const role = user?.role || '';
  const studentId = user?.studentId;
  const teacherId = user?.teacherId;

  const fetchCourses = async () => {
    if (!user || !role) return;

    try {
      setLoading(true);
      let response;

      if (role === 'STUDENT' && studentId) {
        response = await axios.get(`http://localhost:1211/api/std/${studentId}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (role === 'TEACHER' && teacherId) {
        response = await axios.get(`http://localhost:1211/api/teacher/${teacherId}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        return;
      }

      const courseList = response.data;
      setCourses(courseList);

      const chapterMap = {};
      await Promise.all(
        courseList.map(async (course) => {
          if (course?.id) {
            const res = await axios.get(`http://localhost:1211/api/chapters/course/${course.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            chapterMap[course.id] = res.data;
          }
        })
      );
      setChapters(chapterMap);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (courseId, field, value) => {
    setNewChapters((prev) => ({
      ...prev,
      [courseId]: {
        ...(prev[courseId] || {}),
        [field]: value,
      },
    }));
  };

  const handleAddChapter = async (courseId) => {
    const chapter = newChapters[courseId];
    if (!chapter?.title || !chapter?.description) {
      alert('Please fill in both Title and Description!');
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

      fetchCourses();
      localStorage.setItem('coursesUpdatedAt', Date.now());
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">My Courses</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
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

                {/* Only for Teacher */}
                {role === 'TEACHER' && (
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
                      onClick={() => handleAddChapter(course.id)}
                      className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition w-full"
                    >
                      Add Chapter
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No courses found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
