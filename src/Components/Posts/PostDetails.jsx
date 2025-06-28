import { AuthContext } from '../../AuthProvider/AuthProvider.jsx';
import { Link, useLoaderData } from 'react-router-dom'
import Post from './Post.jsx';

const PostDetails = () => {
  const post = useLoaderData()

  return (
    <div className='flex h-screen bg-white md:flex-row  flex-col md:p-0 p-3 gap-5 md:ml-5 '>
      {/* post container */}
      <div className="md:w-full md:mt-5 mt-16 ">
        <Post post={post} />
      </div>

      <div className='md:w-1/3 w-full h-full md:-ml-5 md:p-5 '>
        <div className='h-full w-full flex justify-center items-center border border-zinc-300 shadow-2xl rounded-md'>
          <h1>Comment Loading. . .</h1>
        </div>
      </div>

    </div>
  )
}

export default PostDetails