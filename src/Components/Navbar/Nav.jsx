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
    const {  userData } = useContext(AuthContext)
    const { profilephotourl } = userData

    return (
        <div className="space-y-7 px-5">

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <IoHome className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Home</span>
                </div>
            </NavLink>

            <NavLink to={`/profile`}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <img className="w-7 rounded-full" src={!profilephotourl ? `/default.jpg` : `${profilephotourl}`} alt="" />
                    <span className="font-semibold ">Profile</span>
                </div>
            </NavLink>

            <div className='bg-zinc-200 h-1.5'></div>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <BiSolidMessageRounded className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Message</span>
                </div>
            </NavLink>

            <NavLink to={"/friends"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <FaUserFriends className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Firends</span>
                </div>
            </NavLink>


            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <MdWebStories className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Stories</span>
                </div>
            </NavLink>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <FaTicketAlt className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Events</span>
                </div>
            </NavLink>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <FaLightbulb className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Memories</span>
                </div>
            </NavLink>
        </div>
    )
}

export default Nav