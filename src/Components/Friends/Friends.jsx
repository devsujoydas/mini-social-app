import React, { useContext } from 'react'
import Friend from './Friend'
import { AuthContext } from '../../Pages/PrivateRoute/AuthProvider'

const Friends = () => {

    const { friends } = useContext(AuthContext)

    console.log(friends)
    return (
        <div className='md:p-10 p-5 md:mt-0 mt-20 space-y-10 '>
            <h1 className="font-semibold text-4xl text-center font-family-secondary text-blue-600">All Friends</h1>

            {
                friends.length == 0
                    ?
                    <div className='flex justify-center items-center text-zinc-400 h-[70vh]'>
                        <h1>No friends available...</h1>
                    </div>
                    :
                    <div className='grid md:grid-cols-4 grid-cols-2 gap-5'>
                        {friends.map((friend, idx) => <Friend friend={friend} key={idx} />)}
                    </div>
            }
        </div>
    )
}

export default Friends