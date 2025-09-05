import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { FaRegSmile } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { IoMicOutline } from "react-icons/io5";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const PostForm = () => {
  const { userData, postsData, setPostsData, setUsersPostsData, usersPostsData } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const postData = {
      authorEmail: userData.email,
      authorPhoto: userData.profilephotourl,
      authorName: userData.name,
      authorUsername: userData.username,
      postImageUrl: form.postImageUrl.value,
      postContent: form.postContent.value,
      createdDate: new Date(),
      lastUpdateDate: null,
      likes: [],
      comments: [],
      shares: [],
    };

   
    

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/post`,
        postData
      );

      if (res.data?.result?.insertedId) {
        Swal.fire({
          title: "Post Successful 🎉",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        
        const newPost = {
          _id: res.data.result.insertedId,
          ...postData,
        };

        setPostsData([newPost, ...postsData]);
        setUsersPostsData([newPost, ...usersPostsData]);
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to create post",
        icon: "error",
      });
    }
  };


  

  return (
    <div className="p-5 border border-zinc-300">
      <form onSubmit={handlePostSubmit} className="space-y-4">
        {/* Inputs */}
        <div className="flex w-full flex-col items-start gap-2 md:text-sm text-xs">
          <input
            required
            name="postImageUrl"
            type="text"
            className="outline-none p-2 bg-white border border-zinc-300 rounded-sm w-full"
            placeholder="Image Url"
          />
          <input
            required
            name="postContent"
            type="text"
            className="outline-none p-2 bg-white md:h-14 border border-zinc-300 rounded-sm w-full"
            placeholder="What's on your mind right now?"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2">
          <label className="border border-zinc-400 md:text-2xl text-lg md:p-3 p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <FaRegSmile />
          </label>
          <label className="border border-zinc-400 md:text-3xl text-xl md:p-2 p-1.5 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <IoMicOutline />
          </label>
          <label className="flex items-center md:gap-2 gap-1 bg-blue-700 hover:bg-blue-600 text-white text-center md:px-6 md:py-3 px-4 py-1.5 rounded-full cursor-pointer active:scale-95 transition-all">
            <input type="submit" value="Post" className="cursor-pointer bg-transparent" />
            <VscSend className="md:text-2xl text-lg cursor-pointer" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default PostForm;


