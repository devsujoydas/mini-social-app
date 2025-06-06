import { useContext, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { AuthContext } from "../PrivateRoute/AuthProvider"
import AllFriends from "../../Components/Friends/AllFriends"

const ChatBox = () => {
   const { friendsData, postsData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [follow, setFollow] = useState(true)
    const data = useLoaderData()
    const { friend, friendPost } = data;
    setTimeout(() => {
        setLoading(false)
    }, 500);

  return (
    <div className="p-10 h-full">
      <div className='grid grid-cols-1 lg:grid-cols-9 '>
        <div className='lg:col-span-6 p-3 md:p-5'>
          
        </div>


        {/* All Friends  */}
        <div className='lg:col-span-3 p-5'>
          <h1 className='text-lg mb-5 font-semibold'>All Friends Suggested</h1>
          <div className='grid  gap-2 '>
            {friendsData?.map((friend, idx) => (
              <AllFriends key={idx} friend={friend} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ChatBox