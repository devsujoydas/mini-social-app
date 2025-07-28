import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import { useContext, useState } from "react";


const FriendSuggested = () => {
  const { youMayKnowFriends } = useContext(AuthContext)

  return (

    <div>
      <div className="flex justify-between items-center">
        <h1 className="md:text-xl font-semibold">Friends Suggested</h1>
        <Link to="/friends" className="flex items-center text-sm md:text-lg gap-1 text-blue-600 hover:text-black font-semibold">See All <MdOutlineArrowOutward className="md:text-2xl" /></Link>
      </div>

      {youMayKnowFriends == ""
        ?
        <div className="min-h-40 flex justify-center items-center">
          <div className="">no suggesion here...</div>
        </div>
        :
        <div>
          <div>
            <hr className="text-zinc-300 my-3 md:my-5" />
            <Link to={`/friends/${youMayKnowFriends[0]?.username}`} className="flex w-full justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="active:scale-95 transition-all cursor-pointer">
                  <img className="w-10 h-10 object-cover rounded-full" src={youMayKnowFriends[0]?.profilephotourl} alt="" />
                </div>
                <div>
                  <h1 className="font-semibold active:underline transition-all cursor-pointer">{youMayKnowFriends[0]?.name}</h1>
                  <p className="text-zinc-500 text-sm">@{youMayKnowFriends[0]?.username}</p>
                </div>
              </div>
              <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
            </Link>
            <hr className="text-zinc-300 my-3 md:my-5" />
          </div>

          <div>
            <Link to={`/friends/${youMayKnowFriends[1]?.username}`} className="flex w-full justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="active:scale-95 transition-all cursor-pointer">
                  <img className="w-10 h-10 object-cover rounded-full" src={youMayKnowFriends[1]?.profilephotourl} alt="" />
                </div>
                <div>
                  <h1 className="font-semibold active:underline transition-all cursor-pointer">{youMayKnowFriends[1]?.name}</h1>
                  <p className="text-zinc-500 text-sm">@{youMayKnowFriends[1]?.username}</p>
                </div>
              </div>
              <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
            </Link>
            <hr className="text-zinc-300 my-3 md:my-5" />
          </div>

          <div>
            <Link to={`/friends/${youMayKnowFriends[2]?.username}`} className="flex w-full justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="active:scale-95 transition-all cursor-pointer">
                  <img className="w-10 h-10 object-cover rounded-full" src={youMayKnowFriends[2]?.profilephotourl} alt="" />
                </div>
                <div>
                  <h1 className="font-semibold active:underline transition-all cursor-pointer">{youMayKnowFriends[2]?.name}</h1>
                  <p className="text-zinc-500 text-sm">@{youMayKnowFriends[2]?.username}</p>
                </div>
              </div>
              <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
            </Link>
            <hr className="text-zinc-300 my-3 md:my-5" />
          </div>
        </div>
      }
    </div>
  )
}

export default FriendSuggested