import { useLoaderData } from 'react-router-dom'
import Post from './Post.jsx';


const PostDetails = () => {
  const post = useLoaderData()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-9 gap-5 md:h-screen bg-white md:p-0 p-3 md:ml-5 md:mt-0 mt-10'>
      
      {/* post container */}
      <div className="lg:col-span-6 mt-5  ">
        <Post post={post} />
      </div>

      <div className='lg:col-span-3 h-full md:-ml-5 md:p-5 '>
        <div className='h-full w-full min-h-56 flex justify-center items-center border border-zinc-300 shadow-2xl rounded-md'>
          <h1>Comment Loading. . .</h1>
        </div>
      </div>
    </div>
  )
}

export default PostDetails