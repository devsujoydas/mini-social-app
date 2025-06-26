import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import { MdEdit } from "react-icons/md";
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
import { IoClose } from "react-icons/io5";


const ProfileSidebar = () => {
  const { user, signOutUser, userData, postsData, usersPostsData, friendsData, deleteAccount } = useContext(AuthContext)

  const [showEdit, setShowEdit] = useState(1)
  const likeCommentStyle = "md:text-xl active:scale-95 w-full transition-all px-2 py-1 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-2"
  const navigate = useNavigate()

  const [loadingSpiner, setLoadingSpiner] = useState(true)

  const [messageStatus, setMessageStatus] = useState(false)
  const [usernameMessage, setUsernameMessage] = useState("This username already existed")


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
    })
      .then((result) => {
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


    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600 hover:bg-green-700 ml-2 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2",
        cancelButton: "bg-red-600 hover:bg-red-700 mr-2 cursor-pointer  text-white font-bold py-2 px-4 rounded"
      },
      buttonsStyling: false
    });
    swalWithTailwind.fire({
      title: "Logout! Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    })
      .then((result) => {
        if (result.isConfirmed) {
          signOutUser()
            .then(() => {
              console.log("Sign Out Successfull");
            })
            .catch((error) => {
              console.log(error.message);
            });
          navigate("/login")

          swalWithTailwind.fire({
            title: "Logout!",
            text: "Logout Successfully.",
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



  const updateUsernameHandler = () => {

  }

  return (
    <div className=" space-y-6 relative h-full ">


      <div className={messageStatus ? "fixed top-0 left-0 w-full h-screen backdrop-blur-sm z-40 flex justify-center items-center " : "hidden"}>

        <div className="relative border max-w-96 w-full md:p-10 p-5 rounded-md bg-white">
          <button className="absolute top-3 right-3">
            <IoClose onClick={() => setMessageStatus(!messageStatus)} className="border border-transparent hover:border-zinc-300 rounded-full p-1 text-4xl hover:bg-zinc-300  cursor-pointer transition-all  " />
          </button>

          <form action="" className="">

            <h1 className="text-3xl font-semibold font-family-secondary text-blue-600 text-center mb-4 ">Update User Name </h1>
            <div className='mb-2'>
              <input defaultValue={userData.username} name="username" type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 " placeholder="Enter Username" />
              <p className={messageStatus ? `mt-2 md:text-sm text-xs text-red-700 font-semibold` : "hidden"} >{usernameMessage}</p>
            </div>

            <button type="submit" className={`text-white font-medium ${loadingSpiner ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-500 w-full py-3 rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5 `}>
              <p className={`${loadingSpiner ? "hidden" : "block"} border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`} />
              <p className={`${loadingSpiner ? "block" : "hidden"}`}>Update</p>
            </button>

          </form>
        </div>
      </div>




      <div className="sticky top-0 ">
        {/* profile section  */}
        <div className=" p-5 flex justify-center items-center flex-col gap-2 md:gap-8">


          <div style={{ backgroundImage: `url(${userData?.coverphotourl ? userData?.coverphotourl : "https://www.deped.gov.ph/wp-content/uploads/placeholder.png"})` }} className="border border-zinc-300 h-45 w-full bg-center bg-cover absolute top-0">
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
            <div className="flex justify-between items-center gap-1 ">
              <p className="w-full"></p>

              <h1 className="w-full">@{userData ? `${userData?.username}` : "username"}</h1>

              <div className="w-full">
                <MdEdit onClick={() => setMessageStatus(!messageStatus)} className=" border border-transparent hover:border-zinc-300 rounded-full p-1 text-2xl hover:bg-zinc-300  cursor-pointer transition-all" />
              </div>

            </div>
            <p className="text-zinc-500">{userData?.address == "" ? "Address" : userData?.address}</p>
          </div>

          <div className=" flex justify-center items-center gap-5">
            <div className="text-center">
              <h1 className="md:text-xl font-semibold">{usersPostsData?.length}</h1>
              <h1 className="md:text-lg font-medium text-zinc-500">Post</h1>
            </div>
            <div className="text-center border-zinc-300 border-r-2 border-l-2 px-4">

              <h1 className="md:text-xl font-semibold">0</h1>
              <h1 className="md:text-lg hover:text-black transition-all font-medium text-zinc-500">Friends</h1>

            </div>
            <div className="text-center">
              <h1 className="md:text-xl font-semibold">0</h1>
              <h1 className="md:text-lg font-medium text-zinc-500">Following</h1>
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