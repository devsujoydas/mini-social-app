import axios from './axiosInstance';

export const getUserProfileAPI = async (email) => {
  const res = await axios.get(`/profile/${email}`);
  return res.data;
};
export const logoutAPI = () => axios.post('/logout');
export const deleteProfileAPI = (email) => axios.delete(`/profile/delete/${email}`);
