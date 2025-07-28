import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import SignInWithGoogle from "../../AuthProvider/SignInWithGoogle";

const Signup = () => {
    const navigate = useNavigate();
    const { signUpUser, setUser, setUserData } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [loadingSpinner, setLoadingSpinner] = useState(true);
    const [userStatus, setUserStatus] = useState("");
    const [passStatus, setPassStatus] = useState(false);
    const [passMessage, setPassMessage] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setLoadingSpinner(false);
        setPassStatus(false);
        setPassMessage("");
        setUserStatus("");

        // Parse username and name from email
        let username = data.email.split("@")[0] || "";
        username = username.split("+")[0];
        const nameWithoutNumbers = username.replace(/\d+/g, "").trim();
        const name = nameWithoutNumbers
            ? nameWithoutNumbers[0].toUpperCase() +
            nameWithoutNumbers.slice(1).toLowerCase()
            : "";

        if (data.password !== data.confirmPassword) {
            setPassStatus(true);
            setPassMessage("Password is not matched");
            setLoadingSpinner(true);
            return;
        }

        const formData = {
            email: data.email,
            name,
            username,
            address: "",
            bio: "",
            profilephotourl: "",
            coverphotourl: "",
            phone: "",
            website: "",
            onlineStatus: false,
            createdDate: new Date(),
            posts: [],
            savePosts: [],
            myFriends: [],
            friendRequests: [],
            sentRequests: [],
        };

        signUpUser(data.email, data.password)
            .then((result) => {
                setUser(result.user);

                if (result.user) {
                    axios
                        .post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData)
                        .then((res) => {
                            setUserData(res.data);
                            navigate("/profile");
                        })
                        .catch((err) => {
                            setUserStatus(err.message);
                            setLoadingSpinner(true);
                        });
                }
            })
            .catch((err) => {
                setUserStatus(err.message);
                setLoadingSpinner(true);
            });
    };

    const password = watch("password", "");

    return (
        <div className="font-family-primary bg-white min-h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="md:col-span-1 h-screen p-8">
                <div>
                    <Link
                        to={"/"}
                        className="text-3xl font-semibold font-family-secondary text-blue-600"
                    >
                        Xenon Media
                    </Link>
                </div>

                <div className="h-full flex justify-center items-center">
                    <div className="md:space-y-6 space-y-6 lg:w-2/4 w-full">
                        <div>
                            <h1 className="md:text-5xl text-4xl md:mb-3 mb-2 font-semibold">
                                Signup Now
                            </h1>
                            <p className="text-xs md:text-sm">Please fill your details to access your account.</p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col  items-center w-full space-y-3 md:space-y-5"
                        >
                            <div className="grid gap-3 w-full">
                                {/* Email */}
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">
                                        Email
                                    </label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        type="email"
                                        className={`text-slate-800 bg-white border ${errors.email
                                            ? "border-red-500"
                                            : "border-slate-300"
                                            } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                                        placeholder="Enter email"
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-700 font-semibold">
                                            {errors.email.message}
                                        </p>
                                    )}
                                    {userStatus.includes("email-already-in-use") && (
                                        <p className="mt-2 text-sm text-red-700 font-semibold">
                                            This email is already in use.
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="relative">
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">
                                        Password
                                    </label>
                                    <input
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                        type={show ? "text" : "password"}
                                        className={`text-slate-800 bg-white border ${errors.password
                                            ? "border-red-500"
                                            : "border-slate-300"
                                            } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                                        placeholder="Enter password"
                                    />
                                    <div
                                        onClick={() => setShow(!show)}
                                        className="text-xl absolute top-10 right-3 cursor-pointer active:scale-95 transition-all"
                                    >
                                        {show ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-700 font-semibold">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="relative">
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">
                                        Confirm Password
                                    </label>
                                    <input
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: (value) =>
                                                value === password || "Passwords do not match",
                                        })}
                                        type={show ? "text" : "password"}
                                        className={`text-slate-800 bg-white border ${errors.confirmPassword
                                            ? "border-red-500"
                                            : "border-slate-300"
                                            } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                                        placeholder="Enter Confirm password"
                                    />
                                    <div
                                        onClick={() => setShow(!show)}
                                        className="text-xl absolute top-10 right-3 cursor-pointer active:scale-95 transition-all"
                                    >
                                        {show ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-700 font-semibold">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center">
                                    <input
                                        {...register("rememberMe", { required: true })}
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="text-black font-semibold ml-3 block text-sm cursor-pointer"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            {userStatus && (
                                <h1 className="text-sm text-red-500 text-center font-semibold">
                                    {userStatus}
                                </h1>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`text-white font-medium ${loadingSpinner ? "bg-blue-700" : "bg-blue-500"
                                    } hover:bg-blue-500 w-full py-3 rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5`}
                            >
                                <p
                                    className={`${loadingSpinner ? "hidden" : "block"
                                        } border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`}
                                />
                                <p className={`${loadingSpinner ? "block" : "hidden"}`}>
                                    Signup
                                </p>
                            </button>
                        </form>

                        <div className="flex justify-center items-center">
                            <p>---------------- Or ----------------</p>
                        </div>

                        <SignInWithGoogle />

                        <p className="text-slate-800 text-sm text-center">
                            Already have an account?
                            <Link
                                to={"/login"}
                                className="text-violet-600 font-semibold hover:underline ml-1"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="md:col-span-1 md:flex justify-center items-center hidden h-screen p-8">
                <img
                    className="h-4/4 w-4/4 object-cover"
                    src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?t=st=1748958638~exp=1748962238~hmac=9aab7eaf214925c686d58b02948a12d86b2e30f4f85c836aa9cccfff16da7ae0&w=1380"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Signup;
