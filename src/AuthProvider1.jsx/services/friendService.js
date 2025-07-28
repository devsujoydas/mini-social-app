import api from './api';

export const fetchMyFriends = (email) => api.get(`/myfriends?email=${email}`);

export const fetchFriendRequests = (email) => api.get(`/requests?email=${email}`);

export const fetchSentRequests = (email) => api.get(`/sentrequest?email=${email}`);

export const fetchYouMayKnowFriends = (email) => api.get(`/youMayKnow?email=${email}`);

export const addFriend = (userId, friendId) =>
  api.put('/addfriend', { userId, friendId });

export const unFriend = (userId, friendId) =>
  api.put('/unfriend', { userId, friendId });

export const confirmFriend = (userId, friendId) =>
  api.put('/confirmFriend', { userId, friendId });

export const cancelReceivedRequest = (userId, friendId) =>
  api.put('/cancelreceivedrequest', { userId, friendId });

export const cancelSentRequest = (userId, friendId) =>
  api.put('/cancelsentrequest', { userId, friendId });
