import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate()
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
        console.log(res.data.message);

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
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      // Step 1: Delete Firebase Auth user
      await deleteUser(user);

      // Step 2: Call backend to delete all related data
      const res = await axiosInstance.delete(`/profile/delete/${user.email}`);
      console.log("✅ Account & all data deleted:", res.data);

      // Step 3: Clear localStorage
      localStorage.removeItem("email");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("filteredFriend");

      // Step 4: Logout from Firebase and backend
      await signOut(auth);
      await axiosInstance.post(`/logout`);

      // Step 5: Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("❌ Error deleting account:", error);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
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
        // ১. JWT generate
        await axiosInstance.post("/jwt", { email });

        // ২. Parallel API calls
        const [
          profileRes,
          [friendsDataRes, myFriendsRes, sentReqRes, reqRes, youMayKnowRes],
          postsRes, savedPostsRes,
        ] = await Promise.all([
          axiosInstance.get(`/profile/${email}`),
          Promise.all([
            axiosInstance.get(`/allUsers?email=${email}`),
            axiosInstance.get(`/myfriends?email=${email}`),
            axiosInstance.get(`/sentrequest?email=${email}`),
            axiosInstance.get(`/requests?email=${email}`),
            axiosInstance.get(`/youMayKnow?email=${email}`),
          ]),
          axiosInstance.get("/posts"),
          axiosInstance.get(`/savedPosts?email=${email}`),
        ]);

        // ৩. Set all states
        const profileData = profileRes.data;
        setUserData(profileData);
        localStorage.setItem("currentUser", JSON.stringify(profileData));

        setFriendsData(friendsDataRes.data);
        setMyFriends(myFriendsRes.data);
        setSentRequests(sentReqRes.data);
        setFriendRequests(reqRes.data);
        setYouMayKnowFriends(youMayKnowRes.data);

        setPostsData(postsRes.data);
        setUsersPostsData(
          postsRes.data.filter((post) => post.authorEmail === email)
        );
        setSavedPosts(savedPostsRes.data);

        // ৪. Active ping interval
        const ping = async () => {
          try {
            await axiosInstance.post(`/activeStatus?email=${email}`);
          } catch (err) {
            console.error("Active ping error:", err);
          }
        };

        ping(); // প্রথমবার ping
        const interval = setInterval(ping, 2000);

        // ৫. Loading complete
        setLoading(false);

        // Cleanup interval on unmount or user change
        return () => clearInterval(interval);
      } catch (err) {
        console.error("JWT / Data fetch error:", err);
        setLoading(false);
      }
    });

    // Cleanup listener on unmount
    return () => unSubscribe();
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
    savedPosts,
    setSavedPosts,
    savePostHandler,
    removeSavedPostHandler,
  };

  return (
    <AuthContext.Provider value={dataList}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// import { createContext, useEffect, useState } from 'react'
// import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, EmailAuthProvider, linkWithCredential } from 'firebase/auth'
// import auth from '../Firebase/firebase.config'
// import toast from 'react-hot-toast';
// import axiosInstance from '../services/axiosInstance';
// export const AuthContext = createContext()

// const AuthProvider = ({ children }) => {

//     const [loading, setLoading] = useState(true)

//     const [user, setUser] = useState({})
//     const [userData, setUserData] = useState({})
//     const [savedPosts, setSavedPosts] = useState([])
//     const [usersPostsData, setUsersPostsData] = useState([])
//     const [myFriends, setMyFriends] = useState([])
//     const [sentRequests, setSentRequests] = useState([])
//     const [friendsRequest, setFriendRequests] = useState([])
//     const [youMayKnowFriends, setYouMayKnowFriends] = useState([])
//     const [friendsData, setFriendsData] = useState([])
//     const [postsData, setPostsData] = useState([])

//     const addFriendBtnHanlder = (friend) => {
//         const data = { userId: userData._id, friendId: friend._id }
//         axiosInstance.put(`/addfriend`, data)
//             .then(res => {
//                 toast.success(res.data.message)
//                 console.log(res.data.message)

//                 if (res.data.message === "Request sent") {
//                     const remaining = youMayKnowFriends.filter(fr => fr._id !== friend._id)
//                     setYouMayKnowFriends(remaining);
//                     setSentRequests([...sentRequests, friend])
//                 }
//                 else {
//                     const remainingSentRequests = sentRequests.filter(fr => fr._id !== friend._id)
//                     setSentRequests(remainingSentRequests);
//                     const remainingFriendsRequests = friendsRequest.filter(fr => fr._id !== friend._id)
//                     setFriendRequests(remainingFriendsRequests);;
//                     setYouMayKnowFriends([...youMayKnowFriends, friend])
//                 }
//             })
//             .catch(err => console.error("Add friend failed:", err));
//     }
//     const unFriendBtnHanlder = (friend) => {
//         const data = { userId: userData._id, friendId: friend._id }
//         axiosInstance.put(`/unfriend`, data)
//             .then(res => {
//                 toast.success(res.data.message)
//                 if (res.data.message === "Unfriend successful") {
//                     const remainingMyFriend = myFriends.filter(fr => fr._id !== friend._id)
//                     setMyFriends(remainingMyFriend)
//                     setYouMayKnowFriends([...youMayKnowFriends, friend])
//                 }
//             })
//             .catch(err => console.error("Unfriend failed:", err));
//     }
//     const confrimFriendBtnHanlder = (friend) => {
//         const data = { userId: userData._id, friendId: friend._id }
//         axiosInstance.put(`/confirmFriend`, data)
//             .then(res => {
//                 toast.success(res.data.message)
//                 if (res.data.message == "Request accepted") {
//                     const remainingFriendsRequests = friendsRequest.filter(fr => fr._id !== friend._id)
//                     setFriendRequests(remainingFriendsRequests)
//                     setMyFriends([...myFriends, friend])
//                 }
//             })
//             .catch(err => console.error("Friend confirm failed:", err));

//     }
//     const cancelReceivedRequestBtnHandler = (friend) => {
//         const data = { userId: userData._id, friendId: friend._id };
//         axiosInstance.put(`/cancelreceivedrequest`, data)
//             .then(res => {
//                 toast.success(res.data.message);
//                 const remaining = friendsRequest.filter(fr => fr._id !== friend._id);
//                 setFriendRequests(remaining);
//                 setYouMayKnowFriends([...youMayKnowFriends, friend]);
//             })
//             .catch(err => console.error("Cancel received request failed:", err));
//     }
//     const cancelSentRequestBtnHandler = (friend) => {
//         const data = { userId: userData._id, friendId: friend._id };
//         axiosInstance.put(`/cancelsentrequest`, data)
//             .then(res => {
//                 toast.success(res.data.message);
//                 const remaining = sentRequests.filter(fr => fr._id !== friend._id);
//                 setSentRequests(remaining);
//                 setYouMayKnowFriends([...youMayKnowFriends, friend]);
//             })
//             .catch(err => console.error("Cancel sent request failed:", err));
//     }
//     const savePostHandler = (post) => {
//         const data = { userId: userData._id, postId: post._id }
//         axiosInstance.put(`/savePost`, data)
//             .then(res => {
//                 toast.success(res.data.message)
//             })
//             .catch(err => console.error("Friend confirm failed:", err));

//     }
//     const removeSavedPostHandler = (post) => {
//         const data = { userId: userData._id, postId: post._id }
//         axiosInstance.put(`/removeSavedPost`, data)
//             .then(res => {
//                 toast.success(res.data.message)
//             })
//             .catch(err => console.error("Friend confirm failed:", err));

//     }

//     const signUpUser = (email, password) => {
//         setLoading(true)
//         return createUserWithEmailAndPassword(auth, email, password)
//     }
//     const logInUser = (email, password) => {
//         setLoading(true)
//         return signInWithEmailAndPassword(auth, email, password)
//     }
//     const provider = new GoogleAuthProvider();
//     const signInWithGoogle = () => {
//         setLoading(true)
//         return signInWithPopup(auth, provider)
//     }

//     const signOutUser = async () => {
//         setLoading(true)
//         try {
//             await signOut(auth);
//             await axiosInstance.post(`/logout`, {});
//             localStorage.removeItem("email")
//             localStorage.removeItem("currentUser")
//             navigate("/login");
//         } catch (error) {
//             console.error("Logout error:", error);
//         }
//     }

//     const deleteAccount = async () => {
//         try {
//             // Step 1: Delete Firebase Auth user
//             await deleteUser(user);

//             // Step 2: Call backend to delete all related data
//             const res = await axiosInstance.delete(`/profile/delete/${user.email}`);
//             console.log("✅ Account & all data deleted:", res.data);

//             // Step 3: Clear localStorage
//             localStorage.removeItem("email");
//             localStorage.removeItem("currentUser");
//             localStorage.removeItem("filteredFriend");

//             // Step 4: Logout from Firebase and backend
//             await signOut(auth);
//             await axiosInstance.post(`/logout`);

//             // Step 5: Redirect to login page
//             navigate("/login");

//         } catch (error) {
//             console.error("❌ Error deleting account:", error);
//         }
//     };

//     useEffect(() => {
//         const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser?.email) {
//                 const email = currentUser.email;
//                 setUser(currentUser);
//                 setLoading(false);
//                 localStorage.setItem("email", email);

//                 try {
//                     // ১. JWT generate / verify request
//                     await axiosInstance.post(`/auth/jwt`, { email })
//                     .then(res=>console.log(res.data))

//                     // ২. User profile fetch
//                     const { data } = await axiosInstance.get(`/profile/${email}`);
//                     setUserData(data);
//                     if (!data) {
//                         return setLoading(true)
//                     }

//                     localStorage.setItem("currentUser", JSON.stringify(data));

//                     // ৩. Friends info
//                     const [friendsRes, myFriendsRes, sentReqRes, reqRes, youMayKnowRes] = await Promise.all([
//                         axiosInstance.get(`/allUsers?email=${email}`),
//                         axiosInstance.get(`/myfriends?email=${email}`),
//                         axiosInstance.get(`/sentrequest?email=${email}`),
//                         axiosInstance.get(`/requests?email=${email}`),
//                         axiosInstance.get(`/youMayKnow?email=${email}`),
//                     ]);

//                     setFriendsData(friendsRes.data);
//                     setMyFriends(myFriendsRes.data);
//                     setSentRequests(sentReqRes.data);
//                     setFriendRequests(reqRes.data);
//                     setYouMayKnowFriends(youMayKnowRes.data);

//                     // ৪. Posts fetch
//                     const postsRes = await axiosInstance.get(`/posts`);
//                     setPostsData(postsRes.data);
//                     setUsersPostsData(postsRes.data.filter(post => post.authorEmail === email));

//                     const savedRes = await axiosInstance.get(`/savedPosts?email=${email}`);
//                     setSavedPosts(savedRes.data);

//                     // ৫. Active ping
//                     const ping = async () => {
//                         await axiosInstance.post(`/activeStatus?email=${email}`);
//                     };
//                     const interval = setInterval(ping, 2000);
//                     ping();
//                     return () => clearInterval(interval);

//                 } catch (err) {
//                     console.error("JWT / Data fetch error:", err);
//                 }
//             } else {
//                 setUser(null);
//                 setUserData(null);
//                 setLoading(false);
//             }
//         });

//         return () => unSubscribe();
//     }, []);

//     const dataList = {
//         user, setUser, userData, setUserData, usersPostsData, setUsersPostsData,
//         loading, setLoading, signUpUser, logInUser, signOutUser, signInWithGoogle, deleteAccount,
//         addFriendBtnHanlder, unFriendBtnHanlder, confrimFriendBtnHanlder,
//         postsData, setPostsData, friendsData, setFriendsData,
//         myFriends, setMyFriends,
//         friendsRequest, setFriendRequests,
//         sentRequests, setSentRequests,
//         youMayKnowFriends, setYouMayKnowFriends, cancelSentRequestBtnHandler, cancelReceivedRequestBtnHandler,
//         savedPosts, setSavedPosts, savePostHandler, removeSavedPostHandler
//     }

//     return (
//         <AuthContext.Provider value={dataList}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthProvider
