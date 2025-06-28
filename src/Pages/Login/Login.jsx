import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import axios from 'axios';


const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()


    const { signInWithGoogle, logInUser, setUser, setUserData, setLoading } = useContext(AuthContext)
    const [show, setShow] = useState(0)
    const [loadingSpiner, setLoadingSpiner] = useState(true)
    const [userStatus, setUserStatus] = useState("")


    const logInWithGoogle = () => {
        signInWithGoogle()
            .then((result) => {

                if (!result.user) return

                setUser(result.user)
                const name = result.user.displayName;
                const username = "";
                const email = result.user.email;
                const password = "";
                const address = "";
                const bio = "";
                const profilephotourl = result.user.photoURL;
                const coverphotourl = "";
                const phone = "";
                const website = "";
                const posts = [];
                const createdDate = new Date();
                const formData = { name, username, email, password, address, bio, profilephotourl, coverphotourl, phone, website, posts, createdDate }


                // navigate("/profile")

                if (result.user) {
                    fetch(`http://localhost:3000/signinwithgoogle`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    })
                        .then(res => res.json())
                        .then(data => {

                            const user = { email }

                            fetch(`http://localhost:3000/jwt`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(user),
                                credentials: 'include'
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) {
                                        navigate(location?.state ? location.state : "/")
                                    }
                                })
                                .catch(error => {
                                    console.error("JWT fetch error:", error);
                                });

                            if (data.insertedId) {
                                setUserData(data)
                            }
                            if (data.data = "This email Existed") {
                                setUserData(data)
                                console.log("Result from Backend: ", data)
                                navigate("/profile")
                            }
                        })
                }
            }).catch((err) => {
                console.log(err)
            });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingSpiner(false)
        const email = e.target.email.value;
        const password = e.target.password.value;

        logInUser(email, password)
            .then((result) => {
                setUser(result.user)


                const loggedInUser = result.user;

                fetch(`http://localhost:3000/profile/${loggedInUser.email}`)
                    .then(res => res.json())
                    .then(data => { setUserData(data) }
                    )

                // user login kora done hole token create korte hobe
                const user = { email }


                fetch(`http://localhost:3000/jwt`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user),
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            navigate(location?.state ? location.state : "/")
                        }
                    })
                    .catch(error => {
                        console.error("JWT fetch error:", error);
                    });






            })
            .catch((err) => {
                console.log(err.message);
                setUserStatus(err.message)
                setLoading(false)
                setLoadingSpiner(true)

            });
    }

    return (
        <div className="font-family-primary bg-white h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2">

            <div className="md:col-span-1 h-screen p-8   ">
                <div className="">
                    <Link to={"/"} className="text-3xl font-semibold font-family-secondary text-blue-600">Xenon Media</Link>
                </div>

                <div className="h-full  flex justify-center items-center">

                    <div className="md:space-y-10 space-y-8 lg:w-2/4 w-full">
                        <div className="">
                            <h1 className="md:text-5xl text-4xl md:mb-3 mb-2 font-semibold">Login Now</h1>
                            <p className="text-sm">Please fill your details to access your account.</p>
                        </div>
                        <div className="flex  justify-center flex-col gap-5  items-center">
                            <form onSubmit={submitHandler} className="w-full space-y-4">

                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-1 block">Email</label>
                                    <input required name="email" type="text" className=" text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                                </div>

                                <div className="relative">
                                    <label className="text-slate-800 text-sm font-medium mb-1 block">Password</label>
                                    <input required name="password" type={show ? "text" : "password"} className=" text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                                    <div onClick={() => setShow(!show)} className="text-xl absolute bottom-3 right-3 cursor-pointer active:scale-95 transition-all">
                                        {show ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center ">
                                        <input required id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer" />
                                        <label htmlFor="remember-me" className="text-black font-semibold ml-3 block text-sm cursor-pointer">Remember me
                                        </label>
                                    </div>
                                    <div>
                                        <Link to={"/login"} className="text-violet-600 font-semibold text-sm hover:underline ml-1">Forgot Password?</Link>
                                    </div>
                                </div>

                                <div>
                                    {userStatus
                                        &&
                                        <h1 className="text-sm text-red-500 text-center font-semibold">{userStatus}</h1>
                                    }
                                </div>

                                <button type="submit"
                                    className={`text-white font-medium ${loadingSpiner ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-500 w-full py-3 rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5 `}>
                                    <p className={`${loadingSpiner ? "hidden" : "block"} border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`} />
                                    <p className={`${loadingSpiner ? "block" : "hidden"}`}>Login</p>
                                </button>

                            </form>

                            <div className="flex justify-center items-center">
                                <p>---------------- Or ----------------</p>
                            </div>

                            <button
                                onClick={logInWithGoogle} className="flex justify-center items-center gap-1 border border-zinc-300 w-full py-1 rounded-md hover:bg-zinc-100 cursor-pointer active:scale-95 transition-all">
                                <img className="w-10 h-10 rounded-full" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />
                                <h1 className="text-black font-medium ">Sign in with Google</h1>
                            </button>

                            <p className="text-slate-800 text-sm text-center">Dont have any account?
                                <Link to={"/signup"} className="text-violet-600 font-semibold hover:underline ml-1">Signup</Link>
                            </p>

                        </div>
                    </div>

                </div>
            </div>

            <div className="md:col-span-1 hidden h-screen md:flex justify-center items-center">
                <img className="" src="./login.png" alt="" />
                {/* <img className="rounded-2xl" src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/pattern.png" alt="" /> */}
            </div>

        </div>
    )
}

export default Login