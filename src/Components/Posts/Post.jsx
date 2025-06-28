import { useEffect } from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import { BiLike } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { FaArchive } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaRegSmile } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { BiCommentDots } from "react-icons/bi";
import { FaCircleMinus } from "react-icons/fa6";
import { PiShareFatBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";


const Post = ({ post }) => {
  const { userData, friendsData } = useContext(AuthContext)
  const likeCommentStyle = "md:text-[16px] active:scale-95 w-full transition-all px-3 py-1 md:py-2 rounded-md hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1"
  const editTrashBtnStyle = "active:scale-95 w-full transition-all px-3 py-1 rounded-md  hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1"

  const [showEdit, setShowEdit] = useState(1)
  const [showUsers, setShowUsers] = useState(false)
  const [like, setlike] = useState(false)
  const [reactorsUsers, setReactorsUsers] = useState([])
  const [likesCount, setLikesCount] = useState(post.likes.length)

  useEffect(() => {
    if (post?.likes.length > 0 && userData?._id) {
      setReactorsUsers(post.likes)
      const likedUser = post?.likes.find(likedUserId => likedUserId.userId == userData?._id);
      if (!likedUser) return
      setlike(true)
    }
  }, [post.likes, userData]);

  const likeHandler = () => {
    const userId = userData?._id;
    const username = userData?.username;
    const name = userData?.name;
    const fromData = { name, username, userId };

    fetch(`https://mini-social-app-backend.vercel.app/post/like/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fromData)
    })
      .then(res => res.json())
      .then(data => {

        console.log(data)
        if (data.message === "Liked") {
          setlike(true);
          setLikesCount(prev => prev + 1);
          toast.success('Liked!')
        }

        if (data.message === "Disliked") {
          setlike(false);
          setLikesCount(prev => prev - 1);
          toast.success('Disliked!')
        }
      })
      .catch(err => console.error(err));
  };

  const url = `http://localhost:5173/post/${post._id}`

  const sharePostHandler = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        // alert("URL copied to clipboard!");
        toast.success('Post Url Copied Successfully!')
      })
      .catch((err) => {
        console.error("Copy failed: ", err);
      });
  }

  return (
    <div className="shadow-xl border-t border-t-zinc-300 md:w-full rounded-2xl md:rounded-3xl bg-white ">
      <Toaster
        position="bottom-center"
        reverseOrder={true}
      />

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
                {post?.authorUsername === userData?.username &&
                  <span className="text-emerald-700 font-semibold">{!post?.lastUpdateDate == "" && "Updated"}</span>
                }
              </div>
            </div>
          </div>
        </Link>

        <div className='relative'>
          <button onClick={() => { setShowEdit(!showEdit) }}>
            <BsThreeDotsVertical className="cursor-pointer active:scale-95 hover:bg-zinc-300 active:bg-zinc-300 text-4xl text-zinc-500 hover:text-black  rounded-full transition-all p-2" />
          </button>

          {post?.authorUsername == userData?.username ?
            <div onMouseLeave={() => { setShowEdit(!showEdit) }} onClick={() => { setShowEdit(!showEdit) }} className={`absolute top-8 right-4 md:right-6 bg-white  w-50 border border-zinc-300 shadow-2xl p-3  rounded-md space-y-2 transition-all duration-500 ${showEdit ? '-z-10 opacity-0' : ' opacity-100 z-10'}`} >
              <button onClick={() => sharePostHandler()} className={`${editTrashBtnStyle} bg-zinc-100 border border-zinc-200`}>
                <h1 className='flex justify-center items-center gap-2   text-sm '> {<FaCopy />} Copy Url</h1>
              </button>
              <Link to={`/post/update/${post?._id}`} className={`${editTrashBtnStyle} bg-zinc-100 border border-zinc-200`}>
                <h1 className='flex justify-center items-center gap-2 text-sm '> {<MdEdit />} Edit Post</h1>
              </Link>
              <button className={editTrashBtnStyle}>
                <h1 className='flex justify-center items-center gap-2 text-sm '> {<IoSettings />} Edit audience</h1>
              </button>
              <hr className="" />
              <button className={editTrashBtnStyle}>
                <h1 className='flex  justify-center items-center gap-2 text-sm '> {<FaArchive />} Move to archive</h1>
              </button>
              <button onClick={() => { deletePost() }} className={`${editTrashBtnStyle} border bg-zinc-100 border-zinc-200`}>
                <h1 className='flex justify-center items-center gap-2 text-sm '> {<FaTrashCan />} Move to trash</h1>
              </button>
            </div>
            :
            <div onMouseLeave={() => { setShowEdit(!showEdit) }} onClick={() => { setShowEdit(!showEdit) }} className={`absolute top-8 right-4 md:right-6 bg-white  w-50 border border-zinc-300 shadow-2xl p-3  rounded-md space-y-2 transition-all duration-500 ${showEdit ? '-z-10 opacity-0' : ' opacity-100 z-10'}`} >
              <button onClick={() => sharePostHandler()} className={`${editTrashBtnStyle} bg-zinc-100 border border-zinc-200`}>
                <h1 className='flex justify-center items-center gap-2   text-sm '> {<FaCopy />} Copy Url</h1>
              </button>
              <button className={editTrashBtnStyle}>
                <h1 className='flex justify-center items-center gap-2 text-sm '> <span className="">{<FaCircleMinus />}</span> Not Interested</h1>
              </button>
              <button className={editTrashBtnStyle}>
                <h1 className='flex justify-center items-center gap-2  text-sm '> <span className="">{<FaBookmark />}</span> Save post</h1>
              </button>
              <button className={editTrashBtnStyle}>
                <h1 className='flex justify-center items-center gap-2 text-sm '> <span className="">{<IoSettings />}</span> Hide Post</h1>
              </button>
              <hr className="" />
              <button className={editTrashBtnStyle}>
                <h1 className='flex  justify-center items-center gap-2 text-sm '> <span className="">{<FaArchive />}</span> Report Post</h1>
              </button>
            </div>}
        </div>
      </div>

      <hr className="text-zinc-300" />

      {/* post content and image like comment share bookmark */}
      <div className="md:px-5 space-y-2">
        <h1 className="space-x-2 px-2 cursor-pointer pt-2  text-sm flex text-wrap font-semibold flex-wrap">{post?.postContent}</h1>

        <Link to={`/post/${post._id}`}>
          <img className="w-full object-cover rounded-lg md:h-[550px] h-56" src={`${post?.postImageUrl}`} alt="" />
        </Link>

        {/* display likes */}
        <div className="flex justify-between items-center gap-3 mt-2 text-sm px-2">

          <div className="flex items-center gap-1 ">
            <img className="md:w-5 w-4 md:h-5 h-4 rounded-full overflow-hidden" src="/like.png" alt="" />

            <div className="flex items-center gap-2 relative">
              {reactorsUsers.length > 0 &&
                <div onClick={() => setShowUsers(!showUsers)} onMouseEnter={() => setShowUsers(true)} onMouseLeave={() => setShowUsers(false)}  className="text-xs md:text-sm flex gap-1 cursor-pointer hover:underline active:underline transition-all items-center " >

                  <div className={`absolute bottom-8 -left-7 ${showUsers ? "z-10 opacity-100" : "-z-10 opacity-0"} transition-all   shadow-xl bg-[#000000a4] p-3 space-y-1 rounded-lg flex flex-col text-white font-semibold`}>
                    {reactorsUsers.map((user, idx) => (
                      <Link to={user?.username == userData?.username ? "/profile" : `/friends/${user.username}`} key={idx} className="cursor-pointer hover:underline transition-all">{user.name}</Link>
                    ))}
                  </div>

                  <p className="text-sm text-zinc-600 md:block hidden">
                    {(() => {
                      const names = reactorsUsers.map(user => user.name);
                      const displayNames = names.slice(0, 2).join(", ");
                      const othersCount = names.length - 2;
                      return othersCount > 0 ? `${displayNames} and ${othersCount} others` : displayNames;
                    })()}
                  </p>
                </div>}

              {reactorsUsers.length > 0 &&
                <div className="text-xs md:text-sm flex md:hidden gap-1 cursor-pointer hover:underline transition-all items-center " >
                  <p  onClick={() => setShowUsers(!showUsers)}  className=" -ml-2 text-zinc-600 ">
                    {(() => {
                      const names = reactorsUsers.map(user => user.name);
                      const displayNames = names.slice(0, 1).join(", ");
                      const othersCount = names.length - 1;
                      return othersCount > 0 ? `${displayNames} and ${othersCount} others` : displayNames;
                    })()}
                  </p>
                </div>}
            </div>

          </div>

          <div className="flex items-center gap-3 text-sm ">
            <div>
              <h1 className="flex items-center gap-1">0 <span className="md:block hidden">Comments</span> <span className="block md:hidden"><BiCommentDots /></span></h1>
            </div>
            <div>
              <h1 className="flex items-center gap-1">0 <span className="md:block hidden">Share</span>  <span className="block md:hidden"><PiShareFatBold /></span> </h1>
            </div>
          </div>
        </div>



        <hr className="text-zinc-300" />

        {/* like comment share container  */}
        <div className="flex justify-between items-center my-1 ">
          {/* buttons  */}
          <div className="flex items-center md:gap-2">
            <button onClick={likeHandler} className={likeCommentStyle}>
              <div className={`text-xl cursor-pointer active:scale-95 transition-all active:text-black ${!like ? "text-black" : "text-blue-500"}`}>
                {like ? <BiSolidLike className="text-blue-500" /> : <BiLike />}
              </div>
              <span className={`flex items-center gap-1 ${like ? "text-blue-500" : "text-black"}`}>{likesCount}<span className="hidden md:flex">Like</span></span>
            </button>

            <button className={likeCommentStyle}>
              <div className="text-xl  cursor-pointer active:scale-95 transition-all  ">
                <BiCommentDots />
              </div>
              <span className="flex items-center gap-1"><span className="hidden md:flex">Comments</span></span>
            </button>

            <button onClick={() => sharePostHandler()} className={likeCommentStyle}>
              <div className="text-xl  cursor-pointer active:scale-95 transition-all ">
                <PiShareFatBold />
              </div>
              <span className="flex items-center gap-1"><span className="hidden md:flex">Shares</span></span>
            </button>
          </div>

          <div>

            <CiBookmark className="text-2xl cursor-pointer active:scale-95 transition-all active:text-black" />
          </div>
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