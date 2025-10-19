import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance"; 
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);
  const [usersPostsData, setUsersPostsData] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [friendsRequest, setFriendRequests] = useState([]);
  const [youMayKnowFriends, setYouMayKnowFriends] = useState([]);

  const [friendsData, setFriendsData] = useState([]);
  const [postsData, setPostsData] = useState([]);


  const addFriendBtnHanlder = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/addfriend`, data)
      .then((res) => {
        toast.success(res.data.message);

        if (res.data.message === "Request sent") {
          const remaining = youMayKnowFriends.filter(
            (fr) => fr._id !== friend._id
          );
          setYouMayKnowFriends(remaining);
          setSentRequests([...sentRequests, friend]);
        } else {
          const remainingSentRequests = sentRequests.filter(
            (fr) => fr._id !== friend._id
          );
          setSentRequests(remainingSentRequests);
          const remainingFriendsRequests = friendsRequest.filter(
            (fr) => fr._id !== friend._id
          );
          setFriendRequests(remainingFriendsRequests);
          setYouMayKnowFriends([...youMayKnowFriends, friend]);
        }
      })
      .catch((err) => console.error("Add friend failed:", err));
  };
  const unFriendBtnHanlder = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/unfriend`, data)
      .then((res) => {
        toast.success(res.data.message);
        if (res.data.message === "Unfriend successful") {
          const remainingMyFriend = myFriends.filter(
            (fr) => fr._id !== friend._id
          );
          setMyFriends(remainingMyFriend);
          setYouMayKnowFriends([...youMayKnowFriends, friend]);
        }
      })
      .catch((err) => console.error("Unfriend failed:", err));
  };
  const confrimFriendBtnHanlder = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/confirmFriend`, data)
      .then((res) => {
        toast.success(res.data.message);
        if (res.data.message == "Request accepted") {
          const remainingFriendsRequests = friendsRequest.filter(
            (fr) => fr._id !== friend._id
          );
          setFriendRequests(remainingFriendsRequests);
          setMyFriends([...myFriends, friend]);
        }
      })
      .catch((err) => console.error("Friend confirm failed:", err));
  };
  const cancelReceivedRequestBtnHandler = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/cancelreceivedrequest`, data)
      .then((res) => {
        toast.success(res.data.message);
        const remaining = friendsRequest.filter((fr) => fr._id !== friend._id);
        setFriendRequests(remaining);
        setYouMayKnowFriends([...youMayKnowFriends, friend]);
      })
      .catch((err) => console.error("Cancel received request failed:", err));
  };
  const cancelSentRequestBtnHandler = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/cancelsentrequest`, data)
      .then((res) => {
        toast.success(res.data.message);
        const remaining = sentRequests.filter((fr) => fr._id !== friend._id);
        setSentRequests(remaining);
        setYouMayKnowFriends([...youMayKnowFriends, friend]);
      })
      .catch((err) => console.error("Cancel sent request failed:", err));
  };
  const savePostHandler = (post) => {
    const data = { userId: userData._id, postId: post._id };
    axiosInstance
      .put(`/savePost`, data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => console.error("Friend confirm failed:", err));
  };
  const removeSavedPostHandler = (post) => {
    const data = { userId: userData._id, postId: post._id };
    axiosInstance
      .put(`/removeSavedPost`, data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => console.error("Friend confirm failed:", err));
  };

  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await axiosInstance.post(`/logout`, {});
      localStorage.removeItem("email");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  const deleteAccount = async () => {
    try {
      await deleteUser(user);
      await axiosInstance.delete(`/profile/delete/${user.email}`);

      localStorage.removeItem("email");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("filteredFriend");

      await signOut(auth);
      await axiosInstance.post(`/logout`);

      navigate("/login");
    } catch (error) {
      console.error("❌ Error deleting account:", error);
    }
  };




  useEffect(() => {
    let interval;

    const fetchUserData = async (currentUser) => {
      if (!currentUser?.email) {
        setUser(null);
        setUserData(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      const email = currentUser.email;
      localStorage.setItem("email", email);

      try {
        await axiosInstance.post("/jwt", { email });
        const userDataRes = await axiosInstance.get(`/profile?email=${email}`);
        setUserData(userDataRes.data);

        const [
          allUsersRes,
          myFriendsRes,
          sentReqRes,
          friendReqRes,
          youMayKnowRes,
          postsRes,
          usersPostsRes,
          savedPostsRes,
        ] = await Promise.all([
          axiosInstance.get(`/allUsers?userId=${userDataRes.data._id}`),
          axiosInstance.get(`/myfriends?userId=${userDataRes.data._id}`),
          axiosInstance.get(`/sentrequest?userId=${userDataRes.data._id}`),
          axiosInstance.get(`/requests?userId=${userDataRes.data._id}`),
          axiosInstance.get(`/youMayKnow?userId=${userDataRes.data._id}`),
          axiosInstance.get(`/posts`),
          axiosInstance.get(`/posts?authorId=${userDataRes.data._id}`),
          axiosInstance.get(`/savedPosts?userId=${userDataRes.data._id}`),
        ]);

        setFriendsData(allUsersRes.data);
        setMyFriends(myFriendsRes.data);
        setSentRequests(sentReqRes.data);
        setFriendRequests(friendReqRes.data);
        setYouMayKnowFriends(youMayKnowRes.data);
        setPostsData(postsRes.data);
        setUsersPostsData(usersPostsRes.data);
        setSavedPosts(savedPostsRes.data);
 

        const ping = async () => {
          try {
            await axiosInstance.post(`/activeStatus?userId=${userDataRes.data._id}`);
          } catch (err) {
            console.error("Active ping error:", err);
          }
        };
        ping();
        interval = setInterval(ping, 5000);
      } catch (err) {
        console.error("JWT / Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, fetchUserData);

    return () => {
      unsubscribe();
      if (interval) clearInterval(interval);
    };
  }, []);

  const dataList = {
    user,
    setUser,
    userData,
    setUserData,
    usersPostsData,
    setUsersPostsData,

    loading,
    setLoading,

    signUpUser,
    logInUser,
    signOutUser,
    signInWithGoogle,
    deleteAccount,

    addFriendBtnHanlder,
    unFriendBtnHanlder,
    confrimFriendBtnHanlder,

    postsData,
    setPostsData,

    savedPosts,
    setSavedPosts,
    savePostHandler,
    removeSavedPostHandler,

    friendsData,
    setFriendsData,
    myFriends,
    setMyFriends,
    friendsRequest,
    setFriendRequests,
    sentRequests,
    setSentRequests,
    youMayKnowFriends,
    setYouMayKnowFriends,
    cancelSentRequestBtnHandler,
    cancelReceivedRequestBtnHandler,


  };

  return (
    <AuthContext.Provider value={dataList}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;


