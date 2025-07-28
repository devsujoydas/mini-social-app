import { useEffect, useState } from 'react';
import { getUserProfileAPI } from '../services/authAPI';

export const useUserData = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (email) => {
    const data = await getUserProfileAPI(email);
    setUserData(data);
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) fetchUserData(email);
  }, []);

  return { userData, setUserData };
};
