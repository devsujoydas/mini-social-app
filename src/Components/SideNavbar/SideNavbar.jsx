
import { IoSettingsOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu"
import { LuBell } from "react-icons/lu";


const SideNavbar = () => {
  return (
    <div className=" flex items-center justify-between p-5  border-b border-zinc-400">
      <div className=" relative cursor-pointer active:scale-95 transition-all">
        <img className="w-15.5" src="/public/Avatar (1).png" alt="" />
        <h1 className="absolute bottom-0 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="border border-zinc-400 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
          <LuMessageCircleMore />
        </div>
        <div className="border border-zinc-400 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
          <LuBell />
        </div>
        <div className="border border-zinc-400 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
          <IoSettingsOutline />
        </div>
      </div>
    </div>
  )
}

export default SideNavbar