import { useEffect, useState } from 'react';
import { getAllFriendsAPI, getFriendRequestsAPI, getMyFriendsAPI, getSentRequestsAPI, getSuggestedFriendsAPI } from '../services/friendAPI';

export const useFriendLists = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [youMayKnowFriends, setYouMayKnowFriends] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    getAllFriendsAPI(email).then(setFriendsData);
    getMyFriendsAPI(email).then(setMyFriends);
    getSentRequestsAPI(email).then(setSentRequests);
    getFriendRequestsAPI(email).then(setFriendRequests);
    getSuggestedFriendsAPI(email).then(setYouMayKnowFriends);
  }, []);

  return {
    friendsData,
    myFriends,
    sentRequests,
    friendRequests,
    youMayKnowFriends
  };
};
