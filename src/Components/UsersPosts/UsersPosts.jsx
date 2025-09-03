import { useContext } from 'react'  
import UsersPost from './UsersPost'
import { AuthContext } from '../../AuthProvider/AuthProvider'

const UsersPosts = () => {
  const { usersPostsData } = useContext(AuthContext)
  return (
    <div className=' rounded-2xl  '>
      {usersPostsData.length == 0
        ?
        <div className="flex justify-center items-center">
          <h1 className="text-zinc-400">No post found...</h1>
        </div>
        :
        <div className="grid md:gap-5 gap-3">
          {usersPostsData?.map((post, idx) => <UsersPost key={idx} post={post} />)}
        </div>
      }
    </div>
  )
}

export default UsersPosts