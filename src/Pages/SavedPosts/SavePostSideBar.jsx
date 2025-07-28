import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import { Link } from 'react-router-dom'

const SavePostSideBar = () => {
  const { savedPosts } = useContext(AuthContext)
  return (
    <div>
      <div className=' rounded-2xl '>
        {!savedPosts
          ?
          <div className="flex justify-center items-center">
            <h1 className="text-zinc-400">No post found...</h1>
          </div>
          :
          <div className="grid md:gap-5 gap-3 ">
            {savedPosts.map((post, idx) => (
              <div key={idx}>
                <Link to={`/post/${post._id}`}>
                  <img className="w-full object-cover rounded-lg md:h-[550px] h-56" src={`${post?.postImageUrl}`} alt="" />
                </Link>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default SavePostSideBar