import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import { useContext, useState } from "react";


const FriendSuggested = () => {
  const { friendsData } = useContext(AuthContext)

  const friend1 = friendsData[0]
  const friend2 = friendsData[1]
  const friend3 = friendsData[2]

  const [loadingSpiner, setLoadingSpiner] = useState(true)

  return (

    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Friends Suggested</h1>
        <Link to="/friends" className="flex items-center text-lg gap-1 text-blue-600 hover:text-black font-semibold">See All <MdOutlineArrowOutward className="text-2xl" /></Link>
      </div>

      {friendsData == ""
          ?
          <div className="min-h-56 flex justify-center items-center">
            <div className="w-10 h-10 border-t-2 border-b-2 rounded-full animate-spin transition-all"></div>
          </div>
          :
          <div>
            <div>
              <hr className="text-zinc-300 my-5" />
              <Link to={`/friends/${friend1?.username}`} className="flex w-full justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="active:scale-95 transition-all cursor-pointer">
                    <img className="w-10 h-10 object-cover rounded-full" src={friend1?.profilephotourl} alt="" />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all cursor-pointer">{friend1?.name}</h1>
                    <p className="text-zinc-500 text-sm">@{friend1?.username}</p>
                  </div>
                </div>
                <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </Link>
              <hr className="text-zinc-300 my-5" />
            </div>

            <div>
              <Link to={`/friends/${friend2?.username}`} className="flex w-full justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="active:scale-95 transition-all cursor-pointer">
                    <img className="w-10 h-10 object-cover rounded-full" src={friend2?.profilephotourl} alt="" />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all cursor-pointer">{friend2?.name}</h1>
                    <p className="text-zinc-500 text-sm">@{friend2?.username}</p>
                  </div>
                </div>
                <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </Link>
              <hr className="text-zinc-300 my-5" />
            </div>

            <div>
              <Link to={`/friends/${friend3?.username}`} className="flex w-full justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="active:scale-95 transition-all cursor-pointer">
                    <img className="w-10 h-10 object-cover rounded-full" src={friend3?.profilephotourl} alt="" />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all cursor-pointer">{friend3?.name}</h1>
                    <p className="text-zinc-500 text-sm">@{friend3?.username}</p>
                  </div>
                </div>
                <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </Link>
              <hr className="text-zinc-300 my-5" />
            </div>
          </div>
      }
    </div>
  )
}

export default FriendSuggested