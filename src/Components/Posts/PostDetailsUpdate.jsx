
import { VscSend } from "react-icons/vsc";
import { FaRegSmile } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const PostDetailsUpdate = () => {
  const post = useLoaderData()
  const navigate = useNavigate()

  const handlePostDetailsUpdate = (e) => {
    e.preventDefault()
    const form = e.target;
    const postContent = form.postContent.value;
    const postImageUrl = form.postImageUrl.value;
    const lastUpdateDate = new Date();

    const postData = { postImageUrl, postContent, lastUpdateDate }

    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600 hover:bg-green-700 ml-2 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2",
        cancelButton: "bg-red-600 hover:bg-red-700 mr-2 cursor-pointer  text-white font-bold py-2 px-4 rounded"
      },
      buttonsStyling: false
    });

    swalWithTailwind.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.put(`${import.meta.env.VITE_BACKEND_URL}/post/update/${post._id}`, postData)
            .then(res => {
              navigate(-1)
            })
          swalWithTailwind.fire({
            title: "Post Updated!",
            text: "Post Updated Successfully.",
            icon: "success"
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwind.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
  }


  return (
    <div className="md:mt-10 min-h-[90vh] mt-23 md:mx-10 mx-5 flex justify-center gap-5 md:flex-row flex-col">

      <div className="w-full  space-y-5">
        <div className="rounded-md overflow-hidden">
          <img className="hover:scale-105 active:scale-150 cursor-zoom-in duration-500 transition-all" src={post.postImageUrl} alt="" />
        </div>
        <h1 className="">{post.postContent}</h1>
      </div>

      <div className='w-full'>
        <form onSubmit={handlePostDetailsUpdate} className="space-y-4  border  md:p-10 p-5 rounded-md">

          <h1 className="font-semibold text-4xl text-center font-family-secondary text-blue-600">Edit Post</h1>


          <div className="flex w-full flex-col items-start gap-2 text-sm">
            <label className="w-full" htmlFor="">Post URL </label>
            <input disabled defaultValue={post?.postImageUrl} required name="postImageUrl" type="text" className="outline-none p-2 bg-white border cursor-not-allowed border-zinc-300 rounded-sm w-full  " placeholder="Image Url" />


            <label className="w-full" htmlFor="">Content</label>
            <input defaultValue={post?.postContent} required name="postContent" type="text" className="outline-none p-2 bg-white  border border-zinc-300 rounded-sm w-full pb-4  " placeholder="Whats on your mind right now?"></input>
          </div>

          <div className="flex items-center justify-end gap-2 ">
            <label className="border border-zinc-400 text-xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
              <FaRegSmile />
            </label>

            <label className="border border-zinc-400 text-2xl p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
              <IoMicOutline />
            </label>


            <label className="lg:w-fit flex items-center gap-2 bg-blue-700 hover:bg-blue-600  text-white text-center px-6 py-3 rounded-full cursor-pointer active:scale-95 transition-all">
              <input type="submit" value={"Update"} className="cursor-pointer" /><VscSend className="text-2xl cursor-pointer" />
            </label>
          </div>
        </form>
      </div>

    </div>
  )
}

export default PostDetailsUpdate