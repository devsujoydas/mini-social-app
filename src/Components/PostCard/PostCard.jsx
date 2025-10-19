import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import AuthorInfo from "./AuthorInfo.jsx";
import PostContent from "./PostContent.jsx";
import PostStats from "./PostStats.jsx";
import ActionButtons from "./ActionButtons.jsx";
import CommentInput from "./CommentInput.jsx";
import { useAuth } from "../../hooks/useAuth.js";


const PostCard = ({ post, variant = "feed", onDelete, onRemove }) => {
  const { userData, savePostHandler } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length || 0);
  const [reactorsUsers, setReactorsUsers] = useState(post.likesDetails || []);
  const [showMenu, setShowMenu] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const likeCommentStyle =
    "md:text-[16px] active:scale-95 w-full transition-all px-3 py-1 md:py-2 rounded-md hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1";

  useEffect(() => {
    if (userData?._id) {
      const liked = post.likes.some(
        (id) => id.toString() === userData._id.toString()
      );
      setLiked(liked);
    }
  }, [post.likes, userData]);

  const likeHandler = async () => {
    if (!userData?._id) return toast.error("Please login first");

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/post/like/${post._id}`,
        { userId: userData._id }
      );

      const { message, likesCount } = data;

      setLiked(message === "Liked");
      setLikesCount(likesCount);

      if (message === "Liked") {
        setReactorsUsers([...reactorsUsers, userData]);
        toast.success("Liked!");
      } else {
        setReactorsUsers(reactorsUsers.filter((u) => u._id !== userData._id));
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
      .then(() => toast.success("Post URL Copied!"));
  };
  return (
    <div className="shadow-xl border-t border-t-zinc-300 md:w-full rounded-2xl md:rounded-3xl bg-white">
      {/* Author */}
      <AuthorInfo
        post={post}
        userData={userData}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        variant={variant}
        onDelete={onDelete}
        onRemove={onRemove}
      />

      <hr className="text-zinc-300" />

      {/* Content */}
      <PostContent post={post} />

      {/* Stats */}
      <PostStats
        reactorsUsers={reactorsUsers}
        showUsers={showUsers}
        setShowUsers={setShowUsers}
        post={post}
      />

      <hr className="text-zinc-300" />

      {/* Actions */}
      <ActionButtons
        liked={liked}
        likesCount={likesCount}
        likeHandler={likeHandler}
        likeCommentStyle={likeCommentStyle}
        sharePostHandler={sharePostHandler}
        post={post}
        userData={userData}
        savePostHandler={savePostHandler}
      />

      <hr className="text-zinc-300" />

      {/* Comment Input */}
      <CommentInput userData={userData} />
    </div>
  );
};

export default PostCard;
