import { Link } from "react-router-dom"


const Friend = ({ friend }) => {


    return (
        <div>
            <Link to={`/profiles/${friend?.username}`}>
                <div className='border cursor-pointer border-zinc-300 rounded-md p-5 flex justify-center items-center flex-col gap-3 hover:shadow-lg active:shadow-none duration-300 transition-all  '>
                    <div className='w-20 rounded-full overflow-auto'>
                        <img className='w-full  ' src={friend?.imgURL} alt="" />
                    </div>
                    <div className='text-center'>
                        <h1 className='text-lg font-medium'>{friend?.name}</h1>
                        <h1 className=''>@{friend?.username}</h1>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Friend