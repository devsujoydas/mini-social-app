import { BiLike, BiSolidLike, BiCommentDots } from "react-icons/bi"; 
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6"; 
import { PiShareFatBold } from "react-icons/pi"; 


const ActionButtons = ({ liked, likesCount, likeHandler, sharePostHandler, post, userData, savePostHandler, }) => (
  <div className="flex justify-between items-center py-2 border-t px-2 border-gray-200">
    {/* Left side: Like, Comment, Share */}
    <div className="flex items-center w-full justify-around md:justify-start md:gap-4">
      {/* Like Button */}
      <button
        onClick={likeHandler}
        className={`flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all active:scale-95
          ${liked
            ? "text-blue-600 bg-blue-50"
            : "text-gray-600 hover:bg-gray-100"
          }
        `}
      >
        {liked ? (
          <BiSolidLike className="text-xl" />
        ) : (
          <BiLike className="text-xl" />
        )}
        <span className="flex items-center gap-1 text-sm font-medium">
          {likesCount}
          <span className="hidden md:inline">Like</span>
        </span>
      </button>

      {/* Comment Button */}
      <button
        className="flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg text-gray-600 
                   hover:bg-gray-100 transition-all active:scale-95"
      >
        <BiCommentDots className="text-xl" />
        <span className="hidden md:inline text-sm font-medium">Comments</span>
      </button>

      {/* Share Button */}
      <button
        onClick={sharePostHandler}
        className="flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg text-gray-600 
                   hover:bg-gray-100 transition-all active:scale-95"
      >
        <PiShareFatBold className="text-xl" />
        <span className="hidden md:inline text-sm font-medium">Shares</span>
      </button>
    </div>

    {/* Right side: Save / Bookmark */}
    <div className="ml-2">
      {userData?.savedPosts?.some((p) => p._id === post._id) ? (
        <FaBookmark
          onClick={() => savePostHandler(post)}
          className="text-2xl text-blue-600 cursor-pointer active:scale-95 transition-all"
        />
      ) : (
        <CiBookmark
          onClick={() => savePostHandler(post)}
          className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 active:scale-95 transition-all"
        />
      )}
    </div>
  </div>
);

export default ActionButtons