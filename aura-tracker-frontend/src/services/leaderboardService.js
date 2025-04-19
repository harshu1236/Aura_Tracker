import axios from 'axios';

const API_URL = 'http://localhost:8080/api/leaderboard';

const leaderboardService = {
  getRankings: async () => {
    const response = await axios.get(`${API_URL}/rankings`);
    return response.data;
  },

  getStudentRank: async (studentId) => {
    const response = await axios.get(`${API_URL}/student/${studentId}`);
    return response.data;
  }
};

export default leaderboardService;