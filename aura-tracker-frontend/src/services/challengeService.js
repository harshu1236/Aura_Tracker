import axios from 'axios';

const API_URL = 'http://localhost:8080/api/challenges';

const challengeService = {
  getChallenges: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  acceptChallenge: async (challengeId) => {
    const response = await axios.post(`${API_URL}/${challengeId}/accept`);
    return response.data;
  }
};

export default challengeService;