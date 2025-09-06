import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";

import { BiLike, BiSolidLike, BiCommentDots } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { FaRegSmile, FaBookmark, FaCopy, FaArchive } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { ImAttachment } from "react-icons/im";
import { BsThreeDotsVertical } from "react-icons/bs";

import { AuthContext } from "../../AuthProvider/AuthProvider";

const UsersPost = ({ post }) => {
  const { userData, postsData, setPostsData, savePostHandler, allUsers } =
    useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const likeCommentStyle =
    "md:text-[16px] active:scale-95 w-full transition-all px-3 py-1 md:py-2 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-1";
 
  useEffect(() => {
    if (userData?._id) {
      setLiked(post.likes.includes(userData._id));
    }
  }, [post.likes, userData]);
 
  const likeHandler = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/post/like/${post._id}`,
        { userId: userData._id }
      );

      if (data.message === "Liked") {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
        post.likes.push(userData._id);
        toast.success("Liked!");
      } else {
        setLiked(false);
        setLikesCount((prev) => prev - 1);
        post.likes = post.likes.filter((id) => id !== userData._id);
        toast.success("Disliked!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };
 
  const sharePostHandler = () => {
    const url = `${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Post URL copied!"));
  };
 
  const deletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_BACKEND_URL}/post/delete/${post._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              toast.success("Post deleted!");
              setPostsData(postsData.filter((p) => p._id !== post._id));
              navigate("/");
            }
          });
      }
    });
  };
 
  const reactorsUsers = post.likes
    .map((id) => allUsers.find((u) => u._id === id))
    .filter(Boolean);

  return (
    <div className="shadow-xl border-t border-zinc-300 md:w-full rounded-2xl bg-white">
      {/* Author Info */}
      <div className="md:px-5 md:py-3 p-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={userData?.profilephotourl || "/default.jpg"}
            alt={userData?.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="font-semibold text-md">
              {post.author?.name || "Unknown"}
            </h1>
            <p className="text-zinc-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
              {post.updatedAt && (
                <span className="text-emerald-700 font-semibold ml-2">
                  Updated
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Dropdown menu */}
        <div className="relative">
          <button onClick={() => setShowEdit(!showEdit)}>
            <BsThreeDotsVertical className="text-4xl text-zinc-500 hover:text-black rounded-full transition-all p-2" />
          </button>
          {showEdit && (
            <div
              onMouseLeave={() => setShowEdit(false)}
              className="absolute top-10 right-4 bg-white w-52 border border-zinc-300 shadow-2xl p-3 rounded-lg space-y-2 z-20"
            >
              <button
                onClick={sharePostHandler}
                className="w-full flex items-center gap-2 hover:bg-zinc-200 p-2 rounded-md"
              >
                <FaCopy /> Copy URL
              </button>
              <Link
                to={`/post/update/${post._id}`}
                className="w-full flex items-center gap-2 hover:bg-zinc-200 p-2 rounded-md"
              >
                <MdEdit /> Edit Post
              </Link>
              <button
                onClick={() => savePostHandler(post)}
                className="w-full flex items-center gap-2 hover:bg-zinc-200 p-2 rounded-md"
              >
                <FaBookmark /> Save Post
              </button>
              <button className="w-full flex items-center gap-2 hover:bg-zinc-200 p-2 rounded-md">
                <FaArchive /> Move to Archive
              </button>
              <button
                onClick={deletePost}
                className="w-full flex items-center gap-2 text-red-600 hover:bg-red-100 p-2 rounded-md"
              >
                <FaRegTrashCan /> Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      <hr className="text-zinc-300" />

      {/* Post Content */}
      <div className="md:px-5 space-y-2">
        {post.content?.text && (
          <p className="px-2 pt-2 text-sm font-semibold">{post.content.text}</p>
        )}
        {post.content?.postImageUrl && (
          <Link to={`/post/${post._id}`}>
            <img
              src={post.content.postImageUrl}
              alt="Post"
              className="w-full object-cover rounded-lg md:h-[550px] h-56"
            />
          </Link>
        )}

        {/* Likes / Comments / Shares */}
        <div className="flex justify-between items-center mt-2 text-sm px-2">
          <div className="flex items-center gap-1">
            <img
              src="/like.png"
              alt="Like"
              className="w-4 h-4 md:w-5 md:h-5 rounded-full"
            />
            {reactorsUsers.length > 0 && (
              <div className="flex gap-1 cursor-pointer relative">
                <p className="text-zinc-600 hidden md:block">
                  {(() => {
                    const names = reactorsUsers.map((u) => u.name);
                    const others = names.length - 2;
                    const display = names.slice(0, 2).join(", ");
                    return others > 0
                      ? `${display} and ${others} others`
                      : display;
                  })()}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div>{post.comments.length} Comments</div>
            <div>{post.shares.length} Shares</div>
          </div>
        </div>

        <hr className="text-zinc-300" />

        {/* Action buttons */}
        <div className="flex justify-between items-center my-1">
          <div className="flex items-center md:gap-2">
            <button onClick={likeHandler} className={likeCommentStyle}>
              {liked ? (
                <BiSolidLike className="text-blue-500 text-xl" />
              ) : (
                <BiLike className="text-xl" />
              )}
              <span
                className={`flex items-center gap-1 ${
                  liked ? "text-blue-500" : "text-black"
                }`}
              >
                {likesCount} <span className="hidden md:flex">Like</span>
              </span>
            </button>
            <button className={likeCommentStyle}>
              <BiCommentDots className="text-xl" />{" "}
              <span className="hidden md:flex">Comments</span>
            </button>
            <button onClick={sharePostHandler} className={likeCommentStyle}>
              <PiShareFatBold className="text-xl" />{" "}
              <span className="hidden md:flex">Shares</span>
            </button>
          </div>
          <CiBookmark
            onClick={() => savePostHandler(post)}
            className="text-2xl cursor-pointer active:scale-95 transition-all"
          />
        </div>
      </div>

      <hr className="text-zinc-300" />

      {/* Comment input */}
      <form className="p-3 md:p-4 flex justify-between items-center gap-2 md:gap-20">
        <div className="flex items-center gap-2 md:gap-4 w-full">
          <Link to="/profile">
            <img
              src={userData?.profilephotourl || "/default.jpg"}
              alt={userData?.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
          </Link>
          <input
            type="text"
            placeholder="Write your comment..."
            className="w-full border border-zinc-400 outline-none text-xs md:text-sm py-2 md:py-3 px-2 md:px-4 rounded-full"
          />
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-2 md:p-3 border border-zinc-400 rounded-full cursor-pointer hover:bg-zinc-200">
            <ImAttachment />
          </div>
          <div className="p-2 md:p-3 border border-zinc-400 rounded-full cursor-pointer hover:bg-zinc-200">
            <FaRegSmile />
          </div>
          <div className="p-2 md:p-3 border border-blue-700 text-blue-700 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white">
            <VscSend />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UsersPost;
