import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import { AuthContext } from '../../../AuthProvider/AuthProvider';


const SentRequestCard = ({ friend }) => {
    const { cancelSentRequestBtnHandler } = useContext(AuthContext)
    const [addStatus, setAddStatus] = useState(true)

    const btnStyle = "block py-2  text-sm font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "

    const cencelBtnHandler = () => {
        cancelSentRequestBtnHandler(friend)
        setAddStatus(false)
    }

    return (
        <div className='border border-zinc-200 shadow-md overflow-hidden rounded-lg md:block flex w-full '>

            <Toaster position="bottom-center" reverseOrder={true} />

            <div className='md:p-0 p-2 '>
                <Link to={`/friends/${friend.username}`}>
                    <img className='w-32  md:w-full md:h-52 h-22 object-cover scale md:rounded-none rounded-full' src={!friend?.profilephotourl ? `/default.jpg` : `${friend?.profilephotourl}`} alt="" />
                </Link>
            </div>

            <div className='md:p-3 p-2 w-full relative'>
                <div className='flex flex-col justify-between h-full   '>
                    <div className='flex flex-col gap-2'>
                        <Link to={`/friends/${friend.username}`}>
                            <h1 className='text-[16px] flex items-center gap-2 text-wrap font-semibold'>{friend?.name}
                                {friend?.onlineStatus && (
                                    <p className='bg-green-400 h-3.5 w-3.5 rounded-full  border border-white'></p>
                                )}
                            </h1>
                        </Link>
                        <h1 className='md:text-sm text-xs -mt-2'>@ {friend.username}</h1>
                    </div>
                    <div className='flex md:flex-col md:mt-2 gap-2'>
                        {
                            addStatus ?
                                <button onClick={() => cencelBtnHandler()} className={`${btnStyle} bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-300`}  >Cencel</button>
                                :
                                <button className={`${btnStyle} bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-300`}  >Cenceled</button>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SentRequestCard