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
            })
            .catch(err => console.error("Add friend failed:", err));
    }
    const unFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/unfriend`, data)
            .then(res => {
                toast.success(res.data.message)
            })
            .catch(err => console.error("Unfriend failed:", err));
    }
    const confrimFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/confirmFriend`, data)
            .then(res => {
                toast.success(res.data.message)
            })
            .catch(err => console.error("Friend confirm failed:", err));

    }
    const savePostHandler = (post) => {
        const data = { userId: userData._id, postId: post._id }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/savePost`, data)
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
        deleteUser(user) //Firebase e delete holei db theke delete hobe 
            .then(() => {
                axios.delete(`${import.meta.env.VITE_BACKEND_URL}/profile/delete/${user.email}`)
                    .then(res => {
                        localStorage.removeItem("email")
                        localStorage.removeItem("currentUser")
                        localStorage.removeItem("filteredFriend")
                        navigate("/login")
                        console.log("Account Deleted Successfully", res.data)
                    })
            }).catch((error) => {
                console.log(error)
            });
        try {
            await signOut(auth);
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`)
            navigate("/login");
        } catch (err) {
            console("Logout error:", err);
        }
    }

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
        youMayKnowFriends, setYouMayKnowFriends,
        savedPosts, setSavedPosts, savePostHandler
    }

    return (
        <AuthContext.Provider value={dataList}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider