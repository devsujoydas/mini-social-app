
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


                const structute = {
                    "_id": {
                        "$oid": "685db079b29d4184b073b06c"
                    },
                    "name": "Sujoy Das",
                    "username": "devsujoydas",
                    "email": "devsujoydas@gmail.com",

                    "address": "Mymensingh, Bangladesh",
                    "bio": "Professional Web Developer || Software Engineers",
                    "profilephotourl": "https://avatars.githubusercontent.com/u/157239662?v=4",
                    "coverphotourl": "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg",
                    "phone": "01303436299 ",
                    "website": "http://devsujoydas.vercel.app",
                    "posts": [
                        {
                            "$oid": "686aa2c213243c3cc1c70747"
                        }
                    ],
                    "createdDate": "2025-06-26T20:41:28.168Z",
                    "onlineStatus": true,
                    "myFriends": [
                        {
                            "$oid": "688756c5d6d612a9e8072638"
                        },
                        {
                            "$oid": "683f2cf894b632b128068bb7"
                        }
                    ],
                    "friendRequests": [],
                    "sentRequests": [
                        {
                            "$oid": "685a794dd66dae37e2190611"
                        }
                    ],
                    "savePosts": []
                }
                setUserData(result.user)

                const email = result.user.email;
                const name = result.user.displayName;
                const username = name.replace(/[^a-zA-Z]/g, "").toLowerCase();
                
                const address = "";
                const bio = "";
                const profilephotourl = result.user.photoURL;
                const coverphotourl = "";
                const phone = "";
                const website = "";
                const onlineStatus = false;
                const createdDate = new Date();
                const posts = [];
                const savePosts = []
                const myFriends = []
                const friendRequests = [];
                const sentRequests = []

                const formData = { email, name, username, address, bio, profilephotourl, coverphotourl, phone, website, onlineStatus, createdDate, posts, savePosts, myFriends, friendRequests, sentRequests }

                axios.post(`${import.meta.env.VITE_BACKEND_URL}/signinwithgoogle`, formData)
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