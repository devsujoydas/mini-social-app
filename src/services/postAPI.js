import axios from './axiosInstance';

export const getPostsAPI = () => axios.get(`/posts`).then(res => res.data);
