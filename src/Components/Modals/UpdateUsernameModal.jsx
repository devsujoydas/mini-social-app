import { useState } from "react";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";


const UpdateUsernameModal = ({ showUsernameModal, setShowUsernameModal }) => {

    const { userData, } = useAuth()
    const [loadingSpiner, setLoadingSpiner] = useState(true)
    const [usernameMessage, setUsernameMessage] = useState("")


    const updateUsernameHandler = (e) => {
        e.preventDefault()
        setLoadingSpiner(false)
        const username = e.target.username.value;
        const email = userData?.email;
        const formData = { email, username }

        fetch(`${import.meta.env.VITE_BACKEND_URL}/updateUsername`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {

                setLoadingSpiner(true)

                if (data) {
                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Username updated successfully!",
                            icon: "success",
                            draggable: true
                        });
                        setShowUsernameModal(false)
                    }
                    else {
                        setUsernameMessage(data.message)
                        Swal.fire({
                            title: `${data.message}`,
                            icon: "question",
                            draggable: true
                        });

                    }
                }
            })



    }

    return (
        <div className={`${showUsernameModal ? "z-40 block opacity-100 duration-300 transition-all" : "-z-40 hidden opacity-0 duration-300 transition-all"} 
        fixed top-0 left-0 w-full h-screen backdrop-blur-sm  bg-[#00000059] flex justify-center items-center transition-all`}>

            <div className="relative max-w-96 w-full md:p-10 p-5 md:m-0 m-5 rounded-md bg-white">
                <button className="absolute md:top-3 top-1 md:right-3 right-1">
                    <IoClose onClick={() => setShowUsernameModal(!showUsernameModal)} className="border border-transparent hover:border-zinc-300 rounded-full p-1 text-4xl hover:bg-zinc-300  cursor-pointer transition-all  " />
                </button>

                <form onSubmit={(e) => updateUsernameHandler(e)} className="">
                    <h1 className="text-3xl font-semibold font-family-secondary text-blue-600 text-center mb-4 ">Update User Name </h1>
                    <div className='mb-2'>
                        <input onClick={() => setUsernameMessage("")} defaultValue={userData?.username} name="username" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 " placeholder="Enter Username" />
                        <p className={usernameMessage ? `mt-2 md:text-sm text-xs text-red-700 font-semibold` : "hidden"} >{usernameMessage}</p>
                    </div>
                    <button type="submit" className={`text-white font-medium ${loadingSpiner ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-500 w-full py-3 rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5 `}>
                        <p className={`${loadingSpiner ? "hidden" : "block"} border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`} />
                        <p className={`${loadingSpiner ? "block" : "hidden"}`}>Update</p>
                    </button>
                </form>

            </div>
        </div>
    )
}

export default UpdateUsernameModal