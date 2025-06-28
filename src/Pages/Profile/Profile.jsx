import { useContext, useState } from "react"
import PostForm from "../../Components/PostForm/PostForm"
import Posts from "../../Components/Posts/Posts"
import ProfileSidebar from "../../Components/ProfileSidebar/ProfileSidebar"
import UsersPosts from "../../Components/UsersPosts/UsersPosts"
import Loading from "../../Components/Loading/Loading"
import { AuthContext } from "../../AuthProvider/AuthProvider"

const Profile = () => {
  const {user, userData, } = useContext(AuthContext)
  const [btnStyle, setbtnStyle] = useState(1)
  const [loadingState, setLoadingState] = useState(true)


  setTimeout(() => {
    setLoadingState(false)
  }, 100);


  const activeBtn = "border-b-2 border-blue-600 w-2/5 py-2 cursor-pointer transition-all"
  const inactiveBtn = "border-b-2 border-transparent w-2/5 py-2 cursor-pointer transition-all"

  return (
    <div>
      {!user?.email?
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
        :
        <div className="relative min-h-screen flex md:flex-row flex-col-reverse  bg-[#f1f5fa] lg:mt-0 mt-12 lg:h-full">

          <div className="md:w-4/5 ">
            <div className="text-xl bg-white font-semibold flex justify-evenly items-center ">
              <button onClick={() => { setbtnStyle(!btnStyle) }} className={`${btnStyle ? activeBtn : inactiveBtn} md:text-lg text-sm`}>For You</button>
              <button onClick={() => { setbtnStyle(!btnStyle) }} className={`${btnStyle ? inactiveBtn : activeBtn} md:text-lg text-sm`}>Following</button>
            </div>
            <div className="bg-white">
              <PostForm />
            </div>
            <div className="md:p-5 p-3 ">
              {loadingState ? <Loading /> : <  UsersPosts />}
            </div>
          </div>

          <div className="md:w-2/5 border-l border-zinc-300 bg-white ">
            <ProfileSidebar />
          </div>
        </div>
      }

    </div>
  )
}

export default Profile