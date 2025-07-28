import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as savedPostService from '../services/savedPostService';

export const useSavedPosts = (email) => {
  return useQuery(['savedPosts', email], () => savedPostService.fetchSavedPosts(email), {
    enabled: !!email,
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation(({ userId, postId }) => savedPostService.savePost(userId, postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['savedPosts']);
    },
  });
};

export const useRemoveSavedPost = () => {
  const queryClient = useQueryClient();

  return useMutation(({ userId, postId }) => savedPostService.removeSavedPost(userId, postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['savedPosts']);
    },
  });
};
