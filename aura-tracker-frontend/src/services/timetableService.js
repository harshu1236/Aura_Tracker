import axios from 'axios';

const API_URL = 'http://localhost:8080/api/timetable';

const timetableService = {
  getTimetableByDay: async (day) => {
    const response = await axios.get(`${API_URL}/${day}`);
    return response.data;
  },

  addTimetableEntry: async (timetable) => {
    const response = await axios.post(API_URL, timetable);
    return response.data;
  }
};

export default timetableService;