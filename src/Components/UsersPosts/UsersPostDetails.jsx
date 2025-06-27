import { AuthContext } from '../../AuthProvider/AuthProvider.jsx';
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { BiLike } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaRegSmile } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { BiCommentDots } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { FaArchive } from "react-icons/fa";
import Swal from 'sweetalert2';
import UsersPost from './UsersPost.jsx';


const UsersPostDetails = () => {
  const likeCommentStyle = "md:text-[16px] active:scale-95 w-full transition-all px-3 py-1 md:py-2 rounded-md hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1"
  const { userData, postsData, setPostsData } = useContext(AuthContext)
  const [showEdit, setShowEdit] = useState(1)

  const post = useLoaderData()
  
  const navigate = useNavigate()


  const deletePost = () => {
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
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://mini-social-app-backend.vercel.app/post/delete/${post._id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            setShowEdit(!showEdit)
            if (data.deletedCount > 0) {
              swalWithTailwind.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              navigate(-1)
              const remaining = postsData.filter(posts => posts._id != post._id)
              setPostsData(remaining)
            }
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

  const [showUsers, setShowUsers] = useState(false)
  const [like, setlike] = useState(false)
  const [reactorsUsers, setReactorsUsers] = useState([])
  const [likesCount, setLikesCount] = useState(post.likes.length)

  useEffect(() => {
    if (post?.likes.length > 0 && userData?._id) {
      setReactorsUsers(post.likes)
      const likedUser = post?.likes.find(likedUserId => likedUserId.userId == userData?._id);
      if (!likedUser) return
      setlike(true)
    }
  }, [post.likes, userData]);

  const likeHandler = () => {
    const userId = userData?._id;
    const username = userData?.username;
    const name = userData?.name;
    const fromData = { name, username, userId };

    fetch(`https://mini-social-app-backend.vercel.app/post/like/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fromData)
    })
      .then(res => res.json())
      .then(data => {

        console.log(data)
        if (data.message === "Liked") {
          setlike(true);
          setLikesCount(prev => prev + 1);
        }

        if (data.message === "Disliked") {
          setlike(false);
          setLikesCount(prev => prev - 1);
        }
      })
      .catch(err => console.error(err));
  };




  return (
    <div className='flex h-screen bg-white md:flex-row  flex-col md:p-0 p-3 gap-5 md:ml-5 '>

      {/* post container */}
      <div className="md:w-full md:mt-5 mt-16 ">
        <UsersPost post={post} />
      </div>


      <div className='md:w-1/3 w-full h-full md:-ml-5 md:p-5 '>
        <div className='h-full w-full flex justify-center items-center border border-zinc-300 shadow-2xl rounded-md'>
          <h1>Comment Loading. . .</h1>
        </div>
      </div>

    </div>
  )
}

export default UsersPostDetails