import axios from 'axios';

const API_URL = 'http://localhost:8080/api/rewards';

const rewardService = {
  getRewards: async (studentId) => {
    const response = await axios.get(`${API_URL}/${studentId}`);
    return response.data;
  },

  unlockReward: async (rewardId) => {
    const response = await axios.post(`${API_URL}/unlock/${rewardId}`);
    return response.data;
  },

  createReward: async (reward) => {
    const response = await axios.post(`${API_URL}/create`, reward);
    return response.data;
  }
};

export default rewardService;