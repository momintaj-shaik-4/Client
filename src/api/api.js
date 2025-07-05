import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-kbh2.onrender.com/api',
  withCredentials: true
});

export default api;
