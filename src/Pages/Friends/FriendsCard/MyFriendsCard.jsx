import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../AuthProvider/AuthProvider'

const MyFriendsCard = ({ friend }) => {
    const { addFriendBtnHanlder, unFriendBtnHanlder, } = useContext(AuthContext)
    const btnStyle = "block  py-2  text-sm font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "
    const navigate = useNavigate()
    const [addStatus, setAddStatus] = useState(true)

    const addFriendHandler = () => {
        
        addFriendBtnHanlder(friend)
        setAddStatus(true)
    }
    const unFriendHandler = () => {
        toast.success('Unfriend Successfully!')
        // unFriendBtnHanlder(friend.email)
        setAddStatus(false)
    }

    return (
        <div className='border border-zinc-200 shadow-md overflow-hidden rounded-lg md:block flex '>

            <Toaster position="bottom-center" reverseOrder={true} />

            <div className='md:p-0 p-2 '>
                <Link to={`/friends/${friend.username}`}>
                    <img className='md:w-full w-22 md:h-52 h-22 object-cover md:rounded-none rounded-full' src={!friend?.profilephotourl ? `/default.jpg` : `${friend?.profilephotourl}`} alt="" />
                </Link>
            </div>
            <div className='md:p-3 p-2 md:w-full w-3/4 relative'>
                {
                    friend?.onlineStatus &&
                    <h1 className='text-emerald-600 font-bold text-xs absolute right-2 top-1'> Online</h1>
                }
                <div className='space-y-2   '>
                    <div className='flex flex-col gap-2'>
                        <Link to={`/friends/${friend?.username}`}>
                            <h1 className='text-[16px]   text-wrap font-semibold'>{friend?.name}</h1>
                        </Link>
                        <h1 className='md:text-sm text-xs -mt-2'>@ {friend?.username}</h1>

                    </div>
                    <div className='flex md:flex-col  gap-2'>


                        <button onClick={() => { navigate(`/friends/${friend?.username}`) }} className={`${btnStyle} bg-blue-600 hover:bg-blue-500 active:bg-blue-500 text-white`}  >View Profile</button>

                        {addStatus ?
                            <button onClick={() => unFriendHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Unfriend</button>
                            :
                            <button onClick={() => addFriendHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Add friend</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyFriendsCard