import axios from './axiosInstance';

export const addFriendAPI = (userId, friendId) => axios.put(`/addfriend`, { userId, friendId }).then(res => res.data);
export const unFriendAPI = (userId, friendId) => axios.put(`/unfriend`, { userId, friendId }).then(res => res.data);
export const confirmFriendAPI = (userId, friendId) => axios.put(`/confirmFriend`, { userId, friendId }).then(res => res.data);

export const getAllFriendsAPI = (email) => axios.get(`/allfriends?email=${email}`).then(res => res.data);
export const getMyFriendsAPI = (email) => axios.get(`/myfriends?email=${email}`).then(res => res.data);
export const getFriendRequestsAPI = (email) => axios.get(`/requests?email=${email}`).then(res => res.data);
export const getSentRequestsAPI = (email) => axios.get(`/sentrequest?email=${email}`).then(res => res.data);
export const getSuggestedFriendsAPI = (email) => axios.get(`/youMayKnow?email=${email}`).then(res => res.data);
