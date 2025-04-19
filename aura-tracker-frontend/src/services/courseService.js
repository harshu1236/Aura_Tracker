import axios from 'axios';

const API_URL = 'http://localhost:8080/api/courses';

const courseService = {
  getCourses: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getCourseById: async (courseId) => {
    const response = await axios.get(`${API_URL}/${courseId}`);
    return response.data;
  },

  enrollCourse: async (courseId) => {
    const response = await axios.post(`${API_URL}/${courseId}/enroll`);
    return response.data;
  }
};

export default courseService;