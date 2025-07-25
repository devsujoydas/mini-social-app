import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, EmailAuthProvider, linkWithCredential } from 'firebase/auth'
import auth from '../Firebase/firebase.config'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const currentUserFromLs = JSON.parse(localStorage.getItem("currentUser"))
    const emailFromLS = localStorage.getItem("email");

    const [storedEmail, setStoredEmail] = useState("")
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [friendsData, setFriendsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [postsData, setPostsData] = useState([])
    const [usersPostsData, setUsersPostsData] = useState([])

    const [myFriends, setMyFriends] = useState([])
    const [requestFriends, setRequestFriends] = useState([])
    const [youMayKnowFriends, setYouMayKnowFriends] = useState([])



    const addFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`http://localhost:3000/addfriend`, data)
            .then(res => {
                toast.success('Request Send!')
                console.log(res.data)
            })
            .catch(err => console.error("Add friend failed:", err));
    }




    const unFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`http://localhost:3000/unfriend`, data)
            .then(res => console.log(res.data))
            .catch(err => console.error("Unfriend failed:", err));
    }



    const confrimFriendBtnHanlder = (friend) => {
        const data = { userId: userData._id, friendId: friend._id }
        axios.put(`http://localhost:3000/confirmFriend`, data)
            .then(res => console.log(res.data))
            .catch(err => console.error("Friend confirm failed:", err));

    }







    useEffect(() => {




        axios.get(`http://localhost:3000/myfriends?email=${localStorage.getItem("email")}`)
            .then(res => console.log("myfriends", res.data))
            .catch(err => console.error(err));




        axios.get(`http://localhost:3000/posts`)
            .then(res => setPostsData(res.data))
            .catch(err => console.error("Fetch posts error:", err));



        axios.get(`http://localhost:3000/posts`)
            .then(res => {
                const usersPost = res.data.filter(post => post.authorEmail === localStorage.getItem("email"));
                setUsersPostsData(usersPost);
            })
            .catch(err => console.error(err))




        axios.get(`http://localhost:3000/allUsers`)
            .then(res => {

                if (emailFromLS) {
                    const friends = res.data.filter(friend => friend.email != currentUserFromLs.email);
                    // console.log(friends);
                    setFriendsData(friends);

                    setRequestFriends(JSON.parse(localStorage.getItem("currentUser"))?.friendRequests)

                    setMyFriends(JSON.parse(localStorage.getItem("currentUser"))?.myFriends)

                    const filteredFriend = friends.filter(friend =>
                        !currentUserFromLs?.myFriends.some(my => my?.email == friend?.email)
                    );
                    localStorage.setItem("filteredFriend", JSON.stringify(filteredFriend))


                    setYouMayKnowFriends(JSON.parse(localStorage.getItem("filteredFriend")))

                }

            })
            .catch(err => console.error(err))
    }, [])

    // OnlineStatus
    useEffect(() => {
        if (!emailFromLS) return;

        const ping = () => {
            axios.post("http://localhost:3000/activeStatus", { emailFromLS })
                .then(res => { })
                .catch(err => console.error("Ping Error:", err));
        };

        const interval = setInterval(ping, 2000); // Every 2 seconds
        ping(); // Initial ping

        return () => clearInterval(interval); // Cleanup
    }, [emailFromLS]);



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
            localStorage.removeItem("currentUser")
            localStorage.removeItem("filteredFriend")

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
                        localStorage.removeItem("currentUser")
                        localStorage.removeItem("filteredFriend")

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
                const email = currentUser.email
                // console.log(email);
                localStorage.setItem("email", email)
                setStoredEmail(localStorage.getItem("email"))

                axios.get(`http://localhost:3000/profile/${email}`)
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
        requestFriends, setRequestFriends,
        youMayKnowFriends, setYouMayKnowFriends,
    }

    return (
        <AuthContext.Provider value={dataList}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider