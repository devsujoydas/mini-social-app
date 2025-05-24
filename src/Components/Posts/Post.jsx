import { useContext, useState } from "react";
import { AuthContext } from "../../Pages/PrivateRoute/AuthProvider";
import { Link } from "react-router-dom";


import { BsThreeDotsVertical } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiCommentDots } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import { ImAttachment } from "react-icons/im";
import { FaRegSmile } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";


const Post = ({ post }) => {


  const [like, setlike] = useState(0)
  const {user, userData } = useContext(AuthContext)
  const { name, username, profilephotourl } = userData

  return (
    <div className="shadow-xl rounded-2xl md:rounded-3xl bg-white">

      {/* post author details  */}
      <div className="md:px-5 md:py-3 p-3 flex justify-between items-center">

        <Link to={`/profile/${user.email}`}>
          <div className="flex items-center gap-3">
            <div className="active:scale-95 transition-all cursor-pointer w-12 h-12 overflow-hidden rounded-full">
              <img className=" rounded-full " src={!profilephotourl ? `/default.jpg` : `${profilephotourl}`} alt="" />
            </div>

            <div>
              <h1 className="font-semibold active:underline transition-all text-md cursor-pointer">{userData.name ? `${name}` : "Your Name"}</h1>
              <p className="text-zinc-500 text-sm">{new Date(post?.createdDate)?.toLocaleString()}</p>
            </div>
          </div>
        </Link>

        <BsThreeDotsVertical className="cursor-pointer active:scale-95 md:text-xl text-zinc-500 hover:text-black" />
      </div>

      <hr className="text-zinc-300" />

      {/* post content and image like comment share bookmark */}
      <div className="md:p-5 p-3 space-y-2">
        <h1 className="space-x-2 md:text-md text-sm flex flex-wrap">{post?.postContent}</h1>

        <Link to={`/post/${post._id}`}>
          <img className="w-full object-cover rounded-lg md:h-96 h-56" src={`${post?.postImageUrl}`} alt="" />
        </Link>

        {/* like comment share container  */}
        <div className="flex justify-between items-center mt-3 ">
          {/* buttons  */}
          <div className="flex items-center md:gap-8 gap-6">

            <button className="md:text-xl flex items-center gap-2">
              <div onClick={() => { setlike(!like) }} className="text-2xl  cursor-pointer active:scale-95 transition-all active:text-black">
                {like ? <BiSolidLike /> : < BiLike />}
              </div>
              <span className="flex items-center gap-2">12 <span className="hidden md:flex">Likes</span></span>
            </button>


            <button className="md:text-xl flex items-center gap-2">
              <div className="text-2xl  cursor-pointer active:scale-95 transition-all active:text-black">
                <BiCommentDots />
              </div>
              <span className="flex items-center gap-2">8 <span className="hidden md:flex">Comments</span></span>
            </button>


            <button className="md:text-xl flex items-center gap-2">
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
      <form action="" className="p-4 flex justify-between items-center gap-5 md:gap-20">
        <div className="flex items-center gap-4 w-full ">
          <Link to={`/profile/${user.email}`}>
            <div className="cursor-pointer md:w-12 w-8 md:h-12 h-8 overflow-hidden rounded-full">
              <img className="" src={!profilephotourl ? `/default.jpg` : `${profilephotourl}`} alt="" />
            </div>
          </Link>
          <input className="w-full border border-zinc-400 outline-none md:text-lg text-sm py-2 md:px-4 px-2 rounded-full " type="text" placeholder="Write your comment.." />
        </div>

        <div className="flex items-center gap-3 ">
          <div className="border border-zinc-400 md:text-xl md:p-3 p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <ImAttachment />
          </div>
          <div className="border border-zinc-400 md:text-xl md:p-3 p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <FaRegSmile />
          </div>
          <div className="border border-blue-700 text-blue-700 hover:text-zinc-200 md:text-xl md:p-3 p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-blue-600">
            <VscSend />
          </div>
        </div>
      </form>

    </div >
  )
}

export default Post