import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";






const FriendSuggested = () => {
  return (
    <div>

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Friend Suggested</h1>
        <h1 className="flex items-center text-lg gap-1 text-blue-600 font-semibold">See All <MdOutlineArrowOutward className="text-2xl" /></h1>
      </div>

      <hr className="text-zinc-300 my-5" />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-12" src="/public/friends-avater.png" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Julia Smith</h1>
            <p className="text-zinc-500">@juliasmith</p>
          </div>
        </div>
        <IoMdAdd className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-12" src="/public/friends-avater.png" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Julia Smith</h1>
            <p className="text-zinc-500">@juliasmith</p>
          </div>
        </div>
        <IoMdAdd className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-12" src="/public/friends-avater.png" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Julia Smith</h1>
            <p className="text-zinc-500">@juliasmith</p>
          </div>
        </div>
        <IoMdAdd className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-12" src="/public/friends-avater.png" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Julia Smith</h1>
            <p className="text-zinc-500">@juliasmith</p>
          </div>
        </div>
        <IoMdAdd className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />


    </div>
  )
}

export default FriendSuggested