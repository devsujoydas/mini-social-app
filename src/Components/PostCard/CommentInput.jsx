 
import { VscSend } from "react-icons/vsc"; 
import { FaRegSmile } from "react-icons/fa";
import { ImAttachment } from "react-icons/im"; 
import { Link } from "react-router-dom";



const CommentInput = ({ userData }) => (
  <form className="p-3 md:p-4 flex justify-between items-center gap-2 md:gap-20">
    <div className="flex items-center gap-2 md:gap-4 w-full ">
      <Link to="/profile" className="w-10 h-10 md:w-12 md:h-12">
        <img
          src={userData?.profile?.profilePhotoUrl || "/default.jpg"}
          alt={userData?.name}
          className="w-full h-full rounded-full object-cover"
        />
      </Link>
      <input
        type="text"
        placeholder="Write your comment..."
        className="md:w-full w-33 border border-zinc-400 outline-none text-xs md:text-sm py-2 md:py-3 px-2 md:px-4 rounded-full"
      />
    </div>

    <div className="flex items-center gap-2 md:gap-3 ">
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
);

export default CommentInput