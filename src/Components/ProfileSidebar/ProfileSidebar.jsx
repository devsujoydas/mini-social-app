import { useContext, useState } from "react";
import { Link } from "react-router-dom";
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

const ProfileSidebar = () => {
  const { user, signOutUser, userData, postsData, friendsData ,deleteAccount} = useContext(AuthContext)
  const { name, username, email, address, profilephotourl, phone, website, posts } = userData;
  const [showEdit, setShowEdit] = useState(1)
  const likeCommentStyle = "md:text-xl active:scale-95 w-full transition-all px-4 py-1 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-2"


  const accountDeleteHandle = () => {
    deleteAccount()
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


          <div style={{ backgroundImage: `url('https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/473326143_1322682159089048_7420844185670091157_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=IM9Upbmo0K8Q7kNvwHr2znN&_nc_oc=Adn41UK7Jj6liKjXSgpGn8EB2uRrPPTqhvPlM7eH90g_WJ52Cs7S-j6F1sZd6qed-Lc&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=lPtI8qRBm7o5K8o-PL08Dw&oh=00_AfLw4s9nJgQbWjbIRdW72IGzEH8fhUBhZeqMgNWDdhbxNA&oe=6839778A')` }} className="border h-45 w-full bg-center bg-cover absolute top-0">
            <div className=" h-full p-5">

              <div onClick={() => { setShowEdit(!showEdit) }} className="w-full flex justify-end relative">
                <div className="border w-fit border-zinc-400 md:text-2xl text-xl md;mt-0 mt-3 md:p-3 p-2 rounded-full cursor-pointer  transition-all bg-zinc-200 ">
                  <IoSettingsOutline className="active:scale-95 transition-all" />
                </div>

                <div onClick={() => { setShowEdit(!showEdit) }} className={`absolute right-0 top-14 bg-white  md:w-50 border border-zinc-300 shadow-2xl p-3  rounded-md space-y-1 font-semibold transition-all duration-500 ${showEdit ? '-z-10 opacity-0' : ' opacity-100 z-10'}`} >
                  <Link to={`/updateInfo/${user.email}`} className={likeCommentStyle}>
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

          <div className="w-30 h-30 mt-24 overflow-hidden relative ">
            <img className="rounded-full" src={!profilephotourl ? `/default.jpg` : `${profilephotourl}`} alt="" />
            <h1 className="absolute right-3 bottom-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></h1>
          </div>

          <div className=" text-center space-y-1">
            <h1 className="font-semibold text-xl">{userData ? `${name}` : "Your Name"}</h1>
            <h1 className="">@{userData ? `${username}` : "username"}</h1>
            <p className="text-zinc-500">{userData.address == "" ? "Address" : address}</p>
          </div>

          <div className=" flex justify-center items-center gap-5">
            <div className="text-center">
              {/* <h1 className="text-2xl font-semibold">{posts.length}</h1> */}
              <h1 className="md:text-2xl font-semibold">{postsData.length}</h1>
              <h1 className="md:text-xl font-medium text-zinc-500">Post</h1>
            </div>
            <div className="text-center border-zinc-300 border-r-2 border-l-2 px-4">
              <Link to={'/friends'}>
                <h1 className="md:text-2xl font-semibold">{friendsData.length}</h1>
                <h1 className="md:text-xl hover:text-black transition-all font-medium text-zinc-500">Followers</h1>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="md:text-2xl font-semibold">8</h1>
              <h1 className="md:text-xl font-medium text-zinc-500">Following</h1>
            </div>
          </div>

        </div>

        <div className="px-6 space-y-4">

          {/* about me */}
          <div className="">
            <div className="space-y-3">
              <h1 className="font-semibold text-xl ">About Me</h1>
              <p className="text-zinc-500 ">Hi there! 👋 I'm {name}, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.</p>
            </div>
          </div>

          {/* contact  */}
          <div>
            <div className="flex justify-between items-center pt-2">
              <h1 className="text-xl font-semibold">Contact Infomation</h1>
              <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
            </div>

            <hr className="text-zinc-300 my-3" />

            <a target="_blank" href={`tel:${phone}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                    <IoCallOutline />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all  cursor-pointer">Phone Number</h1>
                    <p className="text-zinc-500 text-sm">+{phone}</p>
                  </div>
                </div>
                <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </div>
            </a>

            <hr className="text-zinc-300 my-3" />

            <a target="_blank" href={`mailto:${email}`} >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                    <MdOutlineEmail />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all  cursor-pointer">Email Address</h1>
                    <p className="text-zinc-500 text-sm">{email}</p>
                  </div>
                </div>
                <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </div>
            </a>

            <hr className="text-zinc-300 my-3" />

            <a target="_blank" href={website}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                    <TbWorldWww />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all  cursor-pointer">Website</h1>
                    <p className="text-zinc-500 text-sm">{website}</p>
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