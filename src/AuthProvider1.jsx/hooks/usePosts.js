import { useQuery } from '@tanstack/react-query';
import * as postService from '../services/postService';

export const usePosts = () => {
  return useQuery(['posts'], () => postService.fetchPosts());
};

export const useUserPosts = (email) => {
  return useQuery(['userPosts', email], () => postService.fetchUserPosts(email), {
    enabled: !!email,
  });
};
