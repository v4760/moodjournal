import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://moodjournal-asuw.onrender.com/api',
  withCredentials: true,
});

export default axiosClient;
