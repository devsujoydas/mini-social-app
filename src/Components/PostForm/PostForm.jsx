import { FaRegSmile } from "react-icons/fa"
import { VscSend } from "react-icons/vsc"
import { IoMicOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../Pages/PrivateRoute/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PostForm = () => {

  const { user, userData, postsData, setPostsData } = useContext(AuthContext)

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

    // console.log(postData)

    fetch(`http://localhost:3000/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data.result.insertedId)

        if (data.result.insertedId) {
          Swal.fire({
            title: "Post Successfully",
            icon: "success",
            draggable: true
          });
          navigate('/')
        }

        form.reset()
        setPostsData([...postsData, postData])
        // console.log("Post Upload Successfully")
      })

  }
  return (
    <div className=" p-5  border border-zinc-300 ">

      <form onSubmit={handlePostSubmit} className="space-y-4">
        {/* <div className="flex w-full items-start gap-2">
          <label htmlFor="dropzone-file" className=" text-3xl p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <ImAttachment className="text-2xl text-zinc-400 cursor-pointer " />
            <input type="file" id="dropzone-file" className="hidden" />
          </label>
          
          <textarea name="" id="" className=" outline-none p-2 w-full" placeholder="Whats on your mind right now?"></textarea>
        </div> */}

        <div className="flex w-full flex-col items-start gap-2 text-sm">
          <input required name="postImageUrl" type="text" className="outline-none p-2 bg-white border border-zinc-300 rounded-sm w-full  " placeholder="Image Url" />

          <input required name="postContent" type="text" className="outline-none p-2 bg-white h-14 border border-zinc-300 rounded-sm w-full  " placeholder="Whats on your mind right now?" />

        </div>


        <div className="flex items-center justify-end gap-2 ">
          <label className="border border-zinc-400 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <FaRegSmile />
          </label>

          <label className="border border-zinc-400 text-3xl p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <IoMicOutline />
          </label>


          <label className="lg:w-fit flex items-center gap-2 bg-blue-700 hover:bg-blue-600  text-white text-center px-6 py-3 rounded-full cursor-pointer active:scale-95 transition-all">
            <input type="submit" value={"Post"} className="cursor-pointer" /><VscSend className="text-2xl cursor-pointer" />
          </label>
        </div>
      </form>
    </div>
  )
}

export default PostForm


