import { FaRegSmile } from "react-icons/fa"
import { ImAttachment } from "react-icons/im"
import { VscSend } from "react-icons/vsc"
import { IoMicOutline } from "react-icons/io5";


const PostForm = () => {
  return (
    <div className=" p-5  border border-zinc-300 ">

      <form action="">
        <div className="flex w-full items-start gap-2">
          <label htmlFor="dropzone-file" className=" text-3xl p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <ImAttachment className="text-2xl text-zinc-400 cursor-pointer " />
          <input type="file" id="dropzone-file" className="hidden" />
          </label>
          <textarea name="" id="" className=" outline-none p-2 w-full" placeholder="Whats on your mind right now?"></textarea>

        </div>


        <div className="flex items-center justify-end gap-2 ">
          <label  className="border border-zinc-400 text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <FaRegSmile />
          </label>

          <label  className="border border-zinc-400 text-3xl p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
            <IoMicOutline />
          </label>


          <label  className="lg:w-fit flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white text-center px-6 py-3 rounded-full cursor-pointer active:scale-95 transition-all">
            <input type="submit" value={"Post"} className="" /><VscSend className="text-2xl" />
          </label>
        </div>
      </form>
    </div>
  )
}

export default PostForm


