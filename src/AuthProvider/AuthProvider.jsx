import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, EmailAuthProvider, linkWithCredential } from 'firebase/auth'
import auth from '../Firebase/firebase.config'
import axios from 'axios'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [storedEmail, setStoredEmail] = useState("")
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [friendsData, setFriendsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [postsData, setPostsData] = useState([])
    const [usersPostsData, setUsersPostsData] = useState([])


    useEffect(() => {

        if (userData.email) {
            setUserName(userData.username)


        }

        axios.get(`http://localhost:3000/posts`)
            .then(res => setPostsData(res.data))
            .catch(err => console.error("Fetch posts error:", err));



        axios.get(`http://localhost:3000/posts`)
            .then(res => {
                const usersPost = res.data.filter(post => post.authorEmail === localStorage.getItem("email"));
                setUsersPostsData(usersPost);
            })
            .catch(err => console.error(err))


        axios.get(`http://localhost:3000/friends`)
            .then(res => {
                const friends = res.data.filter(friend => friend.email != localStorage.getItem("email"));
                setFriendsData(friends);
            })
            .catch(err => console.error(err))


    }, [])


    // OnlineStatus
    useEffect(() => {
        const email = localStorage.getItem("email");
        const onlineStatus = true;
        const statusData = { email, onlineStatus }
        const ping = () => {
            axios.post("http://localhost:3000/activeStatus", statusData)
                .then(res => {
                    // console.log(res?.data);
                })
        };
        const interval = setInterval(ping, 5000);
        ping();
        return () => clearInterval(interval);
    }, []);

    // console.log(userData);


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
            localStorage.removeItem("email")

            await fetch("http://localhost:3000/logout", {
                method: "POST",
                credentials: "include"
            });
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }



    }

    const deleteAccount = async () => {
        deleteUser(user)
            .then(() => {

                fetch(`http://localhost:3000/profile/delete/${user.email}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {

                        localStorage.removeItem("email")
                        navigate("/login")
                        console.log("Account Deleted Successfully", data)
                    })
            }).catch((error) => {
                console.log(error)
            });
        try {
            await signOut(auth);

            await fetch("http://localhost:3000/logout", {
                method: "POST",
                credentials: "include"
            });
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);

                if (!currentUser?.email) return;

                localStorage.setItem("email", currentUser.email)
                setStoredEmail(localStorage.getItem("email"))

                axios.get(`http://localhost:3000/profile/${currentUser.email}`)
                    .then(res => setUserData(res.data))
                    .catch(err => console.error(err))

            } else {
                setUser(null);
                setUserData(null);
                setLoading(false);
            }
        });



        return () => {
            unSubscribe();
        };
    }, []);


    const dataList = {
        user, setUser,
        userData, setUserData,
        loading, setLoading,
        postsData, setPostsData,
        friendsData, setFriendsData,
        usersPostsData, setUsersPostsData,
        signUpUser,
        logInUser,
        signOutUser,
        signInWithGoogle,
        deleteAccount,
        storedEmail,
    }

    return (
        <AuthContext.Provider value={dataList}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider