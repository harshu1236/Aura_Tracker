import axios from 'axios';

const API_URL = 'http://localhost:8080/api/assignments';

const assignmentService = {
  getAssignments: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getAssignmentById: async (assignmentId) => {
    const response = await axios.get(`${API_URL}/${assignmentId}`);
    return response.data;
  },

  createAssignment: async (assignment) => {
    const response = await axios.post(API_URL, assignment);
    return response.data;
  },

  submitAssignment: async (assignmentId, submission) => {
    const response = await axios.post(`${API_URL}/${assignmentId}/submit`, submission);
    return response.data;
  }
};

export default assignmentService;