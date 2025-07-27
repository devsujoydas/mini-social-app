
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

const SignInWithGoogle = () => {
    const navigate = useNavigate()
    const { signInWithGoogle, setUserData } = useContext(AuthContext)


    const logInWithGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                if (!result.user.email) return

                setUserData(result.user)
                const email = result.user.email;
                const name = result.user.displayName;
                const username = name.replace(/[^a-zA-Z]/g, "").toLowerCase();
                const profilephotourl = result.user.photoURL;
                const address = ""; const bio = "";
                const coverphotourl = ""; const phone = ""; const website = "";
                const posts = []; const createdDate = new Date();
                const friendRequests = [];
                const myFriends = []

                const formData = { name, username, email, address, bio, profilephotourl, coverphotourl, phone, website, posts, createdDate, myFriends, friendRequests }

                axios.post(`${BASE_BACKEND_URL}/signinwithgoogle`, formData)
                    .then(res => {
                        localStorage.setItem("email", res.data.email)
                        setUserData(res.data)
                        console.log("signinwithgoogle: ", res.data)
                        navigate("/profile")
                    })

            }).catch((err) => {
                console.log(err)
            });
    }
    return (
        <button
            onClick={logInWithGoogle} className="flex justify-center items-center gap-1 border border-zinc-300 w-full py-1 rounded-md hover:bg-zinc-100 cursor-pointer active:scale-95 transition-all">
            <img className="w-10 h-10 rounded-full" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />
            <h1 className="text-black font-medium ">Sign in with Google</h1>
        </button>
    )
}

export default SignInWithGoogle