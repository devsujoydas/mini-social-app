import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider.jsx'
import MyFriendsCard from './FriendsCard/MyFriendsCard.jsx'
import FriendsRequestCard from './FriendsCard/FriendsRequestCard.jsx'
import PeopleYouMayKnow from './FriendsCard/PeopleYouMayKnow.jsx'
import SentRequestCard from './FriendsCard/SentRequestCard.jsx'
import { HiUsers } from "react-icons/hi";
import { RiUserReceived2Fill } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";
import { RiUserSharedFill } from "react-icons/ri";


const FriendsPage = () => {
    const { youMayKnowFriends, sentRequests, friendsRequest, myFriends, } = useContext(AuthContext)
    const btnStyle = "border border-zinc-200 md:text-[16px] text-xs py-1 md:px-4 px-2 rounded-md hover:bg-zinc-100 cursor-pointer active:scale-95 transition-all duration-300 font-family-secondary"

    const [displayFriendBlock, setDisplayFriendBlock] = useState("friend")

    return (
        <div className='md:p-7 min-h-screen p-3 lg:pt-7 md:pt-20 pt-20 relative'>

            <div className='sticky flex-wrap top-0 backdrop-blur-2xl flex md:gap-5 gap-2 items-center mb-5 border border-zinc-200 rounded-2xl p-3 md:p-5 bg-white'>
                <button onClick={() => setDisplayFriendBlock("friend")} className={`${btnStyle} relative flex items-center gap-2`}>
                    <span className='md:block hidden'>Friends</span> <HiUsers className='text-xl font-bold' />
                    <span className={`${myFriends?.length == 0 ? "hidden" : "absolute"} -top-2 -right-1.5 border px-1 bg-emerald-500 text-xs rounded-full text-white`}>{myFriends?.length}</span>
                </button>
                <button onClick={() => setDisplayFriendBlock("friendrequest")} className={`${btnStyle} relative flex items-center gap-2`}>
                    <span className='md:block hidden'>Friend Requests</span> <RiUserReceived2Fill className='text-xl font-bold' />
                    <span className={`${friendsRequest?.length == 0 ? "hidden" : "absolute"} -top-2 -right-1.5 border px-1 bg-emerald-500 text-xs rounded-full text-white`}>{friendsRequest?.length}</span>
                </button>
                <button onClick={() => setDisplayFriendBlock("sentrequest")} className={`${btnStyle} relative flex items-center gap-2`}>
                    <span className='md:block hidden'>Sent Requests</span> < RiUserSharedFill className='text-xl font-bold' />
                    <span className={`${sentRequests?.length == 0 ? "hidden" : "absolute"} -top-2 -right-1.5 border px-1 bg-emerald-500 text-xs rounded-full text-white`}>{sentRequests?.length}</span>
                </button>
                <button onClick={() => setDisplayFriendBlock("youmayknow")} className={btnStyle}>You May Know</button>
            </div>

            <div>
                {displayFriendBlock == "friend" && (
                    <div className=''>
                        <h1 className='mb-3 text-xl font-bold'>All Friends</h1>
                        {myFriends.length > 0 ?
                            <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 md:gap-3 gap-2'>
                                {myFriends.map((friend, idx) => <MyFriendsCard friend={friend} key={idx} />)}
                            </div>
                            :
                            <div className='flex justify-center items-center min-h-[70vh]'>
                                <h1 className='text-zinc-800'>You dont have any friend!</h1>
                            </div>
                        }
                    </div>
                )}

                {displayFriendBlock === "friendrequest" && (
                    <div>
                        <h1 className='mb-3 text-xl font-bold'>Friend Requests</h1>
                        {friendsRequest?.length >= 1 ? (
                            <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 md:gap-3 gap-2'>
                                {friendsRequest.map((friend, idx) => (
                                    <FriendsRequestCard friend={friend} key={idx} />
                                ))}
                            </div>
                        ) : (
                            <div className='flex justify-center items-center min-h-[70vh]'>
                                <h1 className='text-zinc-800'>No friend request found!</h1>
                            </div>
                        )}
                    </div>
                )}
                {/* No Sent request found */}
                {displayFriendBlock === "sentrequest" && (
                    <div>
                        <h1 className='mb-3 text-xl font-bold'>Sent Requests</h1>
                        {sentRequests?.length >= 1 ? (
                            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 md:gap-3 gap-2'>
                                {sentRequests.map((friend, idx) => (
                                    <SentRequestCard friend={friend} key={idx} />
                                ))}
                            </div>
                        ) : (
                            <div className='flex justify-center items-center min-h-[70vh]'>
                                <h1 className='text-zinc-800'>You don't sent any requests!</h1>
                            </div>
                        )}
                    </div>
                )}

                {displayFriendBlock == "youmayknow" && (
                    < div className=''>
                        <h1 className='mb-3 text-xl font-bold'>People you may know</h1>
                        {youMayKnowFriends ?
                            <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 md:gap-3 gap-2'>
                                {youMayKnowFriends.map((friend, idx) => <PeopleYouMayKnow friend={friend} key={idx} />)}
                            </div>
                            :
                            <div className='flex justify-center items-center min-h-[70vh]'>
                                <h1 className='text-zinc-800'>no people found!</h1>
                            </div>
                        }
                    </div>
                )}
            </div >
        </div>
    )
}

export default FriendsPage