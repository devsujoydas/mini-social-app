import toast from 'react-hot-toast';
import { addFriendAPI, unFriendAPI, confirmFriendAPI } from '../services/friendAPI';

export const useFriendActions = (userId) => {
  const addFriend = (friendId) => {
    addFriendAPI(userId, friendId).then(res => toast.success(res.message));
  };
  const unFriend = (friendId) => {
    unFriendAPI(userId, friendId).then(res => toast.success(res.message));
  };
  const confirmFriend = (friendId) => {
    confirmFriendAPI(userId, friendId).then(res => toast.success(res.message));
  };

  return { addFriend, unFriend, confirmFriend };
};
