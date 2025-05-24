import { BsThreeDotsVertical } from "react-icons/bs"
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Pages/PrivateRoute/AuthProvider";
import { useContext } from "react";


const ProfileSidebar = () => {
  const { signOutUser, userData } = useContext(AuthContext)
  const { name, username, email, address, profilephotourl, phone, website, posts } = userData;


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
    <div className="relative h-full  space-y-6">

      {/* profile section  */}
      <div className=" flex justify-center items-center flex-col gap-8">
        <div className="flex justify-between items-end w-full text-lg font-semibold">
          <Link to={`/updateInfo/${email}`} className="text-emerald-700 cursor-pointer hover:text-emerald-500 active:scale-95 transition-all ">Update Profile</Link>
          <button onClick={() => signOutHander()} className="text-red-700 cursor-pointer hover:text-red-500 active:scale-95 transition-all ">Log Out</button>
        </div>

        <div className="w-30 h-30 overflow-hidden relative  ">
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
            <h1 className="text-2xl font-semibold">1</h1>
            <h1 className="text-xl font-medium text-zinc-500">Post</h1>
          </div>
          <div className="text-center border-zinc-300 border-r-2 border-l-2 px-4">
            <h1 className="text-2xl font-semibold">36</h1>
            <h1 className="text-xl font-medium text-zinc-500">Followers</h1>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">8</h1>
            <h1 className="text-xl font-medium text-zinc-500">Following</h1>
          </div>
        </div>

      </div>

      <div className="sticky top-0">

        {/* about me */}
        <div className="space-y-3">
          <h1 className="font-semibold text-xl ">About Me</h1>
          <p className="text-zinc-500">Hi there! 👋 I'm {name}, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.</p>
          <a className="text-blue-600 font-semibold text-lg hover:text-blue-500" href="/profile" >Read More</a>
        </div>


        {/* contact  */}
        <div>
          <div className="flex justify-between items-center pt-2">
            <h1 className="text-xl font-semibold">Contact Infomation</h1>
            <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
          </div>

          <hr className="text-zinc-300 my-5" />

          <a target="_blank" href={`tel:${phone}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                  <IoCallOutline />
                </div>
                <div>
                  <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Phone Number</h1>
                  <p className="text-zinc-500">+{phone}</p>
                </div>
              </div>
              <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
            </div>
          </a>

          <hr className="text-zinc-300 my-5" />

          <a target="_blank" href={`mailto:${email}`} >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                  <MdOutlineEmail />
                </div>
                <div>
                  <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Email Address</h1>
                  <p className="text-zinc-500"> {email}</p>
                </div>
              </div>
              <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
            </div>
          </a>

          <hr className="text-zinc-300 my-5" />

          <a target="_blank" href={website}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                  <TbWorldWww />
                </div>
                <div>
                  <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Website</h1>
                  <p className="text-zinc-500">{website}</p>
                </div>
              </div>
              <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
            </div>
          </a>

          <hr className="text-zinc-300 my-5" />

        </div >

        {/* Friends */}
        <div className="space-y-3  ">
          <div className="flex justify-between items-center pt-2">
            <h1 className="text-xl font-semibold">Friends</h1>
            <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
          </div>


          <div>
            <hr className="text-zinc-300 my-5" />

            {/* Friend 1 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="active:scale-95 transition-all cursor-pointer">
                  <img className="w-10 h-10 rounded-full" src="/ahadul.jpg" alt="" />
                </div>
                <div>
                  <h1 className="font-semibold active:underline transition-all cursor-pointer">Ahadul Islam</h1>
                  <p className="text-zinc-500 text-sm">@devahadulislam</p>
                </div>
              </div>
              <RiDeleteBin6Line className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
            </div>

            <hr className="text-zinc-300 my-5" />

            {/* Friend 2 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="active:scale-95 transition-all cursor-pointer">
                  <img className="w-10 h-10 rounded-full" src="/maksudur.jpg" alt="" />
                </div>
                <div>
                  <h1 className="font-semibold active:underline transition-all cursor-pointer">Maksudur Rahman</h1>
                  <p className="text-zinc-500 text-sm">@devmaksudur</p>
                </div>
              </div>
              <RiDeleteBin6Line className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
            </div>

            <hr className="text-zinc-300 my-5" />

            {/* Friend 3 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="active:scale-95 transition-all cursor-pointer">
                  <img className="w-10 h-10 rounded-full" src="/Enamul.jpg" alt="" />
                </div>
                <div>
                  <h1 className="font-semibold active:underline transition-all cursor-pointer">Enamul Hoque</h1>
                  <p className="text-zinc-500 text-sm">@devenamul</p>
                </div>
              </div>
              <RiDeleteBin6Line className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
            </div>
            <hr className="text-zinc-300 my-5" />

          </div>
          <br />
          <br />
        </div>
      </div>



    </div>
  )
}

export default ProfileSidebar