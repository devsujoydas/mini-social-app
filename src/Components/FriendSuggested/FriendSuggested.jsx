import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";






const FriendSuggested = () => {
  return (
    <div>

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Friend Suggested</h1>
        <a href="/" className="flex items-center text-lg gap-1 text-blue-600 hover:text-black font-semibold">See All <MdOutlineArrowOutward className="text-2xl" /></a>
      </div>

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
        <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
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
        <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
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
        <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />

    </div>
  )
}

export default FriendSuggested