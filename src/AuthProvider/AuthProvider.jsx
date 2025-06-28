import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, EmailAuthProvider, linkWithCredential } from 'firebase/auth'
import auth from '../Firebase/firebase.config'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [friendsData, setFriendsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [postsData, setPostsData] = useState([])
    const [usersPostsData, setUsersPostsData] = useState([])





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

            await fetch("https://mini-social-app-backend.vercel.app/logout", {
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

                fetch(`https://mini-social-app-backend.vercel.app/profile/delete/${user.email}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {

                        navigate("/login")
                        console.log("Account Deleted Successfully", data)
                    })
            }).catch((error) => {
                console.log(error)
            });
        try {
            await signOut(auth);

            await fetch("https://mini-social-app-backend.vercel.app/logout", {
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

                fetch('https://mini-social-app-backend.vercel.app/posts', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    // credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (!data.message) {
                            setPostsData(data)
                        }
                    })
                    .catch(err => console.error("Fetch posts error:", err));



                fetch(`https://mini-social-app-backend.vercel.app/posts`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', },
                    // credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (!data.message) {
                            const usersPost = data.filter(post => post.authorEmail === currentUser.email);
                            setUsersPostsData(usersPost);
                        }
                    })
                    .catch(err => console.error("Post fetch error:", err));


                fetch(`https://mini-social-app-backend.vercel.app/profile/${currentUser.email}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => res.json())
                    .then(data => setUserData(data))
                    .catch(err => console.error(err))



                fetch(`https://mini-social-app-backend.vercel.app/friends`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    // credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {

                        if (!data.message) {
                            const friends = data.filter(friend => friend.email !== currentUser.email);
                            setFriendsData(friends);
                        }
                    })
                    .catch(err => console.error(err));

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
    }

    return (
        <AuthContext.Provider value={dataList}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider