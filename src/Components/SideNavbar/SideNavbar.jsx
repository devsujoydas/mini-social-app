import { IoSettingsOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu"
import { LuBell } from "react-icons/lu";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Pages/PrivateRoute/AuthProvider";
import { useContext } from "react";

const SideNavbar = () => {
  const { user, userData } = useContext(AuthContext)
  const { profilephotourl } = userData

  return (
    <div className="md:sticky top-0 bg-white flex items-center justify-between px-5 py-[17px]  border-b border-zinc-400">
      <div className=" cursor-pointer active:scale-95 transition-all">
        <Link to={`/profile`} className="relative">
          <img className="w-15.5 rounded-full" src={!profilephotourl ? `/default.jpg` : `${profilephotourl}`} alt="" />
          <h1 className="absolute bottom-0 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></h1>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="border border-zinc-400 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
          <LuMessageCircleMore className="" />
        </div>
        <div className="border border-zinc-400 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
          <LuBell className="" />
        </div>
        <div className="border  border-zinc-400 text-2xl p-3 rounded-full cursor-pointer  transition-all hover:bg-zinc-200 ">
          <IoSettingsOutline className="active:rotate-45 transition-all" />
        </div>
      </div>
    </div>
  )
}

export default SideNavbar