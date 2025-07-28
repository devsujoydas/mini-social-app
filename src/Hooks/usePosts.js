import { useEffect, useState } from 'react';
import { getPostsAPI } from '../services/postAPI';

export const usePosts = () => {
  const [postsData, setPostsData] = useState([]);
  const [usersPostsData, setUsersPostsData] = useState([]);

  useEffect(() => {
    getPostsAPI().then(data => {
      setPostsData(data);
      const email = localStorage.getItem("email");
      const filtered = data.filter(post => post.authorEmail === email);
      setUsersPostsData(filtered);
    });
  }, []);

  return { postsData, setPostsData, usersPostsData, setUsersPostsData };
};
