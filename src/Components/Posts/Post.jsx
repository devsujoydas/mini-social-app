import { BsThreeDotsVertical } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiCommentDots } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import { useState } from "react";
import { ImAttachment } from "react-icons/im";
import { FaRegSmile } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";


const Post = () => {
  const [like, setlike] = useState(0)

  return (
    <div className="shadow-xl rounded-3xl bg-white">

      {/* post author details  */}
      <div className="p-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-12" src="/post-avatar.png" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">devsujoydas</h1>
            <p className="text-zinc-500">Product Designer, IT</p>
          </div>
        </div>

        <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
      </div>

      <hr className="text-zinc-300" />

      {/* post content and image like comment share bookmark */}
      <div className="p-5 space-y-3">
        <h1 className="space-x-2">Habitant morbi tristique senectus et netus et. Suspendisse sed nisi lacus sed viverra. Dolor morbi non arcu risus quis varius.
          <a href="/" className="text-blue-500 ">#amazing</a>
          <a href="/" className="text-blue-500">#great</a>
          <a href="/" className="text-blue-500">#lifetime</a>
          <a href="/" className="text-blue-500">#uiux</a>
          <a href="/" className="text-blue-500">#machinelearning</a>
        </h1>

        <div>
          <img className="w-full" src="/post-image.png" alt="" />
        </div>

        {/* like comment share container  */}
        <div className="flex justify-between items-center mt-4">
          {/* buttons  */}
          <div className="flex items-center md:gap-8 gap-5">
            <button className="text-xl flex items-center gap-2">
              <div onClick={() => { setlike(!like) }} className="text-2xl  cursor-pointer active:scale-95 transition-all active:text-black">
                {like ? <BiSolidLike /> : < BiLike />}
              </div>
              <span className="flex items-center gap-2">12 <span className="hidden md:flex">Likes</span></span>
            </button>


            <button className="text-xl flex items-center gap-2">
              <div className="text-2xl  cursor-pointer active:scale-95 transition-all active:text-black">
                <BiCommentDots />
              </div>
              <span className="flex items-center gap-2">8 <span className="hidden md:flex">Comments</span></span>
            </button>


            <button className="text-xl flex items-center gap-2">
              <div className="text-2xl  cursor-pointer active:scale-95 transition-all active:text-black">
                <PiShareFatBold />
              </div>
              <span className="flex items-center gap-2">5 <span className="hidden md:flex">Shares</span></span>
            </button>


          </div>

          <CiBookmark className="text-2xl cursor-pointer active:scale-95 transition-all active:text-black" />
        </div>
      </div>

      <hr className="text-zinc-300" />

      {/* comment container  */}
      <div className="p-5 flex justify-between items-center gap-20">
        <div className="flex items-center gap-4 w-full">
          <div className="cursor-pointer">
            <img className="w-14" src="/avatar.png" alt="" />
          </div>
          <input className="w-full border border-zinc-400 outline-none text-lg py-3 px-4 rounded-full" type="text" placeholder="Write your comment.." />
        </div>

        <div className="flex items-center gap-3">
          <div className="border border-zinc-400 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <ImAttachment />
          </div>
          <div className="border border-zinc-400 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <FaRegSmile />
          </div>
          <div className="border border-blue-700 text-blue-700 hover:text-zinc-200 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-blue-600">
            <VscSend />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Post