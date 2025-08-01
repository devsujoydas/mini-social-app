import { Link, useLoaderData } from 'react-router-dom' 
import CommentBox from '../Posts/CommentBox.jsx';


const UsersPostDetails = () => {
  const post = useLoaderData()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-9 gap-5 md:h-screen bg-white md:p-0 p-3 md:ml-5 md:mt-0 mt-10'>
      {/* post container */}
      <div className="lg:col-span-6 mt-5  ">
        <Link to={`/post/${post._id}`}>
          <img className="w-full object-cover rounded-lg" src={`${post?.postImageUrl}`} alt="" />
        </Link>
      </div>
      <div className='lg:col-span-3 h-full md:-ml-5 md:p-5  '>
        <div className='h-full w-full min-h-56 border border-zinc-300 shadow-2xl rounded-md'>
          <CommentBox post={post} />
        </div>
      </div>
    </div>
  )
}

export default UsersPostDetails