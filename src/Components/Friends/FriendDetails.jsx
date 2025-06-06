import { useContext, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom'
import FriendPost from './FriendPost';
import AllFriends from './AllFriends';
import { AuthContext } from '../../Pages/PrivateRoute/AuthProvider';
import Loading from '../Loading/Loading';
import { RiUserFollowFill } from "react-icons/ri";
import { RiUserUnfollowFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { LuMessageCircleMore } from "react-icons/lu";

const FriendDetails = () => {
    const { friendsData, postsData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [follow, setFollow] = useState(true)
    const data = useLoaderData()
    const { friend, friendPost } = data;
    setTimeout(() => {
        setLoading(false)
    }, 500);


    const addFriend = () => {
        setFollow(false)
    }

    const unFriend = () => {

        const swalWithTailwind = Swal.mixin({
            customClass: {
                confirmButton: "bg-green-600 hover:bg-green-700 ml-2 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2",
                cancelButton: "bg-red-600 hover:bg-red-700 mr-2 cursor-pointer  text-white font-bold py-2 px-4 rounded"
            },
            buttonsStyling: false
        });

        swalWithTailwind.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Unfollow!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        })
            .then((result) => {
                if (result.isConfirmed) {
                    setFollow(true)
                    swalWithTailwind.fire({
                        title: "Unfollow!",
                        text: "Unfollow Successfully.",
                        icon: "success"
                    })

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithTailwind.fire({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        icon: "error"
                    });
                }
            });

    }




    return (
        <div className='md:pt-0 pt-3'>

            <div className='grid grid-cols-1 lg:grid-cols-9 '>
                <div className='lg:col-span-6 p-3 md:p-5'>
                    {loading ? <Loading /> :
                        <div>
                            {/* Friends Details  */}
                            <div className=' mb-5 '>
                                <div className='md:h-96 rounded-lg border border-zinc-300 h-50 md:mt-0 mt-14 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${friend?.coverphotourl ? friend?.coverphotourl : "https://www.deped.gov.ph/wp-content/uploads/placeholder.png "})` }}>
                                </div>

                                <div className=' flex md:gap-5 items-center'>

                                    <div className='md:ml-10 ml-2'>
                                        <div className='md:w-50 w-30 md:h-50 outline outline-zinc-300 bg-white h-30 border-4 border-white md:-mt-23 -mt-14  rounded-full  bg-no-repeat bg-cover bg-center'
                                            style={{ backgroundImage: `url(${friend?.profilephotourl ? friend?.profilephotourl : "/default.jpg"})` }}></div>
                                    </div>
                                    <div className='flex items-center flex-col md:flex-row md:gap-5'>
                                        <div className='md:mt-3 mt-1'>
                                            <h1 className='md:text-2xl md:text-xl  font-semibold'>{friend?.name}</h1>
                                            <h1 className='md:text-md text-sm'>@{friend?.username}</h1>
                                        </div>

                                        <div className='md:mt-4 mt-2 flex justify-center items-center gap-2'>
                                            <button>
                                                {follow
                                                    ?
                                                    <p onClick={() => addFriend()} className='follow-btn'><RiUserFollowFill />Add Friend</p>
                                                    :
                                                    <p onClick={() => unFriend()} className='follow-btn'><RiUserUnfollowFill />Unfriend</p>
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
                                    {friendPost.map((post) => <FriendPost key={post._id} post={post} friend={friend} />)}
                                </div>
                            }
                        </div>
                    }
                </div>


                {/* All Friends  */}
                <div className='lg:col-span-3 p-5'>
                    <h1 className='text-lg mb-5 font-semibold'>All Friends Suggested</h1>
                    <div className='grid  gap-2 '>
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