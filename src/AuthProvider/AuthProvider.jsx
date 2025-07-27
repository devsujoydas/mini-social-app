import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, EmailAuthProvider, linkWithCredential } from 'firebase/auth'
import auth from '../Firebase/firebase.config'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const BASE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [loading, setLoading] = useState(true)

    const [storedEmail, setStoredEmail] = useState("")
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [friendsData, setFriendsData] = useState([])
    const [postsData, setPostsData] = useState([])
    const [usersPostsData, setUsersPostsData] = useState([])

    const [myFriends, setMyFriends] = useState([])
    const [friendsRequest, setFriendRequests] = useState([])
    const [sentRequests, setSentRequests] = useState([])
    const [youMayKnowFriends, setYouMayKnowFriends] = useState([])



    const addFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`${BASE_BACKEND_URL}/addfriend`, data)
            .then(res => {
                toast.success(res.data.message)
            })
            .catch(err => console.error("Add friend failed:", err));
    }
    const unFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`${BASE_BACKEND_URL}/unfriend`, data)
            .then(res => {
                toast.success(res.data.message)
            })
            .catch(err => console.error("Unfriend failed:", err));
    }
    const confrimFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`${BASE_BACKEND_URL}/confirmFriend`, data)
            .then(res => {
                toast.success(res.data.message)
            })
            .catch(err => console.error("Friend confirm failed:", err));

    }

    useEffect(() => {

        axios.get(`${BASE_BACKEND_URL}/allfriends?email=${localStorage.getItem("email")}`).then(res => {
            setFriendsData(res.data);
        });
        axios.get(`${BASE_BACKEND_URL}/myfriends?email=${localStorage.getItem("email")}`).then(res => {
            setMyFriends(res.data);
        });
        axios.get(`${BASE_BACKEND_URL}/sentrequest?email=${localStorage.getItem("email")}`).then(res => {
            setSentRequests(res.data);
        });
        axios.get(`${BASE_BACKEND_URL}/requests?email=${localStorage.getItem("email")}`).then(res => {
            setFriendRequests(res.data);
        });
        axios.get(`${BASE_BACKEND_URL}/youMayKnow?email=${localStorage.getItem("email")}`).then(res => {
            setYouMayKnowFriends(res.data);
        });

        axios.get(`${BASE_BACKEND_URL}/posts`).then(res => {
            setPostsData(res.data)
            const usersPost = res.data.filter(post => post.authorEmail === localStorage.getItem("email"));
            setUsersPostsData(usersPost);
        });

        if (!localStorage.getItem("email")) return;
        const ping = () => {
            axios.post(`${BASE_BACKEND_URL}/activeStatus?email=${localStorage.getItem("email")}`)
                .then(res => { }).catch(err => console.error("Ping Error:", err));
        };
        const interval = setInterval(ping, 2000);
        ping();
        return () => clearInterval(interval);

    }, [])




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
            axios.post(`${BASE_BACKEND_URL}/logout`)
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
                axios.delete(`${BASE_BACKEND_URL}/profile/delete/${user.email}`)
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
            axios.post(`${BASE_BACKEND_URL}/logout`)
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
                // console.log(email);
                localStorage.setItem("email", email)
                setStoredEmail(localStorage.getItem("email"))

                axios.get(`${BASE_BACKEND_URL}/profile/${email}`)
                    .then(res => {
                        setUserData(res.data)
                        localStorage.setItem("currentUser", JSON.stringify(res.data))
                    })
                    .catch(err => console.error(err))


            } else { setUser(null); setUserData(null); setLoading(false); }
        });

        return () => {
            unSubscribe();
        };
    }, []);


    const dataList = {
        user, setUser, userData, setUserData, usersPostsData, setUsersPostsData,
        loading, setLoading, storedEmail,
        signUpUser, logInUser, signOutUser, signInWithGoogle, deleteAccount,
        addFriendBtnHanlder, unFriendBtnHanlder, confrimFriendBtnHanlder,
        postsData, setPostsData, friendsData, setFriendsData,
        myFriends, setMyFriends,
        friendsRequest, setFriendRequests,
        sentRequests, setSentRequests,
        youMayKnowFriends, setYouMayKnowFriends,
    }

    return (
        <AuthContext.Provider value={dataList}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider