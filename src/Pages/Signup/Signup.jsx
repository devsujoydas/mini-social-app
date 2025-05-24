
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../PrivateRoute/AuthProvider";
import { useContext } from "react";

const Signup = () => {

    const navigate = useNavigate()
    const { signUpUser, setUser, signInWithGoogle } = useContext(AuthContext)

    const submitHandler = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const address = "";
        const profilephotourl = "";
        const phone = "";
        const website = "";
        const posts = [];

        const formData = { name, username, email, address, profilephotourl, phone, website, posts }


        fetch(`http://localhost:3000/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log("Result from Backend: ", data)
                    signUpUser(email, password)
                        .then((result) => {
                            setUser(result.user)
                            console.log("Signup Successfully: ", result.user);
                            navigate("/login")
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }
            })
    };


    return (
        <div className="w-full h-screen md:p-0 p-5 flex md:flex-row flex-col items-center justify-center md:gap-0 gap-5">


            <div className="md:w-1/2 w-full h-full flex justify-center items-center overflow-hidden">
                <img className="" src="/signup.png" alt="" />
            </div>


            <div className=" md:w-1/2 w-full h-full">
                <div className="flex flex-col justify-center sm:h-screen md:p-4">
                    <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8">
                        <div className="text-center mb-8">
                            <h1 className="font-semibold text-4xl font-family-secondary text-blue-600">Sign Up</h1>
                        </div>

                        <form onSubmit={submitHandler}>
                            <div className="space-y-3 md:space-y-5">
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Name</label>
                                    <input required name="name" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
                                </div>
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Username</label>
                                    <input required name="username" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Username" />
                                </div>
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Email</label>
                                    <input required name="email" type="email" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                                </div>
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
                                    <input required name="password" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                                </div>


                                <div className="flex items-center ">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer" />
                                    <label htmlFor="remember-me" className="text-slate-800 ml-3 block text-sm cursor-pointer">
                                        I accept the <a href="/" className="text-blue-600 font-medium hover:underline ml-1">Terms and Conditions</a>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer active:scale-95 transition-all">
                                    Sign Up
                                </button>
                            </div>
                            <p className="text-slate-800 text-sm mt-6 text-center">Already have an account?
                                <Link to={"/login"} className="text-blue-600 font-medium hover:underline ml-1">Login</Link>
                            </p>

                        </form>
                    </div>
                </div>
            </div>



        </div >
    )
}

export default Signup