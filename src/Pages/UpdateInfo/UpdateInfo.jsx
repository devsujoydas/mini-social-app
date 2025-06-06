import { useContext, useState } from 'react'
import { AuthContext } from '../PrivateRoute/AuthProvider'
import { useLoaderData, useNavigate } from 'react-router-dom'

const UpdateInfo = () => {

    const { user } = useContext(AuthContext)
    const loaderUser = useLoaderData()
    const navigate = useNavigate()
    const [loadingSpiner, setLoadingSpiner] = useState(true)

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingSpiner(false)
        const name = e.target.name.value;
        const username = e.target.username.value;
        const email = user.email;
        const address = e.target.address.value;
        const bio = e.target.bio.value;
        const profilephotourl = e.target.profilephotourl.value;
        const coverphotourl = e.target.coverphotourl.value;
        const phone = e.target.phone.value;
        const website = e.target.website.value;

        const formData = { name, username, email, address, bio, profilephotourl, coverphotourl, phone, website }

        console.log("formData", formData)

        fetch(`https://mini-social-app-backend.vercel.app/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    if (data.modifiedCount > 0) {

                        console.log("Result from Backend: ", data)
                        navigate(`/profile`)
                    }
                }
            })
    }
    return (
        <div className='pt-16 md:pt-10 md:px-10 '>


            <form onSubmit={submitHandler} className='border border-zinc-300 md:p-10 p-5 rounded-md md:space-y-5 space-y-3 w-full' >
                <h1 className="font-semibold text-3xl md:text-4xl text-center font-family-secondary text-blue-600">Complete Your Profile</h1>

                <div className=' grid md:grid-cols-2 md:gap-5 gap-2'>

                    <div className=''>
                        <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Username</label>
                        <input defaultValue={loaderUser.username} required name="username" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 " placeholder="Enter Username" />
                    </div>

                    <div className=''>
                        <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Email</label>
                        <input disabled={true} defaultValue={loaderUser.email} required type="email" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 cursor-not-allowed" placeholder="Enter email" />
                    </div>

                    <div>
                        <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Name</label>
                        <input defaultValue={loaderUser.name} required name="name" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
                    </div>

                    <div>
                        <label className="text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Website</label>
                        <input defaultValue={loaderUser.website} name="website" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter website url" />
                    </div>



                    <div className='md:col-span-2'>
                        <label className=" text-slate-800 text-sm font-medium mb-1 md:mb-2 block">Bio</label>
                        <input defaultValue={loaderUser.bio} name="bio" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter bio" />
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


    )
}

export default UpdateInfo



// name
// username
// posts
// followers
// following
// profilephoto
// about
// phone
// email
// website
// friends