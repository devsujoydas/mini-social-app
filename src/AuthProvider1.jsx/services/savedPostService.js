import api from './api';

export const fetchSavedPosts = (email) => api.get(`/savedPosts?email=${email}`);

export const savePost = (userId, postId) =>
  api.put('/savePost', { userId, postId });

export const removeSavedPost = (userId, postId) =>
  api.put('/removeSavedPost', { userId, postId });
