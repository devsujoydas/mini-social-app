import { FaUserFriends } from 'react-icons/fa';
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaLightbulb } from "react-icons/fa";
import { MdWebStories } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { AuthContext } from '../../Pages/PrivateRoute/AuthProvider';
import { useContext } from 'react';

const Nav = () => {
    const { userData, postsData, usersPostsData, friendsData } = useContext(AuthContext)

    return (
        <div className="md:space-y-7 space-y-4 md:px-5 px-3">

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <IoHome className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Home </span>
                </div>
                <div>
                    <p className='px-2 py-1 bg-zinc-300 rounded-full'>{postsData.length}</p>
                </div>
            </NavLink>

            <NavLink to={`/profile`}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <img className="w-7 h-7 object-cover rounded-full" src={!userData?.profilephotourl ? `/default.jpg` : `${userData?.profilephotourl}`} alt="" />
                    <span className="font-semibold ">Profile</span>
                </div>
                <div>
                    <p className='px-2 py-1 bg-zinc-300 rounded-full'>{usersPostsData.length}</p>
                </div>
            </NavLink>

            <div className='bg-zinc-200 h-1.5'></div>

            <NavLink to={"/message/ironman"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <BiSolidMessageRounded className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Message</span>
                </div>
            </NavLink>

            <NavLink to={"/friends"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <FaUserFriends className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Friend Suggested</span>
                </div>
                <div>
                    <p className='px-2 py-1 bg-zinc-300 rounded-full'>{friendsData.length}</p>
                </div>
            </NavLink>


            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <MdWebStories className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Stories</span>
                </div>
            </NavLink>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <FaTicketAlt className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Events</span>
                </div>
            </NavLink>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <FaLightbulb className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Memories</span>
                </div>
            </NavLink>
        </div>
    )
}

export default Nav