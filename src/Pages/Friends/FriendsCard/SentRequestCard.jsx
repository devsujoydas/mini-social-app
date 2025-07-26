import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../AuthProvider/AuthProvider';


const SentRequestCard = ({ friend }) => {
    const { addFriendBtnHanlder } = useContext(AuthContext)

    const { profilephotourl, name, username, email } = friend;
    const [addStatus, setAddStatus] = useState(true)
    const btnStyle = "block md:py-2 py-1.5  text-sm font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "

    const cencelBtnHandler = () => {
        addFriendBtnHanlder(friend) 
        setAddStatus(true)
    }

    return (
        <div className='border border-zinc-200 shadow-md overflow-hidden rounded-lg md:block flex flex-col '>

            <Toaster position="bottom-center" reverseOrder={true} />

            <div className='md:p-0 p-2 '>
                <Link to={`/friends/${friend.username}`}>
                    <img className='w-full md:h-52 h-30 object-cover' src={!profilephotourl ? `/default.jpg` : `${profilephotourl}`} alt="" />
                </Link>
            </div>
            <div className='md:p-3 p-2 w-full relative'>
                {
                    friend?.onlineStatus &&
                    <h1 className='text-emerald-600 font-bold text-xs absolute right-2 top-1'> Online</h1>
                }
                <div className='space-y-2   '>
                    <div className='flex flex-col gap-2'>
                        <Link to={`/friends/${friend.username}`}>
                            <h1 className='md:text-[16px] text-sm  text-wrap font-semibold'>{name}</h1>
                        </Link>
                        <h1 className='md:text-sm text-xs -mt-2'>@ {username}</h1>

                    </div>
                    <div className='flex md:flex-col  gap-2'>
                        <button onClick={() => cencelBtnHandler()} className={`${btnStyle} bg-blue-600 hover:bg-blue-500 active:bg-blue-500 text-white md:text-[16px] text-xs`}  >Cencel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SentRequestCard