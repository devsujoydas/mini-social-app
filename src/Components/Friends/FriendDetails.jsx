import { Link, useLoaderData, useParams } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider.jsx';
import toast, { Toaster } from 'react-hot-toast';

import AllFriends from './AllFriends';
import Loading from '../Loading/Loading';
import Post from '../Posts/Post.jsx';

import { LuMessageCircleMore } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa6";
import { RiUserSharedFill } from "react-icons/ri";

const FriendDetails = () => {
    const btnStyle = "block md:px-6 px-2 py-2 md:text-sm text-xs font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "
    const { friendsData } = useContext(AuthContext)

    const [loading, setLoading] = useState(true)
    const data = useLoaderData()
    const { friend, friendPost } = data;
    setTimeout(() => {
        setLoading(false)
    }, 500);

    const [addStatus, setAddStatus] = useState(true)

    const addFriendHandler = () => {
        toast.success('Request Send!')
        setAddStatus(false)
    }
    const cencelBtnHandler = () => {
        toast.success('Cencel!')
        setAddStatus(true)
    }


    return (
        <div className='md:pt-0 pt-3'>

            <Toaster position="bottom-center" reverseOrder={true} />

            <div className='grid grid-cols-1 lg:grid-cols-9 '>
                <div className='lg:col-span-6 p-3 md:p-5'>
                    {loading ? <Loading /> :
                        <div>
                            {/* Friends Details  */}
                            <div className='mb-5 '>
                                <div className='md:h-96 rounded-lg border border-zinc-300 h-50 md:mt-0 mt-14 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${friend?.coverphotourl ? friend?.coverphotourl : "https://www.deped.gov.ph/wp-content/uploads/placeholder.png "})` }}>
                                </div>
                                <div className=' flex md:gap-5 items-center'>
                                    <div className='md:ml-10 ml-2'>
                                        <div className='md:w-50 w-26 md:h-50 outline outline-zinc-300 bg-white h-26 border-4 border-white md:-mt-23 -mt-14  rounded-full  bg-no-repeat bg-cover bg-center'
                                            style={{ backgroundImage: `url(${friend?.profilephotourl ? friend?.profilephotourl : "/default.jpg"})` }}></div>
                                    </div>
                                    <div className='flex items-center flex-col md:flex-row md:gap-5'>
                                        <div className='md:mt-3 md:ml-0 ml-2'>
                                            <h1 className='md:text-2xl text-xl  font-semibold'>{friend?.name}</h1>
                                            <h1 className='md:text-md text-sm'>@{friend?.username}</h1>
                                        </div>
                                        <div className='md:mt-4 mt-2 flex justify-center items-center gap-2'>
                                            <button>
                                                {addStatus
                                                    ?
                                                    <button onClick={() => addFriendHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold flex items-center md:gap-2 gap-1`}  ><FaUserPlus className='md:text-lg text-sm' /> Add friend</button>
                                                    :
                                                    <p onClick={() => cencelBtnHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold flex items-center md:gap-2 gap-1`}><RiUserSharedFill className='md:text-lg text-sm' />Cencel</p>
                                                }
                                            </button>
                                            <Link to={`/message/${friend?.username}`} className='follow-btn'><LuMessageCircleMore />Message</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className=" flex justify-center items-center flex-col md:mt-5 mt-3">
                                    <div className=" flex justify-center items-center md:gap-10 gap-3 ">
                                        <div className="text-center ">
                                            <h1 className="text-xl font-semibold">{friendPost?.length}</h1>
                                            <h1 className=" font-medium text-zinc-500">Post</h1>
                                        </div>
                                        <div className="text-center  border-zinc-300 border-r-2 border-l-2 md:px-8 px-3">
                                            <h1 className="text-xl font-semibold">0</h1>
                                            <h1 className=" font-medium text-zinc-500">Followers</h1>
                                        </div>
                                        <div className="text-center ">
                                            <h1 className="text-xl font-semibold">0</h1>
                                            <h1 className=" font-medium text-zinc-500">Following</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* post container  */}
                            {friendPost.length == 0
                                ?
                                <div className="flex justify-center items-center">
                                    <h1 className="text-zinc-400">No post found...</h1>
                                </div>
                                :
                                <div className="grid gap-5">
                                    {friendPost.map((post) => <Post key={post._id} post={post} friend={friend} />)}
                                </div>
                            }
                        </div>
                    }
                </div>

                {/* All Friends  */}
                <div className='lg:col-span-3 md:p-5 p-3'>
                    <h1 className='text-lg mb-5 font-semibold'>People you may know</h1>
                    <div className='grid grid-cols-1 gap-2 '>
                        {friendsData.map((friend, idx) => (
                            <AllFriends key={idx} friend={friend} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendDetails