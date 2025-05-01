import { BsThreeDotsVertical } from "react-icons/bs"
import { LuBell } from "react-icons/lu";
import { FiGift } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { LuGraduationCap } from "react-icons/lu";


const UpcommingEvents = () => {
  return (
    <div>
      <div className="flex justify-between items-center pt-2">
        <h1 className="text-xl font-semibold">Upcoming Events</h1>
        <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
      </div>

      <hr className="text-zinc-300 my-5" />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
            <FiGift />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Friends Birthday</h1>
            <p className="text-zinc-500">Jun 25, 2025</p>
          </div>
        </div>
        <LuBell className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
            <IoMoonOutline />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Holiday</h1>
            <p className="text-zinc-500">Feb 14, 2025</p>
          </div>
        </div>
        <LuBell className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
            <GrGroup />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Group Meetup</h1>
            <p className="text-zinc-500">Oct 22, 2025</p>
          </div>
        </div>
        <LuBell className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
            <LuGraduationCap />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Graduation</h1>
            <p className="text-zinc-500">Dec 18, 2025</p>
          </div>
        </div>
        <LuBell className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />



    </div >
  )
}

export default UpcommingEvents