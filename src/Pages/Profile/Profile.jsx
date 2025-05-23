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


  // if (user != {}) {
  //   return <div>Loading</div>
  // }

  useEffect(() => {
    setUserData({ ...userData, ...user })

  }, [])


  const activeBtn = "border-b-2 border-blue-600 w-2/5 py-2 cursor-pointer transition-all"
  const inactiveBtn = "border-b-2 border-transparent w-2/5 py-2 cursor-pointer transition-all"

  return (
    <div className="grid lg:grid-cols-9 lg:mt-0 mt-18 bg-[#f1f5fa]">

      <div className="lg:col-span-6 ">

        <div className="text-xl bg-white font-semibold flex justify-evenly items-center ">
          <button onClick={() => { setbtnStyle(!btnStyle) }} className={`${btnStyle ? activeBtn : inactiveBtn}`}>For You</button>
          <button onClick={() => { setbtnStyle(!btnStyle) }} className={`${btnStyle ? inactiveBtn : activeBtn}`}>Following</button>
        </div>

        <div className="bg-white">

          <PostForm />
        </div>

        <div className="md:p-5 p-3 ">
          <Posts />
        </div>
      </div>


      <div className=" lg:col-span-3 border-l border-zinc-300 bg-white p-8">

        <ProfileSidebar />
      </div>
    </div>
  )
}

export default Profile