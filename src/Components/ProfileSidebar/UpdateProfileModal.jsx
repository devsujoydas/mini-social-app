import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import axios from "axios";


const UpdateProfileModal = ({ showUpdateInfoModal, setShowUpdateInfoModal }) => {

    const { userData } = useContext(AuthContext)

    const [loadingSpiner, setLoadingSpiner] = useState(true)

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        setLoadingSpiner(false)
        const name = e.target.name.value;
        const email = userData?.email;
        const address = e.target.address.value;
        const bio = e.target.bio.value;
        const profilephotourl = e.target.profilephotourl.value;
        const coverphotourl = e.target.coverphotourl.value;
        const phone = e.target.phone.value;
        const website = e.target.website.value;

        const formData = { name, email, address, bio, profilephotourl, coverphotourl, phone, website }

        axios.put(`${import.meta.env.VITE_BACKEND_URL}/update`, formData)
            .then(res => {

                setLoadingSpiner(true)

                if (res.data) {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Profile info updated successfully!",
                            icon: "success",
                            draggable: true
                        });
                        setShowUpdateInfoModal(false)
                    }
                    else {
                        Swal.fire({
                            title: "You dont have changed anythings!",
                            icon: "question",
                            draggable: true
                        });

                    }
                }
            })
    }

    return (
        <div className={`${showUpdateInfoModal ? "z-40 duration-300 transition-all" : "-z-40 duration-300 transition-all"}
            fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-[#00000059] flex justify-center items-center transition-all`}>

            <form onSubmit={(e) => updateProfileHandler(e)} className='  relative bg-white md:w-1/2 md:p-10 p-5 rounded-md md:space-y-5 space-y-3 w-full md:mx-0 mx-5' >
                <div className="absolute md:top-3 top-1 md:right-3 right-1">
                    <IoClose onClick={() => setShowUpdateInfoModal(!showUpdateInfoModal)} className="border border-transparent hover:border-zinc-300 rounded-full p-1 text-4xl hover:bg-zinc-300  cursor-pointer transition-all  " />
                </div>


                <h1 className="font-semibold text-3xl md:text-4xl text-center font-family-secondary text-blue-600">Complete Your Profile</h1>

                <div className='grid md:gap-5 gap-2'>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="text-slate-800  text-xs md:text-sm font-medium mb-1 md:mb-2 block">Name</label>
                            <input defaultValue={userData?.name} name="name" type="text" className="text-slate-800 bg-white border border-slate-300 w-full  text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
                        </div>
                        <div>
                            <label className="text-slate-800  text-xs md:text-sm font-medium mb-1 md:mb-2 block">Phone</label>
                            <input defaultValue={userData?.phone} name="phone" type="text" className="text-slate-800 bg-white border border-slate-300 w-full  text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter phone number" />
                        </div>
                        <div>
                            <label className="text-slate-800  text-xs md:text-sm font-medium mb-1 md:mb-2 block">Website</label>
                            <input defaultValue={userData?.website} name="website" type="text" className="text-slate-800 bg-white border border-slate-300 w-full  text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter website url" />
                        </div>
                        <div>
                            <label className="text-slate-800  text-xs md:text-sm font-medium mb-1 md:mb-2 block">Address</label>
                            <input defaultValue={userData?.address} name="address" type="text" className="text-slate-800 bg-white border border-slate-300 w-full  text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter address" />
                        </div>
                    </div>
                    <div className=''>
                        <label className=" text-slate-800  text-xs md:text-sm font-medium mb-1 md:mb-2 block">Bio</label>
                        <input defaultValue={userData?.bio} name="bio" type="text" className="text-slate-800 bg-white border border-slate-300 w-full  text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter bio" />
                    </div>
                    <div>
                        <label className="text-slate-800  text-xs md:text-sm font-medium mb-1 md:mb-2 block">Profile Photo URL</label>
                        <input defaultValue={userData?.profilephotourl} name="profilephotourl" type="text" className="text-slate-800 bg-white border border-slate-300 w-full  text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Photo Url" />
                    </div>
                    <div>
                        <label className="text-slate-800  text-xs md:text-sm font-medium mb-1 md:mb-2 block">Cover Photo URL</label>
                        <input defaultValue={userData?.coverphotourl} name="coverphotourl" type="text" className="text-slate-800 bg-white border border-slate-300 w-full  text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Photo Url" />
                    </div>
                </div>
                <button type="submit" className={`text - white font - medium ${loadingSpiner ? "bg-blue-700" : "bg-blue-500"} text-white hover:bg-blue-500 w-full py-3 rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5 `}>
                    <p className={`${loadingSpiner ? "hidden" : "block"} border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`} />
                    <p className={`${loadingSpiner ? "block" : "hidden"} `}>Update</p>
                </button>
            </form>
        </div>
    )
}

export default UpdateProfileModal