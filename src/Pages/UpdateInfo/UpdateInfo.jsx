import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../PrivateRoute/AuthProvider'
import { useLoaderData } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'

const UpdateInfo = () => {

    const { user, loading, setLoading } = useContext(AuthContext)
    console.log(user.email)


    const loaderUser = useLoaderData()
    console.log(loaderUser)


    const submitHandler = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const profilephotourl = e.target.profilephotourl.value;
        const phone = e.target.phone.value;
        const website = e.target.website.value;

        const formData = { name, username, email, password, profilephotourl, phone, website }

        console.log("formData", formData)

        fetch(`http://localhost:3000/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log("Result from Backend: ", data)

                }
            })

    }
    return (
        <div>
            {
                loading ?
                    <Loader />
                    :
                    <div className='max-w-7xl mx-auto  md:my-20   flex flex-col justify-center items-center  '>


                        <form onSubmit={submitHandler} className='border w-1/2  p-10 rounded-md space-y-5'>
                            <h1 className="font-semibold text-4xl text-center font-family-secondary text-blue-600">Complete Your Profile</h1>
                            <div className=" grid grid-cols-2 gap-5 ">
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Name</label>
                                    <input defaultValue={loaderUser.name} required name="name" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
                                </div>
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Username</label>
                                    <input defaultValue={loaderUser.username} required name="username" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Username" />
                                </div>
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Email</label>
                                    <input defaultValue={loaderUser.email} required name="email" type="email" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                                </div>
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
                                    <input defaultValue={loaderUser.password} required name="password" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                                </div>
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Phone</label>
                                    <input defaultValue={loaderUser.phone} required name="phone" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter phone number" />
                                </div>
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">Website</label>
                                    <input defaultValue={loaderUser.website} required name="website" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter website url" />
                                </div>

                            </div>

                            <div>
                                <label className="text-slate-800 text-sm font-medium mb-2 block">Profile Photo URL</label>
                                <input defaultValue={loaderUser.profilephotourl} required name="profilephotourl" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                            </div>

                            <div className="mt-8">
                                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer active:scale-95 transition-all">
                                    Update
                                </button>
                            </div>

                        </form>
                    </div>
            }

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