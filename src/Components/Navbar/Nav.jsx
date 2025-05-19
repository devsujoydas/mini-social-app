import { BsBox } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { GrCreditCard } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuMessageCircleMore } from 'react-icons/lu';
import { RiHomeLine } from 'react-icons/ri';
import { TfiMenuAlt } from 'react-icons/tfi';
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className="space-y-7 px-5">

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <RiHomeLine className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Home</span>
                </div>
                <p className="border  rounded-full p-1 px-2 bg-[#cad1f5]">10</p>
            </NavLink>

            <NavLink to={"/login"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <TfiMenuAlt className="text-zinc-500 text-2xl" />
                    {/* <span className="font-semibold ">Task</span> */}
                    <span className="font-semibold ">Log In</span>
                </div>
            </NavLink>

            <NavLink to={"/signup"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <FaUserFriends className="text-zinc-500 text-2xl" />
                    {/* <span className="font-semibold ">Users</span> */}
                    <span className="font-semibold ">Sign Up</span>
                </div>
                <p className="border  rounded-full p-1 px-2 bg-[#cad1f5]">2</p>
            </NavLink>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <BsBox className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">APIs</span>
                </div>
            </NavLink>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <GrCreditCard className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Subscription</span>
                </div>
            </NavLink>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <IoSettingsOutline className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Settings</span>
                </div>
            </NavLink>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 text-xl ">
                    <LuMessageCircleMore className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Help & Support</span>
                </div>
            </NavLink>

        </div>
    )
}

export default Nav