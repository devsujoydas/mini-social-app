import { MdEdit } from "react-icons/md";
import { FaCopy, FaBookmark } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5"; 
import { FaCircleMinus } from "react-icons/fa6";
import { FaArchive } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const ThreeDotMenu = ({ post, variant = "feed", onDelete, onRemove, setShowMenu }) => {
  const { userData, savePostHandler } = useContext(AuthContext);

  const menuItemStyle =
    "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all hover:bg-zinc-100 active:scale-95 cursor-pointer";
  const destructiveStyle = "text-red-600 hover:bg-red-50";

  const url = `${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`;

  const sharePostHandler = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Post URL Copied!"))
      .catch((err) => console.error("Copy failed:", err));
    setShowMenu(false);
  };

  const isAuthor = userData?._id === post?.author?._id;

  return (
    <div
      className="absolute top-10 right-0 w-56 bg-white border border-zinc-200 shadow-xl rounded-xl p-2 z-20"
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* সব post-এর জন্য common */}
      <button onClick={sharePostHandler} className={menuItemStyle}>
        <FaCopy className="text-zinc-600" /> Copy URL
      </button>

      {/* যদি logged-in user নিজে author হয় */}
      {isAuthor ? (
        <>
          <Link to={`/post/update/${post._id}`} className={menuItemStyle}>
            <MdEdit className="text-zinc-600" /> Edit Post
          </Link>
          <button onClick={() => savePostHandler(post)} className={menuItemStyle}>
            <FaBookmark className="text-zinc-600" /> Save Post
          </button>
          <button
            onClick={() => onDelete?.(post)}
            className={`${menuItemStyle} ${destructiveStyle}`}
          >
            <FaRegTrashCan /> Delete Post
          </button>
        </>
      ) : (
        <>
          {/* অন্যদের post এর জন্য */}
          <button onClick={() => savePostHandler(post)} className={menuItemStyle}>
            <FaBookmark className="text-zinc-600" /> Save Post
          </button>
          <hr className="my-2 border-zinc-200" />
          <button className={menuItemStyle}>
            <FaCircleMinus className="text-zinc-600" /> Not Interested
          </button>
          <button className={menuItemStyle}>
            <IoSettings className="text-zinc-600" /> Hide Post
          </button>
          <button className={`${menuItemStyle} ${destructiveStyle}`}>
            <FaArchive /> Report Post
          </button>
        </>
      )}

      {/* যদি variant 'saved' হয় → saved পেজে remove option */}
      {variant === "saved" && !isAuthor && (
        <button onClick={() => onRemove?.(post)} className={menuItemStyle}>
          <FaBookmark className="text-zinc-600" /> Remove Saved
        </button>
      )}
    </div>
  );
};

export default ThreeDotMenu;
