import { IoSearch } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [humbarger, setHumbarger] = useState(1)


  return (
    <div className="md:sticky left-0 top-0 ">

      <div className="fixed z-50 w-full bg-white left-0 top-0 border-b border-zinc-400 lg:hidden flex justify-between items-center px-8 py-2">
        <Link to={"/"} className="text-3xl font-semibold font-montserrat">Xenon Media</Link>
        <div onClick={() => setHumbarger(!humbarger)} className="text-5xl cursor-pointer active:scale-95 transition-all">
          <IoMenu />
        </div>
      </div>

      {/* nav for lg device  */}
      <div className=" ">
        <div className=" px-5 py-5 hidden lg:flex flex-col justify-between h-[100vh] border-r border-zinc-300">

          <div className=" space-y-6 ">

            {/* nav logo  */}
            <div className="">
              <Link to={"/"} className="text-3xl font-semibold font-montserrat">Xenon Media</Link>
            </div>

            {/* search box  */}
            <div className="flex items-center gap-2 relative">
              <input className=" text-xl border border-zinc-300 py-2 pl-10 w-full rounded-full outline-zinc-300" type="text" placeholder="Search..." />
              <IoSearch className="absolute left-3 text-2xl cursor-pointer text-zinc-600" />
            </div>


            {/* nav btn container  */}
            <Nav />
          </div>

          <div className="space-y-5">
            <div className="text-lg p-4 rounded-2xl bg-[#f4f6f8] space-y-5">
              <div className="flex justify-between items-start  text-2xl">
                <div className="font-semibold bg-[#d7dfeb]  rounded-full p-4">
                  <FiAlertTriangle />
                </div>
                <IoCloseSharp className="cursor-pointer active:scale-95 transition-all" />
              </div>
              <h1 className="text-sm">Enjoy unlimited access to our app with only a small price monthly.</h1>
              <div className="font-semibold space-x-5">
                <button className="cursor-pointer active:scale-95 transition-all">Dismiss</button>
                <button className="text-[#2b1fff] cursor-pointer active:scale-95 transition-all">Go Pro</button>
              </div>
            </div>

            <hr className="text-zinc-300" />

            <div className=" flex justify-between items-center cursor-pointer">
              <Link to={"/profile"}>
                <div className="flex items-center gap-4">
                  <img className="w-14" src="/Avatar.png" alt="" />
                  <div className="">
                    <h1 className="font-semibold text-xl">Sujoy Das</h1>
                    <p>Basic Member</p>
                  </div>
                </div>
              </Link>
              <RxExit className="text-3xl cursor-pointer m-3" />
            </div>
          </div>

        </div>
      </div>



      {/* nav for sm device  */}
      <div className={humbarger ? 'bg-white md:hidden fixed z-20 top-0 -left-121 w-full  opacity-0 duration-700 transition-all' : 'bg-white md:hidden opacity-100 fixed z-50 top-0 left-0 w-full   duration-700 transition-all'} >

        <div className="p-5 bg-white border ">

          <div className=" space-y-7 ">
            {/* nav logo  */}
            <div className=" flex justify-between items-center">
              <Link to={"/"} className="text-3xl font-semibold font-montserrat">Xenon Media</Link>
              <IoCloseSharp onClick={() => setHumbarger(!humbarger)} className="text-5xl" />
            </div>

            {/* search box  */}
            <div className="flex items-center gap-2 relative">
              <input className=" text-xl border border-zinc-300 md:py-2  py-3 pl-10 w-full rounded-full outline-zinc-300" type="text" placeholder="Search..." />
              <IoSearch className="absolute left-3 text-2xl cursor-pointer text-zinc-600" />
            </div>


            {/* nav btn container  */}
            <div onClick={() => setHumbarger(!humbarger)} >
              <Nav />
            </div>

          </div>

          <div className=" space-y-6 pt-5">
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


            <div onClick={() => setHumbarger(!humbarger)} className=" flex justify-between items-center cursor-pointer">
              <Link to={"/profile"}>
                <div className="flex items-center gap-4">
                  <img className="w-14" src="/Avatar.png" alt="" />
                  <div className="">
                    <h1 className="font-semibold text-xl">Sujoy Das</h1>
                    <p>Basic Member</p>
                  </div>
                </div>
              </Link>

              <RxExit className="text-3xl cursor-pointer m-3" />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Navbar