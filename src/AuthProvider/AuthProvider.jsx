import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, EmailAuthProvider, linkWithCredential } from 'firebase/auth'
import auth from '../Firebase/firebase.config'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [friendsData, setFriendsData] = useState([])
    const [postsData, setPostsData] = useState([])
    const [usersPostsData, setUsersPostsData] = useState([])

    const [myFriends, setMyFriends] = useState([])
    const [friendsRequest, setFriendRequests] = useState([])
    const [sentRequests, setSentRequests] = useState([])
    const [youMayKnowFriends, setYouMayKnowFriends] = useState([])

    const [savedPosts, setSavedPosts] = useState([])


    const addFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/addfriend`, data)
            .then(res => {
                toast.success(res.data.message)
                console.log(res.data.message)

                if (res.data.message === "Request sent") {
                    const remaining = youMayKnowFriends.filter(fr => fr._id !== friend._id)
                    setYouMayKnowFriends(remaining);
                    setSentRequests([...sentRequests, friend])
                }
                else {
                    const remainingSentRequests = sentRequests.filter(fr => fr._id !== friend._id)
                    setSentRequests(remainingSentRequests);
                    const remainingFriendsRequests = friendsRequest.filter(fr => fr._id !== friend._id)
                    setFriendRequests(remainingFriendsRequests);;
                    setYouMayKnowFriends([...youMayKnowFriends, friend])
                }
            })
            .catch(err => console.error("Add friend failed:", err));
    }
    const unFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/unfriend`, data)
            .then(res => {
                toast.success(res.data.message)
                if (res.data.message === "Unfriend successful") {
                    const remainingMyFriend = myFriends.filter(fr => fr._id !== friend._id)
                    setMyFriends(remainingMyFriend)
                    setYouMayKnowFriends([...youMayKnowFriends, friend])
                }
            })
            .catch(err => console.error("Unfriend failed:", err));
    }
    const confrimFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/confirmFriend`, data)
            .then(res => {
                toast.success(res.data.message)
                if (res.data.message == "Request accepted") {
                    const remainingFriendsRequests = friendsRequest.filter(fr => fr._id !== friend._id)
                    setFriendRequests(remainingFriendsRequests)
                    setMyFriends([...myFriends, friend])
                }
            })
            .catch(err => console.error("Friend confirm failed:", err));

    }
    const cancelReceivedRequestBtnHandler = (friend) => {
        const data = { userId: userData._id, friendId: friend._id };
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/cancelreceivedrequest`, data)
            .then(res => {
                toast.success(res.data.message);
                const remaining = friendsRequest.filter(fr => fr._id !== friend._id);
                setFriendRequests(remaining);
                setYouMayKnowFriends([...youMayKnowFriends, friend]);
            })
            .catch(err => console.error("Cancel received request failed:", err));
    }
    const cancelSentRequestBtnHandler = (friend) => {
        const data = { userId: userData._id, friendId: friend._id };
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/cancelsentrequest`, data)
            .then(res => {
                toast.success(res.data.message);
                const remaining = sentRequests.filter(fr => fr._id !== friend._id);
                setSentRequests(remaining);
                setYouMayKnowFriends([...youMayKnowFriends, friend]);
            })
            .catch(err => console.error("Cancel sent request failed:", err));
    }
    const savePostHandler = (post) => {
        const data = { userId: userData._id, postId: post._id }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/savePost`, data)
            .then(res => {
                toast.success(res.data.message)
            })
            .catch(err => console.error("Friend confirm failed:", err));

    }
    const removeSavedPostHandler = (post) => {
        const data = { userId: userData._id, postId: post._id }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/removeSavedPost`, data)
            .then(res => {
                toast.success(res.data.message)
            })
            .catch(err => console.error("Friend confirm failed:", err));

    }









    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const signOutUser = async () => {
        setLoading(true)
        try {
            await signOut(auth);
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`)
            localStorage.removeItem("email")
            localStorage.removeItem("currentUser")
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
    const deleteAccount = async () => {
        try {
            // Step 1: Delete Firebase Auth user
            await deleteUser(user);

            // Step 2: Call backend to delete all related data
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/profile/delete/${user.email}`);
            console.log("✅ Account & all data deleted:", res.data);

            // Step 3: Clear localStorage
            localStorage.removeItem("email");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("filteredFriend");

            // Step 4: Logout from Firebase and backend
            await signOut(auth);
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`);

            // Step 5: Redirect to login page
            navigate("/login");

        } catch (error) {
            console.error("❌ Error deleting account:", error);
        }
    };



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);

                if (!currentUser?.email) return;

                const email = currentUser.email
                localStorage.setItem("email", email)


                axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/${email}`)
                    .then(res => {
                        setUserData(res.data)
                        localStorage.setItem("currentUser", JSON.stringify(res.data))
                    })
                    .catch(err => console.error(err))


                // friends related
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/allfriends?email=${email}`).then(res => {
                    setFriendsData(res.data);
                });
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/myfriends?email=${email}`).then(res => {
                    setMyFriends(res.data);
                });
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/sentrequest?email=${email}`).then(res => {
                    setSentRequests(res.data);
                });
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/requests?email=${email}`).then(res => {
                    setFriendRequests(res.data);
                });
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/youMayKnow?email=${email}`).then(res => {
                    setYouMayKnowFriends(res.data);
                });


                // Post related get
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts`).then(res => {
                    setPostsData(res.data)
                    const usersPost = res.data.filter(post => post.authorEmail === email);
                    setUsersPostsData(usersPost);
                });

                axios.get(`${import.meta.env.VITE_BACKEND_URL}/savedPosts?email=${email}`).then(res => {
                    setSavedPosts(res.data);
                });


                const ping = () => {
                    axios.post(`${import.meta.env.VITE_BACKEND_URL}/activeStatus?email=${email}`)
                        .then(res => { })
                        .catch(err => console.error("Ping Error:", err));
                };
                const interval = setInterval(ping, 2000); ping();
                return () => clearInterval(interval);

            } else { setUser(null); setUserData(null); setLoading(false); }
        });

        return () => {
            unSubscribe();
        };
    }, []);

    const dataList = {
        user, setUser, userData, setUserData, usersPostsData, setUsersPostsData,
        loading, setLoading, signUpUser, logInUser, signOutUser, signInWithGoogle, deleteAccount,
        addFriendBtnHanlder, unFriendBtnHanlder, confrimFriendBtnHanlder,
        postsData, setPostsData, friendsData, setFriendsData,
        myFriends, setMyFriends,
        friendsRequest, setFriendRequests,
        sentRequests, setSentRequests,
        youMayKnowFriends, setYouMayKnowFriends, cancelSentRequestBtnHandler, cancelReceivedRequestBtnHandler,
        savedPosts, setSavedPosts, savePostHandler, removeSavedPostHandler
    }

    return (
        <AuthContext.Provider value={dataList}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider