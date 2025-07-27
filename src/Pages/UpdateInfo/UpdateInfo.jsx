import { useContext, useState } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import { useLoaderData, useNavigate } from 'react-router-dom'
import ProfileSidebar from '../../Components/ProfileSidebar/ProfileSidebar'
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';


const UpdateInfo = () => {

    const { user } = useContext(AuthContext)
    const loaderUser = useLoaderData()
    const navigate = useNavigate()
    const [loadingSpiner, setLoadingSpiner] = useState(true)

    const [showUsernameModal, setShowUsernameModal] = useState(false)
    const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false)
    const [usernameMessage, setUsernameMessage] = useState("")



    const updateProfileHandler = async (e) => {
        e.preventDefault();
        setLoadingSpiner(false)
        const name = e.target.name.value;
        const email = loaderUser.email;
        const address = e.target.address.value;
        const bio = e.target.bio.value;
        const profilephotourl = e.target.profilephotourl.value;
        const coverphotourl = e.target.coverphotourl.value;
        const phone = e.target.phone.value;
        const website = e.target.website.value;

        const formData = { name, email, address, bio, profilephotourl, coverphotourl, phone, website }

        console.log("formData", formData)

        fetch(`${BASE_BACKEND_URL}/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                setLoadingSpiner(true)

                if (data) {
                    console.log(data)
                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Profile updated successfully!",
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
        <div className='flex md:flex-row flex-col-reverse'>

            <div className=' md:w-4/5 md:p-10 p-5 '>
                <form onSubmit={updateProfileHandler} className='  relative bg-white md:p-10 p-5 rounded-md md:space-y-5 space-y-3 w-full md:mx-0 mx-5' >
                    <button className="absolute md:top-3 top-1 md:right-3 right-1">
                        <IoClose onClick={() => setShowUpdateInfoModal(!showUpdateInfoModal)} className="border border-transparent hover:border-zinc-300 rounded-full p-1 text-4xl hover:bg-zinc-300  cursor-pointer transition-all  " />
                    </button>
                    <h1 className="font-semibold text-3xl md:text-4xl text-center font-family-secondary text-blue-600">Complete Your Profile</h1>
                    <div className='grid md:gap-5 gap-2'>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Name</label>
                            <input defaultValue={loaderUser.name} name="name" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
                        </div>
                        <div className=''>
                            <label className=" text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Bio</label>
                            <input defaultValue={loaderUser.bio} name="bio" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter bio" />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Website</label>
                            <input defaultValue={loaderUser.website} name="website" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter website url" />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Phone</label>
                            <input defaultValue={loaderUser.phone} name="phone" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter phone number" />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Address</label>
                            <input defaultValue={loaderUser.address} name="address" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter address" />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Profile Photo URL</label>
                            <input defaultValue={loaderUser.profilephotourl} name="profilephotourl" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Photo Url" />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Cover Photo URL</label>
                            <input defaultValue={loaderUser.coverphotourl} name="coverphotourl" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Photo Url" />
                        </div>
                    </div>
                    <button type="submit" className={`text-white font-medium ${loadingSpiner ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-500 w-full py-3 rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5 `}>
                        <p className={`${loadingSpiner ? "hidden" : "block"} border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`} />
                        <p className={`${loadingSpiner ? "block" : "hidden"}`}>Update</p>
                    </button>
                </form>
            </div>


            <div className="md:w-2/5 md:pt-0 pt-16 border-l border-zinc-300 md:h-screen bg-white ">
                <ProfileSidebar />
            </div>
        </div>


    )
}

export default UpdateInfo


