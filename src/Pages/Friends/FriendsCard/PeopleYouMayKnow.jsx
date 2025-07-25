import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../AuthProvider/AuthProvider';


const PeopleYouMayKnow = ({ friend }) => {
    const { addFriendBtnHanlder, unFriendBtnHanlder, } = useContext(AuthContext)
    const btnStyle = "block md:py-2 py-1.5  text-sm font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "
    const { profilephotourl, name, username } = friend;
    const [addStatus, setAddStatus] = useState(true)


    const addFriendHandler = () => {
        addFriendBtnHanlder(friend)
        
        setAddStatus(false)
    }
    const cencelBtnHandler = () => {
        toast.success('Cencel!')
        setAddStatus(true)
    }


    return (
        <div className='border border-zinc-200 shadow-md overflow-hidden rounded-lg md:block flex '>

            <Toaster position="bottom-center" reverseOrder={true} />

            <div className='md:p-0 p-2 '>
                <Link to={`/friends/${friend.username}`}>
                    <img className='md:w-full w-24 md:h-52 h-22 object-cover scale md:rounded-none rounded-full' src={!friend?.profilephotourl ? `/default.jpg` : `${friend?.profilephotourl}`} alt="" />
                </Link>
            </div>
            <div className='md:p-3 p-2 md:w-full w-3/4'>
                <div className=''>
                    <Link to={`/friends/${friend.username}`} className='space-y-1 mb-2'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[16px]   text-wrap font-semibold'>{name}</h1>
                            <h1 className='md:text-sm text-xs mb-1 -mt-2'>@ {username}</h1>
                        </div>
                    </Link>
                    <div className='flex md:flex-col  gap-2'>
                        {addStatus ?
                            <button onClick={() => addFriendHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Add friend</button>
                            :
                            <button onClick={() => cencelBtnHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Sent Request</button>
                        }
                        <button className={`${btnStyle} bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-300`} >Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PeopleYouMayKnow