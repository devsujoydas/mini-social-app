
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import SignInWithGoogle from "../../AuthProvider/SignInWithGoogle";


const Signup = () => {
    const navigate = useNavigate()
    const { signUpUser, setUser, setUserData } = useContext(AuthContext)
    const [show, setShow] = useState(0)
    const [loadingSpiner, setLoadingSpiner] = useState(true)
    const [userStatus, setUserStatus] = useState("")
    const [passStatus, setPassStatus] = useState(false)
    const [passMessage, setPassMessage] = useState()


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingSpiner(false)

        const email = e.target.email.value;
        const username = email.split('@')[0];
        const nameRaw = username.replace(/[0-9]/g, '');
        const name = nameRaw.charAt(0).toUpperCase() + nameRaw.slice(1);
        const password = e.target.password.value;
        const conPassword = e.target.conPassword.value;
        const address = ""; const bio = "";
        const profilephotourl = ""; const coverphotourl = "";
        const phone = ""; const website = ""; const posts = [];
        const createdDate = new Date();

        const formData = { name, username, email, password, address, bio, profilephotourl, coverphotourl, phone, website, posts, createdDate }

        if (password != conPassword) {
            setLoadingSpiner(true)
            setPassStatus(true)
            setPassMessage("Password is not matched")
            return
        }

        signUpUser(email, password)
            .then((result) => {

                setUser(result.user)
                console.log(result);


                if (result.user) {

                    axios.post(`http://localhost:3000/signup`, formData)
                        .then(res => {
                            console.log("Result from signup page: ", res.data)

                            setUserData(res.data)
                            navigate("/profile")

                        })
                }
            })
            .catch((err) => {
                console.log(err.message);
                setUserStatus(err.message)
                setLoadingSpiner(true)
            });

    };




    return (
        <div className="font-family-primary bg-white min-h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2">

            <div className="md:col-span-1 h-screen p-8  ">
                <div className="">
                    <Link to={"/"} className="text-3xl font-semibold font-family-secondary text-blue-600">Xenon Media</Link>
                </div>

                <div className="h-full  flex justify-center items-center">

                    <div className="md:space-y-10 space-y-8 lg:w-2/4 w-full">

                        <div className="">
                            <h1 className="md:text-5xl text-4xl md:mb-3 mb-2 font-semibold">Signup Now</h1>
                            <p className="text-sm">Please fill your details to access your account.</p>
                        </div>

                        <div className="flex  justify-center flex-col gap-5  items-center">
                            <form onSubmit={submitHandler} className="w-full space-y-3 md:space-y-5">
                                <div className="grid gap-3">
                                    <div>
                                        <label className="text-slate-800 text-sm font-medium mb-2 block">Email</label>
                                        <input required name="email" type="email" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                                        <p className={`hidden mt-2 text-sm text-red-700 font-semibold`} >This email was already taken.</p>
                                    </div>
                                    <div className="relative">
                                        <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
                                        <input required name="password" type={show ? "text" : "password"} className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                                        <div onClick={() => setShow(!show)} className="text-xl absolute bottom-3 right-3 cursor-pointer active:scale-95 transition-all">
                                            {show ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <label className="text-slate-800 text-sm font-medium mb-2 block">Confirm Password</label>
                                        <input required name="conPassword" type={show ? "text" : "password"} className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Confirm password" />
                                        <div onClick={() => setShow(!show)} className="text-xl absolute bottom-3 right-3 cursor-pointer active:scale-95 transition-all">
                                            {show ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </div>
                                    </div>
                                    <p className={passStatus ? `-mt-2 text-sm text-red-700 font-semibold` : "hidden"} >{passMessage}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center ">
                                        <input required id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer" />
                                        <label htmlFor="remember-me" className="text-black font-semibold ml-3 block text-sm cursor-pointer">Remember me
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    {userStatus
                                        &&
                                        <h1 className="text-sm text-red-500 text-center font-semibold">{userStatus}</h1>
                                    }
                                </div>

                                <button type="submit" className={`text-white font-medium ${loadingSpiner ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-500 w-full py-3 rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5 `}>
                                    <p className={`${loadingSpiner ? "hidden" : "block"} border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`} />
                                    <p className={`${loadingSpiner ? "block" : "hidden"}`}>Signup</p>
                                </button>

                            </form>

                            <div className="flex justify-center items-center">
                                <p>---------------- Or ----------------</p>
                            </div>

                            <SignInWithGoogle />

                            <p className="text-slate-800 text-sm text-center">Already have an account?
                                <Link to={"/login"} className="text-violet-600 font-semibold hover:underline ml-1">Login</Link>
                            </p>

                        </div>
                    </div>

                </div >
            </div >

            <div className="md:col-span-1 md:flex justify-center items-center hidden  h-screen  p-8">
                {/* <img className="h-full  " src="./Login Art.png" alt="" /> */}
                <img className="h-4/4 w-4/4 object-cover " src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?t=st=1748958638~exp=1748962238~hmac=9aab7eaf214925c686d58b02948a12d86b2e30f4f85c836aa9cccfff16da7ae0&w=1380" alt="" />
            </div>

        </div >
    )
}

export default Signup