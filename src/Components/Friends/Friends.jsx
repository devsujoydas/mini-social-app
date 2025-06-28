import { useContext, useState } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider.jsx'
import FriendsRequestCard from './FriendsRequestCard.jsx'
import PeopleYouMayKnow from './PeopleYouMayKnow.jsx'



const Friends = () => {
    const { friendsData } = useContext(AuthContext)
    const [friendStatus, setFriendStatus] = useState(true)



    return (
        <div className='md:p-8 min-h-screen p-3 lg:pt-8 md:pt-20 pt-20'>
            

            <div className=' '>
                <h1 className='mb-3 text-xl font-bold'>Friend Requests</h1>
                {/* Request Container */}

                {friendStatus ?
                    <div className='grid  md:grid-cols-3 lg:grid-cols-5 md:gap-4 gap-3'>
                        {friendsData.map((friend, idx) => <FriendsRequestCard friend={friend} key={idx} />)}
                    </div>
                    :
                    <div className='flex justify-center items-center min-h-30'>
                        <h1 className='text-zinc-400'>no friend request found!</h1>
                    </div>
                }
            </div>

            <hr className='md:my-8 my-5 text-zinc-300' />

            <div className=' '>
                <h1 className='mb-3 text-xl font-bold'>People you may know</h1>
                {/* People You may know Container */}

                {friendStatus ?
                    <div className='grid  md:grid-cols-3 lg:grid-cols-5 md:gap-4 gap-3'>
                        {friendsData.map((friend, idx) => <PeopleYouMayKnow friend={friend} key={idx} />)}
                    </div>
                    :
                    <div className='flex justify-center items-center min-h-30'>
                        <h1 className='text-zinc-400'>no people found!</h1>
                    </div>
                }
            </div>

        </div>
    )
}

export default Friends