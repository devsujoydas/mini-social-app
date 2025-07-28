import api from './api';

export const fetchPosts = () => api.get('/posts');

export const fetchUserPosts = (email) => api.get(`/posts?authorEmail=${email}`);
