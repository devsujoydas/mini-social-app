import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";


const UserName = () => {
    const [usernameMessage, setUsernameMessage] = useState("")
    const { userData,  } = useContext(AuthContext)
    const [loadingSpiner, setLoadingSpiner] = useState(true)
    const navigate = useNavigate()



    const updateUsernameHandler = (e) => {
        e.preventDefault()
        setLoadingSpiner(false)
        const username = e.target.username.value;
        const email = userData?.email;
        const formData = { email, username }


        if (username == "") {
            Swal.fire({
                title: "username field is empty!",
                icon: "error",
                draggable: true
            });
            setLoadingSpiner(true)
        }
        else {
            axios.put(`http://localhost:3000/updateUsername`, formData)
                .then(res => {
                    console.log(res.data);
                    setLoadingSpiner(true)
                    if (res.data) {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "username added successfully!",
                                icon: "success",
                                draggable: true
                            });
                            navigate('/profile')
                        }
                        else {
                            Swal.fire({
                                title: `${res.data.message}`,
                                icon: "error",
                                draggable: true
                            });

                        }
                    }
                })

        }
    }

    return (
        <div className="bg-[#00000079] h-screen flex justify-center items-center transition-all">

            <div className="relative max-w-96 w-full md:p-10 p-5 md:m-0 m-5 rounded-md bg-white">
                {
                    userData.email &&
                    <button className="absolute md:top-3 top-1 md:right-3 right-1">
                        <IoClose onClick={() => { navigate("/profile") }} className="border border-transparent hover:border-zinc-300 rounded-full p-1 text-4xl hover:bg-zinc-300  cursor-pointer transition-all  " />
                    </button>
                }
                <form onSubmit={(e) => updateUsernameHandler(e)} className="">
                    <h1 className="text-3xl font-semibold font-family-secondary text-blue-600 text-center mb-4 ">Set User Name </h1>
                    <div className='mb-2'>
                        <input defaultValue={userData?.username} name="username" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-200 " placeholder="Enter Username" />
                        <p className={usernameMessage ? `mt-2 md:text-sm text-xs text-red-700 font-semibold` : "hidden"} >{usernameMessage}</p>
                    </div>
                    <button type="submit" className={`text-white font-medium ${loadingSpiner ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-500 w-full py-3 mt-1  rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5 `}>
                        <p className={`${loadingSpiner ? "hidden" : "block"} border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`} />
                        <p className={`${loadingSpiner ? "block" : "hidden"}`}>Update</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserName