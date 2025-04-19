// `aura-tracker-frontend/src/services/studentService.js`
import axios from 'axios';

const API_URL = 'http://localhost:1211/api/std';

const studentService = {
  getStudentById: async (studentId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default studentService;