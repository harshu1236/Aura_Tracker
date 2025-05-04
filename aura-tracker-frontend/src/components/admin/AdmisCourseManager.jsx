import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VALID_BRANCHES = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'BIO'];
const VALID_TYPES = ['BTECH', 'MASTERS', 'PHD'];

function AdminCourseManager() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseName: '',
    description: '',
    courseType: '',
    courseBranch: '',
    semester: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCourses = async () => {
    const res = await axios.get('http://localhost:1211/api/admin/all');
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:1211/api/admin/update/${editingId}`, form);
      } else {
        await axios.post('http://localhost:1211/api/admin/create', form);
      }
      setForm({ courseName: '', description: '', courseType: '', courseBranch: '', semester: '' });
      setEditingId(null);
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditingId(course.courseId);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this course?')) {
      await axios.delete(`http://localhost:1211/api/admin/delete/${id}`);
      fetchCourses();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6">{editingId ? 'Edit Course' : 'Create Course'}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <input className="p-2 rounded bg-gray-700 text-white" type="text" name="courseName" placeholder="Course Name" value={form.courseName} onChange={handleChange} required />
        <input className="p-2 rounded bg-gray-700 text-white" type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        
        <select name="courseType" value={form.courseType} onChange={handleChange} required className="p-2 rounded bg-gray-700 text-white">
          <option value="" disabled>Select Course Type</option>
          {VALID_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select name="courseBranch" value={form.courseBranch} onChange={handleChange} required className="p-2 rounded bg-gray-700 text-white">
          <option value="" disabled>Select Course Branch</option>
          {VALID_BRANCHES.map((branch) => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>

        <input className="p-2 rounded bg-gray-700 text-white" type="number" name="semester" placeholder="Semester" value={form.semester} onChange={handleChange} required />

        <button type="submit" className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 transition rounded py-2 mt-2 font-semibold">
          {editingId ? 'Update Course' : 'Create Course'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-10 mb-4">All Courses</h2>
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-md">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-700 text-white sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Branch</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Semester</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId} className="border-t border-gray-600 hover:bg-gray-700 transition">
                <td className="px-4 py-2">{course.courseId}</td>
                <td className="px-4 py-2">{course.courseName}</td>
                <td className="px-4 py-2">{course.courseBranch}</td>
                <td className="px-4 py-2">{course.courseType}</td>
                <td className="px-4 py-2">{course.semester}</td>
                <td className="px-4 py-2">{course.description}</td>
                <td className="px-4 py-2 flex gap-2 flex-wrap">
                  <button onClick={() => handleEdit(course)} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(course.courseId)} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCourseManager;
