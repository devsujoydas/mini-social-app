import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import auth from '../../Firebase/firebase.config'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {


    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)

    const [postsData, setPostsData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/post`)
            .then(res => res.json())
            .then(data => {
                setPostsData(data)
            })
    }, [])
    useEffect(() => {
        fetch(`http://localhost:3000/friends`)
            .then(res => res.json())
            .then(data => {
                setFriends(data)
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
        return deleteUser(user)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser != {}) {
                setUser(currentUser)
                setLoading(false)
                // console.log("From AUthstae", currentUser)    
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
        friends,
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