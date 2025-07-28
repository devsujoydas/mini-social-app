import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // headers, interceptors, etc. can be added here if needed
});

export default api;
