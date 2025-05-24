import { useContext, useEffect, useState } from "react"
import PostForm from "../../Components/PostForm/PostForm"
import Posts from "../../Components/Posts/Posts"
import ProfileSidebar from "../../Components/ProfileSidebar/ProfileSidebar"
import { Link, useLoaderData } from "react-router-dom"
import { AuthContext } from "../PrivateRoute/AuthProvider"

const Profile = () => {
  const { userData, setUserData, } = useContext(AuthContext)
  const [btnStyle, setbtnStyle] = useState(1)
  const user = useLoaderData()

  useEffect(() => {
    setUserData(user)
  }, [])






  const activeBtn = "border-b-2 border-blue-600 w-2/5 py-2 cursor-pointer transition-all"
  const inactiveBtn = "border-b-2 border-transparent w-2/5 py-2 cursor-pointer transition-all"

  return (
    <div className="grid lg:grid-cols-9 lg:mt-0 mt-22">

      <div className="lg:col-span-6 ">

        <div className="text-xl font-semibold flex justify-evenly items-center mt-5">
          <button onClick={() => { setbtnStyle(!btnStyle) }} className={`${btnStyle ? activeBtn : inactiveBtn}`}>For You</button>
          <button onClick={() => { setbtnStyle(!btnStyle) }} className={`${btnStyle ? inactiveBtn : activeBtn}`}>Following</button>
        </div>

        <PostForm />

        <div className="p-5">
          <Posts />
        </div>
      </div>


      <div className=" lg:col-span-3 border-l border-zinc-300 bg-[#f1f5f7] p-8">

        <ProfileSidebar />
      </div>
    </div>
  )
}

export default Profile