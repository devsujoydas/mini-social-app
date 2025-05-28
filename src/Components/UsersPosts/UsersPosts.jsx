import { useContext } from 'react'
import { AuthContext } from '../../Pages/PrivateRoute/AuthProvider'
import Post from '../Posts/Post'

const UsersPosts = () => {
  const { usersPostsData } = useContext(AuthContext)
  console.log(usersPostsData)
  
  return (
    <div className=' rounded-2xl  '>
      {usersPostsData.length == 0
        ?
        <div className="flex justify-center items-center">
          <h1 className="text-zinc-400">No post found...</h1>
        </div>
        :
        <div className="grid gap-5">
          {usersPostsData.map((post, idx) => <Post key={idx} post={post} />)}
        </div>
      }
    </div>
  )
}

export default UsersPosts