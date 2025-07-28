import { useLoaderData } from 'react-router-dom'
import UsersPost from './UsersPost.jsx';


const UsersPostDetails = () => {
  const post = useLoaderData()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-9 gap-5 h-screen bg-white md:p-0 p-3 md:ml-5'>

      {/* post container */}
      <div className="lg:col-span-6 mt-5   ">
        <UsersPost post={post} />
      </div>

      <div className='lg:col-span-3 h-full md:-ml-5 md:p-5 '>
        <div className='h-full w-full flex justify-center items-center border border-zinc-300 shadow-2xl rounded-md'>
          <h1>Comment Loading. . .</h1>
        </div>
      </div>
    </div>
  )
}

export default UsersPostDetails