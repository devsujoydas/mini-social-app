import api from './api';

export const signUp = (email, password) => {
  return api.post('/signup', { email, password });
};

export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const logout = () => {
  return api.post('/logout');
};

// অন্যান্য auth related API কল এখানে যোগ করো
