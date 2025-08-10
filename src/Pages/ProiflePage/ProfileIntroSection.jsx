
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";



const ProfileIntroSection = () => {
    return (
        <div className='text-xs md:text-[14px] text-zinc-600 bg-white lg:w-2/5 border p-4 border-zinc-300 rounded-lg'>

            <h1 className='font-semibold text-lg'>Intro</h1>
            <div className=' text-center space-y-1 my-3'>
                <p className=''>Professional Web Developer || Software Engineers</p>
                <p className='text-blue-500 font-medium'>https://devsujoydas.vercel.app</p>
            </div>
            <button className='font-semibold bg-zinc-200 hover:bg-zinc-300 active:scale-95 cursor-pointer w-full py-2 rounded-sm transition-all'>Edit Bio</button>

            <div className='my-3 grid gap-2 md:gap-5 '>
                <div className='hover:underline cursor-pointer flex items-center gap-2'>
                    <FaUserCircle className='text-lg' />
                    <span className='font-semibold'>Profile </span>• Digital creator
                </div>
                <div className='hover:underline cursor-pointer flex items-center gap-2'>
                    <IoHomeSharp className='text-lg' />
                    Lives in<span className='font-semibold'>Jamalpur, Dhaka, Bangladesh</span>
                </div>
                <div className='hover:underline cursor-pointer flex items-center gap-2'>
                    <FaLocationDot className='text-lg' />
                    From <span className='font-semibold'>Jamalpur, Dhaka, Bangladesh</span>
                </div>
                <div className='hover:underline cursor-pointer flex items-center gap-2'>
                    <FaFacebook className='text-lg' />
                    <Link to={""} className='text-blue-500 font-medium'>https://www.facebook.com/devsujoydas</Link>
                </div>
                <div className='hover:underline cursor-pointer flex items-center gap-2'>
                    <FaLinkedin className='text-lg' />
                    <Link to={""} className='text-blue-500 font-medium'>https://www.linkdin.com/devsujoydas</Link>
                </div>
                <div className='hover:underline cursor-pointer flex items-center gap-2'>
                    <FaGithub className='text-lg' />
                    <Link to={""} className='text-blue-500 font-medium'>https://github.com/devsujoydas</Link>
                </div>
                <div className='hover:underline cursor-pointer flex items-center gap-2'>
                    <FaLink className='text-lg' />
                    <Link to={""} className='text-blue-500 font-medium'>https://devsujoydas.vercel.app</Link>
                </div>
                <div className='hover:underline cursor-pointer flex items-center gap-2'>
                    <FaYoutube className='text-lg' />
                    <Link to={""} className='text-blue-500 font-medium'>https://youtube.com/@devsujoydas</Link>
                </div>
            </div>

            <button className='font-semibold bg-zinc-200 hover:bg-zinc-300 active:scale-95 cursor-pointer w-full py-2 rounded-sm transition-all'>Edit Details</button>


            <button className='mt-3 font-semibold bg-zinc-200 hover:bg-zinc-300 active:scale-95 cursor-pointer w-full py-2 rounded-sm transition-all'>Add Featured</button>

        </div>
    )
}

export default ProfileIntroSection