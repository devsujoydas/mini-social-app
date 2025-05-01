import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { RiHomeLine } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaUserFriends } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { GrCreditCard } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { LuMessageCircleMore } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { RxExit } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="px-5 py-10 flex flex-col ">

      <div className=" space-y-7 ">

        {/* nav logo  */}
        <div className="">
          <h1 className="text-4xl font-semibold font-montserrat">Mini Social App</h1>
        </div>

        {/* search box  */}
        <div className="flex items-center gap-2 relative">
          <input className=" text-xl border border-zinc-300 py-2 pl-10 w-full rounded-full outline-zinc-300" type="text" placeholder="Search..." />
          <IoSearch className="absolute left-3 text-2xl cursor-pointer text-zinc-600" />
        </div>


        {/* nav btn container  */}
        <div className="space-y-6 px-5">

          <NavLink to={"/"}
            className="flex justify-between w-full cursor-pointer  border-b pb-1 border-transparent hover:border-black transition-all hover:text-blue-500 ">
            <div className="flex items-center gap-2 text-xl ">
              <RiHomeLine className="text-zinc-500 text-2xl" />
              <span className="font-semibold ">Feed</span>
            </div>
            <p className="border  rounded-full p-1 px-2 bg-[#cad1f5]">10</p>
          </NavLink>

          <NavLink to={"/"}
            className="flex justify-between w-full cursor-pointer  border-b pb-1 border-transparent hover:border-black transition-all hover:text-blue-500 ">
            <div className="flex items-center gap-2 text-xl ">
              <TfiMenuAlt className="text-zinc-500 text-2xl" />
              <span className="font-semibold ">Stories</span>
            </div>
          </NavLink>

          <NavLink to={"/"}
            className="flex justify-between w-full cursor-pointer  border-b pb-1 border-transparent hover:border-black transition-all hover:text-blue-500 ">
            <div className="flex items-center gap-2 text-xl ">
              <FaUserFriends className="text-zinc-500 text-2xl" />
              <span className="font-semibold ">Friends</span>
            </div>
            <p className="border  rounded-full p-1 px-2 bg-[#cad1f5]">2</p>
          </NavLink>

          <NavLink to={"/"}
            className="flex justify-between w-full cursor-pointer  border-b pb-1 border-transparent hover:border-black transition-all hover:text-blue-500 ">
            <div className="flex items-center gap-2 text-xl ">
              <BsBox className="text-zinc-500 text-2xl" />
              <span className="font-semibold ">APIs</span>
            </div>
          </NavLink>

          <NavLink to={"/"}
            className="flex justify-between w-full cursor-pointer  border-b pb-1 border-transparent hover:border-black transition-all hover:text-blue-500 ">
            <div className="flex items-center gap-2 text-xl ">
              <GrCreditCard className="text-zinc-500 text-2xl" />
              <span className="font-semibold ">Subscription</span>
            </div>
          </NavLink>

          <NavLink to={"/"}
            className="flex justify-between w-full cursor-pointer  border-b pb-1 border-transparent hover:border-black transition-all hover:text-blue-500 ">
            <div className="flex items-center gap-2 text-xl ">
              <IoMdSettings className="text-zinc-500 text-2xl" />
              <span className="font-semibold ">Settings</span>
            </div>
          </NavLink>

          <NavLink to={"/"}
            className="flex justify-between w-full cursor-pointer  border-b pb-1 border-transparent hover:border-black transition-all hover:text-blue-500 ">
            <div className="flex items-center gap-2 text-xl ">
              <LuMessageCircleMore className="text-zinc-500 text-2xl" />
              <span className="font-semibold ">Help & Support</span>
            </div>
          </NavLink>



        </div>
      </div>

      <div className="mt-20 space-y-7">
        <div className="text-lg p-5 rounded-2xl bg-[#f4f6f8] space-y-5">
          <div className="flex justify-between items-start  text-3xl">
            <div className="font-semibold bg-[#d7dfeb]  rounded-full p-4">
              <FiAlertTriangle />
            </div>
            <IoCloseSharp className="cursor-pointer active:scale-95 transition-all" />
          </div>
          <h1 className="">Enjoy unlimited access to our app with only a small price monthly.</h1>
          <div className="font-semibold space-x-5">
            <button className="cursor-pointer active:scale-95 transition-all">Dismiss</button>
            <button className="text-[#2b1fff] cursor-pointer active:scale-95 transition-all">Go Pro</button>
          </div>
        </div>

        <hr className="text-zinc-300" />
        {/* 01619630739 */}
        <div className=" flex justify-between items-center cursor-pointer">

          <div className="flex items-center gap-4">
            <img className="w-14" src="/public/Avatar.png" alt="" />
            <div className="">
              <h1 className="font-semibold text-xl">Sujoy Das</h1>
              <p>Basic Member</p>
            </div>
          </div>

          <RxExit className="text-3xl cursor-pointer m-3" />
        </div>
      </div>

    </div>
  )
}

export default Navbar