import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import auth from '../../Firebase/firebase.config'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)


    const handleSetUserData = (username) => {
        console.log(username)
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

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const deleteAccount = () => {
        return deleteUser(user)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])



    const dataList = {
        user,
        setUser,
        userData,
        setUserData,
        signUpUser,
        loading,
        setLoading,
        logInUser,
        signOutUser,
        signInWithGoogle,
        deleteAccount,
        handleSetUserData,
    }

    return (
        <AuthContext.Provider value={dataList}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider