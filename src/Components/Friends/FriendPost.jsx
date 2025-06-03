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
import { useContext, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import { MdReport } from "react-icons/md";
import { RiUserForbidFill } from "react-icons/ri";

import { AuthContext } from "../../Pages/PrivateRoute/AuthProvider";


const FriendPost = ({ post, friend }) => {
    const likeCommentStyle = "md:text-xl active:scale-95 w-full transition-all px-4 py-2 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-2"
    const [likesCount, setlikesCount] = useState(0)
    const [like, setlike] = useState(1)
    const [showEdit, setShowEdit] = useState(1)
    const { userData } = useContext(AuthContext)
  
    return (
        <div className="shadow-xl border border-zinc-200 rounded-2xl md:rounded-3xl bg-white">

            {/* post author details  */}
            <div className="md:px-5 md:py-3 px-2 py-2 flex justify-between items-center">

                <div className="flex items-center gap-3">
                    <div className="active:scale-95 transition-all cursor-pointer w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full">
                        <img className="object-cover h-full rounded-full " src={post.authorPhoto} alt="" />
                    </div>

                    <div>
                        <h1 className="font-semibold active:underline transition-all md:text-md text-sm cursor-pointer">{post?.authorName}</h1>

                        <h1 className="md:text-sm text-xs">@{post?.authorUsername}</h1>
                    </div>
                </div>

                <div className='relative'>
                    <button onClick={() => { setShowEdit(!showEdit) }}>
                        <BsThreeDotsVertical className="cursor-pointer active:scale-95 hover:bg-zinc-300 active:bg-zinc-300 text-4xl text-zinc-500 hover:text-black  rounded-full transition-all p-2" />
                    </button>


                    <div onClick={() => { setShowEdit(!showEdit) }} className={`absolute md:right-9 right-4  bg-white  md:w-74 w-61 border border-zinc-300 shadow-2xl md:p-3 p-1  rounded-md space-y-1 transition-all duration-500 ${showEdit ? '-z-10 opacity-0' : ' opacity-100 z-10'}`} >
                        <button className={likeCommentStyle}>
                            <h1 className='flex justify-center items-center gap-2  md:text-sm text-xs '> {<FaBookmark />} Save post</h1>
                        </button>
                        <div className={likeCommentStyle}>
                            <h1 className='flex justify-center items-center gap-2 md:text-sm text-xs '> {<FaWindowClose />} Hide Post</h1>
                        </div>
                        <button className={likeCommentStyle}>
                            <h1 className='flex justify-center items-center gap-2 md:text-sm text-xs '> {<RiUserUnfollowFill />} Unfollow {friend.name}</h1>
                        </button>
                        <button className={likeCommentStyle}>
                            <h1 className='flex justify-center items-center gap-2 md:text-sm text-xs '> {<MdReport />} Report post</h1>
                        </button>
                        <hr />
                        <button className={likeCommentStyle}>
                            <h1 className='flex justify-center items-center gap-2 md:text-sm text-xs '> {<RiUserForbidFill />} Block {friend.name}</h1>
                        </button>
                    </div>


                </div>
            </div>

            <hr className="text-zinc-300" />

            {/* post content and image like comment share bookmark */}
            <div className="md:p-5 px-3 pt-2  md:space-y-2 space-y-1">

                <h1 className="space-x-2 md:text-sm font-semibold text-xs flex flex-wrap">{post?.postContent}</h1>
                
                <div>
                    <img className="w-full object-cover rounded-lg md:h-[550px] h-56" src={`${post?.postImageUrl}`} alt="" />
                </div>

                {/* like comment share container  */}
                <div className="flex justify-between items-center md:mt-3 ">
                    {/* buttons  */}
                    <div className="flex items-center md:gap-6 ">

                        <button onClick={() => { setlike(!like), setlikesCount(likesCount + 1) }} className={likeCommentStyle}>
                            <div className="md:text-2xl text-xl  cursor-pointer active:scale-95 transition-all active:text-black">
                                {like ? < BiLike /> : <  BiSolidLike />}
                            </div>
                            <span className="flex items-center gap-2">{likesCount} <span className="hidden md:flex">Likes</span></span>
                        </button>


                        <button className={likeCommentStyle}>
                            <div className="md:text-2xl text-xl  cursor-pointer active:scale-95 transition-all active:text-black">
                                <BiCommentDots />
                            </div>
                            <span className="flex items-center gap-2">0 <span className="hidden md:flex">Comments</span></span>
                        </button>


                        <button className={likeCommentStyle}>
                            <div className="md:text-2xl text-xl  cursor-pointer active:scale-95 transition-all active:text-black">
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
            <form action="" className="md:p-4 p-2 flex justify-between items-center gap-5 md:gap-20">
                <div className="flex items-center gap-4 w-full ">
                    <Link to={`/profile`}>
                        <div className="cursor-pointer md:w-12 w-9 md:h-12 h-9 overflow-hidden rounded-full">
                            <img className="object-cover h-full" src={!userData?.profilephotourl ? `/default.jpg` : `${userData?.profilephotourl}`} alt="" />
                        </div>
                    </Link>

                    <input className="w-full border border-zinc-400 outline-none md:text-lg text-sm py-2 md:px-4 px-2 rounded-full placeholder:text-xs " type="text" placeholder="Write your comment.." />
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

export default FriendPost