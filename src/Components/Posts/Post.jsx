import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import { Link } from "react-router-dom";

import { BiLike } from "react-icons/bi";
import { VscSend } from "react-icons/vsc";
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaRegSmile } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { BiCommentDots } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { FaArchive } from "react-icons/fa";
import { useEffect } from "react";

const Post = ({ post }) => {
  const { userData } = useContext(AuthContext)

  const likeCommentStyle = "md:text-xl active:scale-95 w-full transition-all px-4 py-1   md:py-2 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-2"
  const [showEdit, setShowEdit] = useState(1)

  const [like, setlike] = useState(true)
  const [likesCount, setLikesCount] = useState(post.likes.length)

  useEffect(() => {
    if (post.likes && userData?._id) {
      const likedUser = post.likes.find(likedUserId => likedUserId == userData._id);
      setlike(!!likedUser);
    }
  }, [post.likes, userData]);

  const likeHandler = () => {
    const userId = userData?._id;
    const fromData = { userId };

    fetch(`http://localhost:3000/post/like/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fromData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.message === "Liked") {
          setlike(true);
          setLikesCount(prev => prev + 1);
        }

        if (data.message === "Disliked") {
          setlike(false);
          setLikesCount(prev => prev - 1);
        }
      })
      .catch(err => console.error(err));
  };


  return (
    <div className="shadow-xl md:w-full rounded-2xl md:rounded-3xl bg-white ">

      {/* post author details  */}
      <div className="md:px-5 md:py-3 p-3 flex justify-between items-center">

        <Link to={post?.authorUsername === userData?.username ? "/profile" : `/friends/${post?.authorUsername}`}>
          <div className="flex items-center gap-3">
            <div className="active:scale-95 transition-all cursor-pointer w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full">
              <img className="h-full w-full rounded-full object-cover" src={!post?.authorPhoto ? `/default.jpg` : `${post?.authorPhoto}`} alt="" />
            </div>

            <div>
              <h1 className="font-semibold active:underline transition-all text-md cursor-pointer">{post?.authorName ? `${post?.authorName}` : "Your Name"}</h1>

              <div className="flex justify-center items-center gap-2 text-zinc-500 text-sm ">
                <p className="">{new Date(post?.createdDate)?.toLocaleString()}</p>
                <span className="text-emerald-700 font-semibold">{!post?.lastUpdateDate == "" && "Updated"}</span>
              </div>

            </div>
          </div>
        </Link>

        <div className='relative'>
          <button onClick={() => { setShowEdit(!showEdit) }}>
            <BsThreeDotsVertical className="cursor-pointer active:scale-95 hover:bg-zinc-300 active:bg-zinc-300 text-4xl text-zinc-500 hover:text-black  rounded-full transition-all p-2" />
          </button>


          <div onClick={() => { setShowEdit(!showEdit) }} className={`absolute right-4 md:right-9 bg-white  w-50 border border-zinc-300 shadow-2xl p-3  rounded-md space-y-2 transition-all duration-500 ${showEdit ? '-z-10 opacity-0' : ' opacity-100 z-10'}`} >
            <button className={likeCommentStyle}>
              <h1 className='flex justify-center items-center gap-2 text-sm '> <span className="text-xl">{<FaCirclePlus />}</span> Interested</h1>
            </button>
            <button className={likeCommentStyle}>
              <h1 className='flex justify-center items-center gap-2 text-sm '> <span className="text-xl">{<FaCircleMinus />}</span> Not Interested</h1>
            </button>
            <button className={likeCommentStyle}>
              <h1 className='flex justify-center items-center gap-2  text-sm '> <span className="text-xl">{<FaBookmark />}</span> Save post</h1>
            </button>
            <button className={likeCommentStyle}>
              <h1 className='flex justify-center items-center gap-2 text-sm '> <span className="text-xl">{<IoSettings />}</span> Hide Post</h1>
            </button>
            <hr className="" />
            <button className={likeCommentStyle}>
              <h1 className='flex  justify-center items-center gap-2 text-sm '> <span className="text-xl">{<FaArchive />}</span> Report Post</h1>
            </button>
          </div>
        </div>
      </div>

      <hr className="text-zinc-300" />

      {/* post content and image like comment share bookmark */}
      <div className="md:px-5 p-3 space-y-2">
        <h1 className="space-x-2 md:text-sm text-sm flex text-wrap font-semibold flex-wrap">{post?.postContent}</h1>

        <Link to={`/post/${post._id}`}>
          <img className="w-full object-cover rounded-lg md:h-[550px] h-56" src={`${post?.postImageUrl}`} alt="" />
        </Link>

        {/* like comment share container  */}
        <div className="flex justify-between items-center mt-3 ">
          {/* buttons  */}
          <div className="flex items-center md:gap-6 gap-2">

            <button onClick={likeHandler} className={likeCommentStyle}>
              <div className="text-2xl cursor-pointer active:scale-95 transition-all active:text-black">
                {like ? <BiSolidLike className="text-blue-500" /> : <BiLike />}
              </div>
              <span className="flex items-center gap-2">{likesCount}<span className="hidden md:flex">Likes</span></span>
            </button>

            <button className={likeCommentStyle}>
              <div className="text-2xl  cursor-pointer active:scale-95 transition-all active:text-black">
                <BiCommentDots />
              </div>
              <span className="flex items-center gap-2">0 <span className="hidden md:flex">Comments</span></span>
            </button>
            <button className={likeCommentStyle}>
              <div className="text-2xl  cursor-pointer active:scale-95 transition-all active:text-black">
                <PiShareFatBold />
              </div>
              <span className="flex items-center gap-2">0 <span className="hidden md:flex">Shares</span></span>
            </button>
          </div>

          <CiBookmark className="text-2xl cursor-pointer active:scale-95 transition-all active:text-black" />
        </div>
      </div>

      <hr className="text-zinc-300" />

      {/* comment container  */}
      <form action="" className="p-4 flex justify-between items-center gap-5 md:gap-20">
        <div className="flex items-center gap-4 w-full ">
          <Link to={`/profile`}>
            <div className="cursor-pointer w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full">
              <img className="h-full w-full object-cover" src={!userData?.profilephotourl ? `/default.jpg` : `${userData?.profilephotourl}`} alt="" />
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