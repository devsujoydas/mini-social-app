import { useContext } from 'react'
import { AuthContext } from '../PrivateRoute/AuthProvider'
import { useLoaderData, useNavigate } from 'react-router-dom'

const UpdateInfo = () => {

    const { user } = useContext(AuthContext)
    const loaderUser = useLoaderData()
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const username = e.target.username.value;
        const email = user.email;
        const address = e.target.address.value;
        const profilephotourl = e.target.profilephotourl.value;
        const coverphotourl = e.target.coverphotourl.value;
        const phone = e.target.phone.value;
        const website = e.target.website.value;

        const formData = { name, username, email, address, profilephotourl, coverphotourl, phone, website }

        console.log("formData", formData)

        // fetch(`https://mini-social-app-backend.vercel.app/update`, {
        fetch(`https://mini-social-app-backend.vercel.app/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log("Result from Backend: ", data)
                    navigate(`/profile`)
                }
            })
    }
    return (
        <div className='max-w-7xl md:mx-auto mx-5 h-screen flex flex-col justify-center items-center  '>


            <form onSubmit={submitHandler} className='border md:p-10 p-5 rounded-md md:space-y-5 space-y-3'>
                <h1 className="font-semibold text-4xl text-center font-family-secondary text-blue-600">Complete Your Profile</h1>

                <div className='md:space-y-5 space-y-3 grid grid-cols-2 gap-3'>
                    <div className=" grid grid-cols-2 md:gap-5 gap-3">
                        <div className=''>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Username</label>
                            <input disabled={true} defaultValue={loaderUser.username} required name="username" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 cursor-not-allowed" placeholder="Enter Username" />
                        </div>
                        <div className=''>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Email</label>
                            <input disabled={true} defaultValue={loaderUser.email} required type="email" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 cursor-not-allowed" placeholder="Enter email" />
                        </div>
                    </div>

                    <div className=" grid grid-cols-2 md:gap-5 gap-3">
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Name</label>
                            <input defaultValue={loaderUser.name} required name="name" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Address</label>
                            <input defaultValue={loaderUser.address} name="address" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter address" />
                        </div>
                    </div>

                    <div className=" grid">
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Bio</label>
                            <input name="bio" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter bio" />
                        </div>
                    </div>

                    <div className=" grid grid-cols-2 md:gap-5 gap-3">
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Phone</label>
                            <input defaultValue={loaderUser.phone} name="phone" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter phone number" />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Website</label>
                            <input defaultValue={loaderUser.website} name="website" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter website url" />
                        </div>

                    </div>

                    <div>
                        <label className="text-slate-800 text-sm font-medium mb-2 block">Profile Photo URL</label>
                        <input defaultValue={loaderUser.profilephotourl} name="profilephotourl" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Photo Url" />
                    </div>

                    <div>
                        <label className="text-slate-800 text-sm font-medium mb-2 block">Cover Photo URL</label>
                        <input defaultValue={loaderUser.coverphotourl} name="coverphotourl" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Photo Url" />
                    </div>
                </div>
                <div className="mt-8">
                    <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer active:scale-95 transition-all">
                        Update
                    </button>
                </div>

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