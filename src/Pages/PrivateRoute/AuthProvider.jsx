import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import auth from '../../Firebase/firebase.config'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    // const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [friendsData, setFriendsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [postsData, setPostsData] = useState([])
    const [usersPostsData, setUsersPostsData] = useState([])





    useEffect(() => {
        fetch(`https://mini-social-app-backend.vercel.app/posts`)
            .then(res => res.json())
            .then(data => {
                setPostsData(data)
            })
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

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const deleteAccount = () => {
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
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);

                fetch(`https://mini-social-app-backend.vercel.app/posts`)
                    .then(res => res.json())
                    .then(data => {
                        const usersPost = data.filter(post => post.authorEmail == currentUser.email)
                        setUsersPostsData(usersPost)
                    })


                fetch(`https://mini-social-app-backend.vercel.app/profile/${currentUser.email}`)
                    .then(res => res.json())
                    .then(data => setUserData(data))


                fetch(`https://mini-social-app-backend.vercel.app/friends`)
                    .then(res => res.json())
                    .then(data => {
                        const friends = data.filter(friend => friend.email != currentUser.email)
                        setFriendsData(friends)
                    })


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