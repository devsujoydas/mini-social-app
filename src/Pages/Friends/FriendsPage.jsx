import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider.jsx'
import MyFriendsCard from './FriendsCard/MyFriendsCard.jsx'
import FriendsRequestCard from './FriendsCard/FriendsRequestCard.jsx'
import PeopleYouMayKnow from './FriendsCard/PeopleYouMayKnow.jsx'


const FriendsPage = () => {
    const { youMayKnowFriends, requestFriends, myFriends, } = useContext(AuthContext)



    const [displayFriendBlock, setDisplayFriendBlock] = useState("youmayknow")


    const btnStyle = "border border-zinc-200 py-1 px-4 rounded-md hover:bg-zinc-100 cursor-pointer active:scale-95 transition-all duration-300 font-family-secondary"

    return (
        <div className='md:p-7 min-h-screen p-3 lg:pt-7 md:pt-20 pt-20 relative'>

            <div className='sticky top-0 backdrop-blur-2xl flex gap-5 items-center mb-5 border border-zinc-200 rounded-2xl p-5 bg-white'>
                <button onClick={() => setDisplayFriendBlock("friend")} className={`${btnStyle} relative`}>
                    Friends
                    <span className={`${myFriends.length == 0 ? "hidden" : "absolute"} -top-2 -right-1.5 border px-1 bg-emerald-500 text-xs rounded-full text-white`}>{myFriends.length}</span>
                </button>
                <button onClick={() => setDisplayFriendBlock("request")} className={`${btnStyle} relative`}>
                    Request
                    <span className={`${requestFriends.length == 0 ? "hidden" : "absolute"} -top-2 -right-1.5 border px-1 bg-emerald-500 text-xs rounded-full text-white`}>{requestFriends.length}</span>
                </button>
                <button onClick={() => setDisplayFriendBlock("youmayknow")} className={btnStyle}>You May Know</button>
            </div>
            <div>
                {displayFriendBlock == "friend" &&
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
                }


                {displayFriendBlock === "request" && (
                    <div>
                        <h1 className='mb-3 text-xl font-bold'>Friend Requests</h1>
                        {requestFriends?.length >= 1 ? (
                            <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 md:gap-3 gap-2'>
                                {requestFriends.map((friend, idx) => (
                                    <FriendsRequestCard friend={friend} key={idx} />
                                ))}
                            </div>
                        ) : (
                            <div className='flex justify-center items-center min-h-[70vh]'>
                                <h1 className='text-zinc-800'>no friend request found!</h1>
                            </div>
                        )}
                    </div>
                )}


                {displayFriendBlock == "youmayknow" &&
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
                }
            </div >
        </div>
    )
}

export default FriendsPage