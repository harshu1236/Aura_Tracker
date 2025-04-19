

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1211/api', // Update this as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
