import { useContext, useEffect } from "react"
import { AuthContext } from "../../Pages/PrivateRoute/AuthProvider"
import Post from "./Post"

const Posts = () => {
  const { postsData, setPostsData } = useContext(AuthContext)

  

  return (
    <div className=' rounded-2xl  '>
      {postsData.length == 0
        ?
        <div className="flex justify-center items-center">
          <h1 className="text-zinc-400">No post found...</h1>
        </div>
        :
        <div className="grid gap-5">
          {postsData.map((post, idx) => <Post key={idx} post={post} />)}
        </div>
      }
    </div>
  )
}

export default Posts