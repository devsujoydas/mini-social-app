import { useState } from "react"
import { Link } from 'react-router-dom'

const AllFriends = ({ friend }) => {

    const { profilephotourl, name, username } = friend;
    const [addStatus, setAddStatus] = useState(true)
    const btnStyle = "block  py-1.5  text-sm font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "

    return (
        <div className='border border-zinc-200 shadow-md overflow-hidden rounded-lg flex'>
            <div className=' p-2 '>
                <Link to={`/friends/${friend.username}`}>
                    <img className=' w-20 h-20 object-cover rounded-full' src={!profilephotourl ? `/default.jpg` : `${profilephotourl}`} alt="" />
                </Link>
            </div>
            <div className=' p-2  w-3/4'>
                <div className=''>
                    <Link to={`/friends/${friend.username}`} className='space-y-1 mb-2'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[16px]  text-wrap font-semibold'>{name}</h1>
                            <h1 className='md:text-sm text-xs -mt-2 mb-2'>@ {username}</h1>
                        </div>
                    </Link>
                    <div className='flex   gap-2'>
                        {addStatus ?
                            <button onClick={() => setAddStatus(false)} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Add friend</button>
                            :
                            <button onClick={() => setAddStatus(true)} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Sent Request</button>
                        }
                        <button className={`${btnStyle} bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-300`} >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllFriends