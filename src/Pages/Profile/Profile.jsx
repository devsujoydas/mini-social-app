import { useState } from "react"
import PostForm from "../../Components/PostForm/PostForm"
import Posts from "../../Components/Posts/Posts"
import ProfileSidebar from "../../Components/ProfileSidebar/ProfileSidebar"
import UsersPosts from "../../Components/UsersPosts/UsersPosts"

const Profile = () => {
  const [btnStyle, setbtnStyle] = useState(1)

  const activeBtn = "border-b-2 border-blue-600 w-2/5 py-2 cursor-pointer transition-all"
  const inactiveBtn = "border-b-2 border-transparent w-2/5 py-2 cursor-pointer transition-all"

  return (
    <div className="relative flex md:flex-row flex-col-reverse  lg:mt-0 mt-12 bg-[#f1f5fa]">

      <div className="md:w-4/5 ">
        <div className="text-xl bg-white font-semibold flex justify-evenly items-center ">
          <button onClick={() => { setbtnStyle(!btnStyle) }} className={`${btnStyle ? activeBtn : inactiveBtn}`}>For You</button>
          <button onClick={() => { setbtnStyle(!btnStyle) }} className={`${btnStyle ? inactiveBtn : activeBtn}`}>Following</button>
        </div>
        <div className="bg-white">
          <PostForm />
        </div>
        <div className="md:p-5 p-3 ">
          <UsersPosts />
        </div>
      </div>


      <div className="md:w-2/5 border-l border-zinc-300 bg-white ">
        <ProfileSidebar />
      </div>
    </div>
  )
}

export default Profile