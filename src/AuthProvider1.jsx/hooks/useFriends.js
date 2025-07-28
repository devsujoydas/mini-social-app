import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as friendService from '../services/friendService';

export const useMyFriends = (email) => {
  return useQuery(['myFriends', email], () => friendService.fetchMyFriends(email), {
    enabled: !!email,
  });
};

export const useFriendRequests = (email) => {
  return useQuery(['friendRequests', email], () => friendService.fetchFriendRequests(email), {
    enabled: !!email,
  });
};

export const useSentRequests = (email) => {
  return useQuery(['sentRequests', email], () => friendService.fetchSentRequests(email), {
    enabled: !!email,
  });
};

export const useYouMayKnowFriends = (email) => {
  return useQuery(['youMayKnowFriends', email], () => friendService.fetchYouMayKnowFriends(email), {
    enabled: !!email,
  });
};

export const useAddFriend = () => {
  const queryClient = useQueryClient();

  return useMutation(({ userId, friendId }) => friendService.addFriend(userId, friendId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['myFriends']);
      queryClient.invalidateQueries(['youMayKnowFriends']);
      queryClient.invalidateQueries(['sentRequests']);
    },
  });
};

export const useUnFriend = () => {
  const queryClient = useQueryClient();

  return useMutation(({ userId, friendId }) => friendService.unFriend(userId, friendId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['myFriends']);
      queryClient.invalidateQueries(['youMayKnowFriends']);
    },
  });
};

export const useConfirmFriend = () => {
  const queryClient = useQueryClient();

  return useMutation(({ userId, friendId }) => friendService.confirmFriend(userId, friendId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['friendRequests']);
      queryClient.invalidateQueries(['myFriends']);
    },
  });
};

export const useCancelReceivedRequest = () => {
  const queryClient = useQueryClient();

  return useMutation(({ userId, friendId }) => friendService.cancelReceivedRequest(userId, friendId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['friendRequests']);
      queryClient.invalidateQueries(['youMayKnowFriends']);
    },
  });
};

export const useCancelSentRequest = () => {
  const queryClient = useQueryClient();

  return useMutation(({ userId, friendId }) => friendService.cancelSentRequest(userId, friendId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['sentRequests']);
      queryClient.invalidateQueries(['youMayKnowFriends']);
    },
  });
};
