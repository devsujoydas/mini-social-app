 
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
const Memories = () => {
    const navigate = useNavigate()

    return (
        <div className='h-[100vh] overflow-hidden  md:pt-5 pt-18 px-5'>
            <h1 className='md:text-2xl text-xl font-semibold  text-blue-600'>Memories</h1>
            <div className='flex justify-center items-center h-full flex-col gap-2'>
                <h1 className=' md:text-4xl text-3xl font-semibold font-family-secondary text-blue-600'>Comming Soon . . . </h1>
                <h1 className='text-sm font-semibold'>Still Work On it</h1>

                <button onClick={() => navigate(-1)} className='mt-2 cursor-pointer shadow-md active:shadow-none   border border-blue-300 hover:border-zinc-200 p-3 text-3xl rounded-full bg-zinc-100 hover:bg-zinc-200 text-blue-600 font-bold transition-all'><IoMdArrowRoundBack /></button>
            </div>
        </div>
    )
}

export default Memories