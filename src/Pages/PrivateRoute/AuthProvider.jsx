import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import auth from '../../Firebase/firebase.config'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [friendsData, setFriendsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [postsData, setPostsData] = useState([])




    useEffect(() => {
        fetch(`https://mini-social-app-backend.vercel.app/posts`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setPostsData(data)
            })
    }, [])

    useEffect(() => {
        fetch(`https://mini-social-app-backend.vercel.app/friends`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setFriendsData(data)
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
            if (currentUser != {}) {
                setUser(currentUser)
                setLoading(false)
                fetch(`https://mini-social-app-backend.vercel.app/profile/${currentUser?.email}`)
                    .then(res => res.json())
                    .then(data => {
                        setUserData(data)
                    })
            }
        })
        return () => {
            unSubscribe();
        }
    }, [])



    const dataList = {
        user, setUser,
        userData, setUserData,
        loading, setLoading,
        postsData, setPostsData,
        friendsData, setFriendsData,
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