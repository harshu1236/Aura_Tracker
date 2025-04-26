// aura-tracker-frontend/src/services/teacherService.js
import axios from 'axios';

const API_URL = 'http://localhost:1211/api/teacher';

const teacherService = {
  // Get teacher by ID
  getTeacherById: async (teacherId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${teacherId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Other Teacher-related API methods can go here
};

export default teacherService;
