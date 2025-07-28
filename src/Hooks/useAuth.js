import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';

import { getUserProfileAPI, logoutAPI, deleteProfileAPI } from '../services/authAPI';
import auth from '../Firebase/firebase.config';

const provider = new GoogleAuthProvider();

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email) {
        const email = currentUser.email;
        localStorage.setItem("email", email);
        const profile = await getUserProfileAPI(email);
        setUserData(profile);
        localStorage.setItem("currentUser", JSON.stringify(profile));
      }
    });
    return () => unsubscribe();
  }, []);

  const signUpUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signInWithGoogle = () => signInWithPopup(auth, provider);
  const signOutUser = async () => {
    await signOut(auth);
    await logoutAPI();
    localStorage.clear();
  };
  const deleteAccount = async () => {
    if (!user?.email) return;
    await deleteUser(user);
    await deleteProfileAPI(user.email);
    await signOutUser();
  };

  return {
    user,
    userData,
    loading,
    setUser,
    setUserData,
    signUpUser,
    logInUser,
    signInWithGoogle,
    signOutUser,
    deleteAccount
  };
};
