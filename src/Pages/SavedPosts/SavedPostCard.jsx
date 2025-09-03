import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BiLike, BiSolidLike, BiCommentDots } from "react-icons/bi";
import { FaCopy, FaArchive, FaBookmark } from "react-icons/fa";
import { IoBookmark, IoSettings } from "react-icons/io5"; 
import { VscSend } from "react-icons/vsc";
import { ImAttachment } from "react-icons/im";
import { PiShareFatBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const SavedPostCard = ({ post }) => {
    console.log(post)
  const { userData, removeSavedPostHandler } = useContext(AuthContext);

  const likeCommentStyle =
    "md:text-[16px] active:scale-95 w-full transition-all px-3 py-1 md:py-2 rounded-md hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1";
  const editTrashBtnStyle =
    "active:scale-95 w-full transition-all px-3 py-1 rounded-md hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1";

  const [showEdit, setShowEdit] = useState(true);
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  useEffect(() => {
    if (post?.likes?.includes(userData?._id)) {
      setLike(true);
    }
  }, [post.likes, userData]);

  const likeHandler = () => {
    const userId = userData?._id;

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/post/like/${post._id}`, { userId })
      .then((res) => {
        if (res.data.message === "Liked") {
          setLike(true);
          setLikesCount((prev) => prev + 1);
          toast.success("Liked!");
        }
        if (res.data.message === "Disliked") {
          setLike(false);
          setLikesCount((prev) => prev - 1);
          toast.success("Disliked!");
        }
      })
      .catch((err) => console.error(err));
  };

  const url = `${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`;

  const sharePostHandler = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Post Url Copied Successfully!"))
      .catch((err) => console.error("Copy failed: ", err));
  };

  return (
    <div className="shadow-xl border-t border-t-zinc-300 md:w-full rounded-2xl md:rounded-3xl bg-white">
      {/* post header */}
      <div className="md:px-5 md:py-3 p-3 flex justify-between items-center"> 
        <Link to={`/friends/${post?.authorId}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={post.profilePhoto ? post.profilePhoto : "/default.jpg"}
                alt="author"
              />
            </div>
            <div>
              <h1 className="font-semibold text-md">Author Name</h1>
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <p>{new Date(post?.createdAt).toLocaleString()}</p>
                {post?.updatedAt && (
                  <span className="text-emerald-700 font-semibold">Updated</span>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* menu */}
        <div className="relative md:text-sm text-xs">
          <button onClick={() => setShowEdit(!showEdit)}>
            <BsThreeDotsVertical className="cursor-pointer active:scale-95 hover:bg-zinc-300 text-4xl text-zinc-500 hover:text-black rounded-full transition-all p-2" />
          </button>

          <div
            onMouseLeave={() => setShowEdit(true)}
            className={`absolute top-8 right-4 md:right-6 bg-white w-50 border border-zinc-300 shadow-2xl p-3 rounded-md space-y-2 transition-all duration-500 ${
              showEdit ? "-z-10 opacity-0" : "opacity-100 z-10"
            }`}
          >
            <button
              onClick={() => sharePostHandler()}
              className={`${editTrashBtnStyle} bg-zinc-100 border border-zinc-200`}
            >
              <FaCopy /> Copy Url
            </button>
            <button
              onClick={() => removeSavedPostHandler(post)}
              className={`${editTrashBtnStyle} bg-zinc-100 border border-zinc-200`}
            >
              <FaBookmark /> Remove Post
            </button>
            <button className={editTrashBtnStyle}>
              <IoSettings /> Hide Post
            </button>
            <hr />
            <button className={editTrashBtnStyle}>
              <FaArchive /> Report Post
            </button>
          </div>
        </div>
      </div>

      <hr className="text-zinc-300" />

      {/* post content */}
      <div className="md:px-5 space-y-2">
        <h1 className="px-2 pt-2 text-sm font-semibold">
          {post?.content?.text}
        </h1>

        {post?.content?.postImageUrl && (
          <Link to={`/post/${post._id}`}>
            <img
              className="w-full object-cover rounded-lg md:h-[550px] h-56"
              src={post.content.postImageUrl}
              alt="post"
            />
          </Link>
        )}

        {/* likes, comments, shares */}
        <div className="flex justify-between items-center gap-3 mt-2 text-sm px-2">
          <div className="flex items-center gap-1">
            <img className="md:w-5 w-4 md:h-5 h-4" src="/like.png" alt="" />
            <p className="text-sm text-zinc-600">
              {likesCount} {likesCount === 1 ? "Like" : "Likes"}
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <p>{post.comments?.length || 0} Comments</p>
            <p>{post.shares?.length || 0} Shares</p>
          </div>
        </div>

        <hr className="text-zinc-300" />

        {/* like, comment, share buttons */}
        <div className="flex justify-between items-center my-1">
          <div className="flex items-center md:gap-2">
            <button onClick={likeHandler} className={likeCommentStyle}>
              {like ? (
                <BiSolidLike className="text-blue-500 text-xl" />
              ) : (
                <BiLike className="text-xl" />
              )}
              <span className={like ? "text-blue-500" : "text-black"}>
                {likesCount} Like
              </span>
            </button>

            <button className={likeCommentStyle}>
              <BiCommentDots className="text-xl" /> Comments
            </button>

            <button onClick={sharePostHandler} className={likeCommentStyle}>
              <PiShareFatBold className="text-xl" /> Shares
            </button>
          </div>

          <IoBookmark
            onClick={() => removeSavedPostHandler(post)}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>

      <hr className="text-zinc-300" />

      {/* comment input */}
      <form className="md:p-4 p-3 flex justify-between items-center gap-5 md:gap-20">
        <div className="flex items-center gap-4 w-full">
          <Link to={`/profile`}>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={userData?.profilephotourl || "/default.jpg"}
                alt="profile"
              />
            </div>
          </Link>
          <input
            className="w-full border border-zinc-400 outline-none md:text-[14px] text-xs py-2 md:py-3 md:px-4 px-2 rounded-full"
            type="text"
            placeholder="Write your comment.."
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="border border-zinc-400 md:text-xl md:p-3 p-2 rounded-full cursor-pointer hover:bg-zinc-200">
            <ImAttachment />
          </div>
          <div className="border border-zinc-400 md:text-xl md:p-3 p-2 rounded-full cursor-pointer hover:bg-zinc-200">
            {/* <FaRegSmile /> */}
          </div>
          <div className="border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-600 md:text-xl md:p-3 p-2 rounded-full cursor-pointer">
            <VscSend />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SavedPostCard;
