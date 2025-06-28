import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { FaRegSmile } from "react-icons/fa"
import { VscSend } from "react-icons/vsc"
import { IoMicOutline } from "react-icons/io5";

const PostForm = () => {
  const { user, userData, postsData, setPostsData, setUsersPostsData, usersPostsData } = useContext(AuthContext)
  const navigate = useNavigate()

  const handlePostSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const authorEmail = userData.email;
    const authorPhoto = userData.profilephotourl;
    const authorName = userData.name;
    const authorUsername = userData.username;
    const postContent = form.postContent.value;
    const postImageUrl = form.postImageUrl.value;
    const createdDate = new Date();
    const lastUpdateDate = "";
    const likes = [];
    const comments = [];
    const shares = []
    const postData = { authorEmail, authorPhoto, authorName, authorUsername, postImageUrl, postContent, createdDate, lastUpdateDate, likes, comments, shares }
    fetch(`http://localhost:3000/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.result.insertedId) {
          Swal.fire({
            title: "Post Successfully",
            icon: "success",
            draggable: true
          });
        }
        const postFormData = { _id: data.result.insertedId, authorEmail, authorPhoto, authorName, authorUsername, postImageUrl, postContent, createdDate, lastUpdateDate, likes, comments, shares }
        form.reset()
        setPostsData([postFormData, ...postsData])
        setUsersPostsData([postFormData, ...usersPostsData])
      })
  }


  return (
    <div className=" p-5  border border-zinc-300 ">
      <form onSubmit={handlePostSubmit} className="space-y-4">
        <div className="flex w-full flex-col items-start gap-2 md:text-sm text-xs">
          <input required name="postImageUrl" type="text" className="outline-none p-2 bg-white border border-zinc-300 rounded-sm w-full  " placeholder="Image Url" />
          <input required name="postContent" type="text" className="outline-none p-2 bg-white md:h-14 border border-zinc-300 rounded-sm w-full  " placeholder="Whats on your mind right now?" />
        </div>

        <div className="flex items-center justify-end gap-2 ">
          <label className="border border-zinc-400 md:text-2xl text-lg md:p-3 p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <FaRegSmile />
          </label>
          <label className="border border-zinc-400 md:text-3xl text-xl md:p-2 p-1.5 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <IoMicOutline />
          </label>
          <label className="lg:w-fit flex items-center md:gap-2 gap-1 bg-blue-700 hover:bg-blue-600  text-white text-center md:px-6 md:py-3 px-4 py-1.5 rounded-full cursor-pointer active:scale-95 transition-all">
            <input type="submit" value={"Post"} className="cursor-pointer" /><VscSend className="md:text-2xl text-lg cursor-pointer" />
          </label>
        </div>
      </form>
    </div>
  )
}

export default PostForm


