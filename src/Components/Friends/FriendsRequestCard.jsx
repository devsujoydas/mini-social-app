import { useState } from 'react'
import { Link } from 'react-router-dom';

const FriendsCard = ({ friend }) => {
    const { profilephotourl, name, username } = friend;
    const [addStatus, setAddStatus] = useState(true)
    const btnStyle = "block md:py-2 py-1.5  text-sm font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "

    return (
        <div className='border border-zinc-200 shadow-md overflow-hidden rounded-lg md:block flex '>
            <div className='md:p-0 p-2 '>
                <Link to={`/friends/${friend.username}`}>
                    <img className='md:w-full w-22 md:h-66 h-22 object-cover md:rounded-none rounded-full' src={!profilephotourl ? `/default.jpg` : `${profilephotourl}`} alt="" />
                </Link>
            </div>
            <div className='md:p-3 p-2 md:w-full w-3/4'>
                <div className='space-y-2   '>
                    <div className='flex flex-col gap-2'>
                        <Link to={`/friends/${friend.username}`}>
                            <h1 className='text-[16px]   text-wrap font-semibold'>{name}</h1>
                        </Link>
                        <h1 className='md:text-sm text-xs -mt-2'>@ {username}</h1>
                    </div>
                    <div className='flex md:flex-col  gap-2'>
                        {addStatus ?
                            <button onClick={() => setAddStatus(false)} className={`${btnStyle} bg-blue-600 hover:bg-blue-500 active:bg-blue-500 text-white`}  >Confirm</button>
                            :
                            <button onClick={() => setAddStatus(true)} className={`${btnStyle} bg-blue-600 hover:bg-blue-500 active:bg-blue-500 text-white`}  >Confirmed</button>
                        }
                        <button className={`${btnStyle} bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-300`} >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendsCard