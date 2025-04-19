import axios from 'axios';

const API_URL = 'http://localhost:8080/api/chapters';

const chapterService = {
  getChapters: async (courseId) => {
    const response = await axios.get(`${API_URL}/course/${courseId}`);
    return response.data;
  },

  getChapterById: async (chapterId) => {
    const response = await axios.get(`${API_URL}/${chapterId}`);
    return response.data;
  },

  markCompleted: async (chapterId) => {
    const response = await axios.post(`${API_URL}/${chapterId}/complete`);
    return response.data;
  }
};

export default chapterService;