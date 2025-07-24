import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider.jsx'
import FriendsRequestCard from './FriendsRequestCard.jsx'
import PeopleYouMayKnow from './PeopleYouMayKnow.jsx'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import MyFriendsCard from './MyFriendsCard.jsx';


const Friends = () => {
    const { friendsData } = useContext(AuthContext)

    const [yourFriends, setYourFriends] = useState([])
    const [requestFriends, setRequestFriends] = useState([])
    const [youMayKnowFriends, setYouMayKnowFriends] = useState([])


    useEffect(() => {
        if (friendsData?.length > 0) {
            setYourFriends(friendsData.slice(4, 10))
            setRequestFriends(friendsData.slice(0, 3))
            setYouMayKnowFriends(friendsData.slice(0, 10))
        }
    }, [friendsData])

    console.log(requestFriends);
    console.log(youMayKnowFriends);



    const [displayFriendBlock, setDisplayFriendBlock] = useState("friend")

    const btnStyle = "border border-zinc-200 py-1 px-4 rounded-md hover:bg-zinc-100 cursor-pointer active:scale-95 transition-all duration-300 font-family-secondary"

    return (
        <div className='md:p-7 min-h-screen p-3 lg:pt-7 md:pt-20 pt-20 relative'>

            <div className='sticky top-0 backdrop-blur-2xl flex gap-5 items-center mb-5 border border-zinc-200 rounded-2xl p-5 bg-white'>
                <button onClick={() => setDisplayFriendBlock("friend")} className={btnStyle}>Friends</button>
                <button onClick={() => setDisplayFriendBlock("request")} className={btnStyle}>Request</button>
                <button onClick={() => setDisplayFriendBlock("youmayknow")} className={btnStyle}>You May Know</button>
            </div>


            {displayFriendBlock == "friend" &&
                <div className=' '>
                    <h1 className='mb-3 text-xl font-bold'>All Friends</h1>

                    {yourFriends ?
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 md:gap-3 gap-2'>
                            {yourFriends.map((friend, idx) => <MyFriendsCard friend={friend} key={idx} />)}
                        </div>
                        :
                        <div className='flex justify-center items-center min-h-30'>
                            <h1 className='text-zinc-400'>no friend request found!</h1>
                        </div>
                    }
                    {/* <hr className='md:my-8 my-5 text-zinc-300' /> */}
                </div>
            }

            {displayFriendBlock == "request"
                &&
                <div className=' '>
                    <h1 className='mb-3 text-xl font-bold'>Friend Requests</h1>
                    {/* Request Container */}

                    {requestFriends ?
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 md:gap-3 gap-2'>
                            {requestFriends.map((friend, idx) => <FriendsRequestCard friend={friend} key={idx} />)}
                        </div>
                        :
                        <div className='flex justify-center items-center min-h-30'>
                            <h1 className='text-zinc-400'>no friend request found!</h1>
                        </div>
                    }
                    {/* // <hr className='md:my-8 my-5 text-zinc-300' /> */}
                </div>
            }

            {displayFriendBlock == "youmayknow" &&
                < div className=' '>
                    <h1 className='mb-3 text-xl font-bold'>People you may know</h1>
                    {/* People You may know Container */}

                    {youMayKnowFriends ?
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 md:gap-3 gap-2'>
                            {youMayKnowFriends.map((friend, idx) => <PeopleYouMayKnow friend={friend} key={idx} />)}
                        </div>
                        :
                        <div className='flex justify-center items-center min-h-30'>
                            <h1 className='text-zinc-400'>no people found!</h1>
                        </div>
                    }
                </div>
            }
        </div >
    )
}

export default Friends