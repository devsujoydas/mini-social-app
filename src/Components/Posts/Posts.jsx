import { useContext, useEffect } from "react" 
import Post from "./Post"
import { AuthContext } from "../../AuthProvider/AuthProvider"

const Posts = () => {
  const { postsData } = useContext(AuthContext)
   

  return (
    <div className=' rounded-2xl '>
      {!postsData 
        ?
        <div className="flex justify-center items-center">
          <h1 className="text-zinc-400">No post found...</h1>
        </div>
        :
        <div className="grid md:gap-5 gap-3 ">
          {postsData.map((post, idx) => <Post key={idx} post={post} />)}
        </div>
      }
    </div>
  )
}

export default Posts