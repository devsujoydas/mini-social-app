import { BsThreeDotsVertical } from "react-icons/bs"
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";


const ProfileSidebar = () => {
  return (
    <div className="  space-y-6">

      {/* profile section  */}
      <div className=" flex justify-center items-center flex-col gap-8">

        <div className="">
          <img className="w-30" src="/public/profile-avatar.png" alt="" />
        </div>

        <div className=" text-center space-y-1">
          <h1 className="font-semibold text-xl">X_AE_C-921</h1>
          <h1 className="">@devsujoydas</h1>
          <p className="text-zinc-500">Osaka, Japan</p>
        </div>

        <div className=" flex justify-center items-center gap-5">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">548</h1>
            <h1 className="text-xl font-medium text-zinc-500">Post</h1>
          </div>
          <div className="text-center border-zinc-300 border-r-2 border-l-2 px-4">
            <h1 className="text-2xl font-semibold">12.7K</h1>
            <h1 className="text-xl font-medium text-zinc-500">Followes</h1>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">221</h1>
            <h1 className="text-xl font-medium text-zinc-500">Following</h1>
          </div>
        </div>

      </div>

      {/* about me */}
      <div className="space-y-3">
        <h1 className="font-semibold text-xl ">About Me</h1>
        <p className="text-zinc-500">Hi there! 👋 I'm X-AE-A-19, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.</p>
        <a className="text-blue-600 font-semibold text-lg hover:text-blue-500" href="/profile" >Read More</a>
      </div>


      {/* contact  */}
      <div>
        <div className="flex justify-between items-center pt-2">
          <h1 className="text-xl font-semibold">Contact Infomation</h1>
          <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
        </div>

        <hr className="text-zinc-300 my-5" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
              <IoCallOutline />
            </div>
            <div>
              <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Phone Number</h1>
              <p className="text-zinc-500">+01303436299</p>
            </div>
          </div>
          <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
        </div>

        <hr className="text-zinc-300 my-5" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
              <MdOutlineEmail />
            </div>
            <div>
              <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Email Address</h1>
              <p className="text-zinc-500">devsujoydas@gmail.com</p>
            </div>
          </div>
          <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
        </div>

        <hr className="text-zinc-300 my-5" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
              <TbWorldWww />
            </div>
            <div>
              <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Website</h1>
              <p className="text-zinc-500">www.devsujoydas.verel.app</p>
            </div>
          </div>
          <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
        </div>

        <hr className="text-zinc-300 my-5" />

      </div >

      {/* Friends */}
      <div className="space-y-3  ">
        <div className="flex justify-between items-center pt-2">
          <h1 className="text-xl font-semibold">Friends</h1>
          <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
        </div>


        <div>
          <hr className="text-zinc-300 my-5" />

          {/* Friend 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="active:scale-95 transition-all cursor-pointer">
                <img className="w-10" src="/public/friends-avater.png" alt="" />
              </div>
              <div>
                <h1 className="font-semibold active:underline transition-all cursor-pointer">Julia Smith</h1>
                <p className="text-zinc-500 text-sm">@juliasmith</p>
              </div>
            </div>
            <RiDeleteBin6Line className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>

          <hr className="text-zinc-300 my-5" />

          {/* Friend 2 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="active:scale-95 transition-all cursor-pointer">
                <img className="w-10" src="/public/friends-avater.png" alt="" />
              </div>
              <div>
                <h1 className="font-semibold active:underline transition-all cursor-pointer">Julia Smith</h1>
                <p className="text-zinc-500 text-sm">@juliasmith</p>
              </div>
            </div>
            <RiDeleteBin6Line className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>

          <hr className="text-zinc-300 my-5" />

          {/* Friend 3 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="active:scale-95 transition-all cursor-pointer">
                <img className="w-10" src="/public/friends-avater.png" alt="" />
              </div>
              <div>
                <h1 className="font-semibold active:underline transition-all cursor-pointer">Julia Smith</h1>
                <p className="text-zinc-500 text-sm">@juliasmith</p>
              </div>
            </div>
            <RiDeleteBin6Line className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>

          <hr className="text-zinc-300 my-5" />

        </div>
        <br />
        <br />
      </div>



    </div>
  )
}

export default ProfileSidebar