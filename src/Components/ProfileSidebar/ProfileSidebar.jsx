import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Pages/PrivateRoute/AuthProvider";

import { BsThreeDotsVertical } from "react-icons/bs"
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const ProfileSidebar = () => {
  const { user, signOutUser, userData, postsData, usersPostsData, friendsData, deleteAccount } = useContext(AuthContext)

  const [showEdit, setShowEdit] = useState(1)
  const likeCommentStyle = "md:text-xl active:scale-95 w-full transition-all px-2 py-1 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-2"
  const navigate = useNavigate()


  const accountDeleteHandle = () => {
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
      confirmButtonText: "Yes, delete account!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        deleteAccount()
        navigate("/login")

        swalWithTailwind.fire({
          title: "Account Deleted!",
          text: "Your account has been deleted.",
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

  const signOutHander = () => {
    signOutUser()
      .then(() => {
        console.log("Sign Out Successfull");
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigate("/login")
  }

  return (
    <div className="space-y-6 relative h-full ">

      <div className="sticky top-0 ">
        {/* profile section  */}
        <div className=" p-5 flex justify-center items-center flex-col gap-2 md:gap-8">


          <div style={{ backgroundImage: `url(${userData?.coverphotourl})` }} className=" h-45 w-full bg-center bg-cover absolute top-0">
            <div className=" h-full p-5">

              <div onClick={() => { setShowEdit(!showEdit) }} className="w-full flex justify-end relative">
                <div className="border w-fit border-zinc-400 md:text-2xl text-xl md:mt-0 mt-3 md:p-3 p-2 rounded-full cursor-pointer  transition-all bg-zinc-200 hover:bg-zinc-400 ">
                  <IoSettingsOutline className="active:scale-95 active:rotate-45 transition-all" />
                </div>

                <div onClick={() => { setShowEdit(!showEdit) }} className={`absolute right-0 top-14 bg-white  md:w-44 border border-zinc-300 shadow-2xl p-3  rounded-md space-y-1 font-semibold transition-all duration-500 ${showEdit ? '-z-10 opacity-0' : ' opacity-100 z-10'}`} >
                  <Link to={`/updateInfo/${user?.email}`} className={likeCommentStyle}>
                    <h1 className='flex justify-center items-center gap-2  text-sm text-emerald-700  '> {<FaUserEdit />} Edit Profile</h1>
                  </Link>
                  <button onClick={() => signOutHander()} className={likeCommentStyle}>
                    <h1 className='flex justify-center items-center gap-2 text-sm '> {<FiLogOut />} LogOut</h1>
                  </button>
                  <button onClick={() => accountDeleteHandle()} className={likeCommentStyle}>
                    <h1 className='flex text-red-500 justify-center items-center gap-2 text-sm '> {<FaUserSlash />} Delete Account</h1>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="w-36 h-36 mt-22 overflow-hidden relative ">
            <img className="rounded-full w-36 h-36 border-4 border-white object-cover " src={!userData?.profilephotourl ? `/default.jpg` : `${userData?.profilephotourl}`} alt="" />
            <h1 className="absolute right-3 bottom-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></h1>
          </div>

          <div className=" text-center md:-mt-5 space-y-1">
            <h1 className="font-semibold text-xl">{userData ? `${userData?.name}` : "Your Name"}</h1>
            <h1 className="">@{userData ? `${userData?.username}` : "username"}</h1>
            <p className="text-zinc-500">{userData?.address == "" ? "Address" : userData?.address}</p>
          </div>

          <div className=" flex justify-center items-center gap-5">
            <div className="text-center">
              {/* <h1 className="text-2xl font-semibold">{posts.length}</h1> */}
              <h1 className="md:text-xl font-semibold">{usersPostsData?.length}</h1>
              <h1 className="md:text-lg font-medium text-zinc-500">Post</h1>
            </div>
            <div className="text-center border-zinc-300 border-r-2 border-l-2 px-4">
              <Link to={'/friends'}>
                <h1 className="md:text-xl font-semibold">{friendsData?.length}</h1>
                <h1 className="md:text-lg hover:text-black transition-all font-medium text-zinc-500">Friends</h1>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="md:text-xl font-semibold">0</h1>
              <h1 className="md:text-lg font-medium text-zinc-500">Follo  wing</h1>
            </div>
          </div>

        </div>

        <div className="px-6 space-y-4">

          {/* about me */}
          <div className="">
            <div className="space-y-1">
              <h1 className="font-semibold text-xl ">About Me</h1>
              <p className="text-zinc-500 ">{userData?.bio}</p>
            </div>
          </div>

          {/* contact  */}
          <div>
            <div className="flex justify-between items-center pt-2">
              <h1 className="text-xl font-semibold">Contact Infomation</h1>
              <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
            </div>

            <hr className="text-zinc-300 my-3" />

            <a target="_blank" href={`tel:${userData?.phone}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                    <IoCallOutline />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all  cursor-pointer">Phone Number</h1>
                    <p className="text-zinc-500 text-sm">+{userData?.phone}</p>
                  </div>
                </div>
                <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </div>
            </a>

            <hr className="text-zinc-300 my-3" />

            <a target="_blank" href={`mailto:${userData?.email}`} >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                    <MdOutlineEmail />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all  cursor-pointer">Email Address</h1>
                    <p className="text-zinc-500 text-sm">{userData?.email}</p>
                  </div>
                </div>
                <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </div>
            </a>

            <hr className="text-zinc-300 my-3" />

            <a target="_blank" href={userData?.website}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                    <TbWorldWww />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all  cursor-pointer">Website</h1>
                    <p className="text-zinc-500 text-sm">{userData?.website}</p>
                  </div>
                </div>
                <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </div>
            </a>

            <hr className="text-zinc-300 my-3" />
          </div >
        </div>
      </div>

    </div>
  )
}

export default ProfileSidebar