import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

const FriendSuggested = () => {
  return (
    <div>

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Friend Suggested</h1>
        <Link to="/friends" className="flex items-center text-lg gap-1 text-blue-600 hover:text-black font-semibold">See All <MdOutlineArrowOutward className="text-2xl" /></Link>
      </div>

      <hr className="text-zinc-300 my-5" />

      {/* Friend 1 */}
      <Link to={`/profiles/devahadul`} className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-10 h-10 rounded-full" src="/ahadul.jpg" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all cursor-pointer">Ahadul Islam</h1>
            <p className="text-zinc-500 text-sm">@devahadulislam</p>
          </div>
        </div>
        <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </Link>

      <hr className="text-zinc-300 my-5" />

      {/* Friend 2 */}
      <Link to={`/profiles/devmaksudur`} className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-10 h-10 rounded-full" src="/maksudur.jpg" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all cursor-pointer">Maksudur Rahman</h1>
            <p className="text-zinc-500 text-sm">@devmaksudur</p>
          </div>
        </div>
        <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </Link>

      <hr className="text-zinc-300 my-5" />

      {/* Friend 3 */}
      <Link to={`/profiles/devenamul`} className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-10 h-10 rounded-full" src="/enamul.jpg" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all cursor-pointer">Enamul Haque</h1>
            <p className="text-zinc-500 text-sm">@devenamul</p>
          </div>
        </div>
        <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </Link>

      <hr className="text-zinc-300 my-5" />

    </div>
  )
}

export default FriendSuggested