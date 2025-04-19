import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('studentId', response.data.studentId);
    }
    return response.data;
  },

  signup: async (user) => {
    const response = await axios.post(`${API_URL}/signup`, user);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('studentId');
  }
};

export default authService;