import { useContext, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom'
import FriendPost from './FriendPost';
import AllFriends from './AllFriends';
import { AuthContext } from '../../Pages/PrivateRoute/AuthProvider';
import Loading from '../Loading/Loading';

const FriendDetails = () => {
    const { friendsData, postsData } = useContext(AuthContext) 

    const [loading, setLoading] = useState(false)

    const data = useLoaderData()
    console.log(data)

    const {friend,friendPost} = data;
 
    setTimeout(() => {
        setLoading(false)
    }, 500);




    return (
        <div>

            <div className='grid grid-cols-1 lg:grid-cols-9 '>
                <div className='lg:col-span-6 p-3 md:p-5'>
                    {loading ? <Loading /> :
                        <div>
                            {/* Friends Details  */}
                            <div className=' mb-5'>
                                <div className='md:h-96 rounded-lg h-50 md:mt-0 mt-14 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${friend?.coverphotourl})` }}>
                                </div>
                                <div className='flex justify-center'>
                                    <div className='w-50 h-50 border-4 border-white rounded-full -mt-23  bg-no-repeat bg-cover bg-center'
                                        style={{ backgroundImage: `url(${friend?.profilephotourl})` }}></div>
                                </div>
                                <div className='text-center space-y-1 mt-3'>
                                    <h1 className='text-2xl font-semibold'>{friend?.name}</h1>
                                    <h1 className=''>@{friend?.username}</h1>
                                </div>
                                <div className=" flex justify-center items-center flex-col mt-5">
                                    <div className=" flex justify-center items-center md:gap-10 gap-5 ">
                                        <div className="text-center">
                                            <h1 className="text-xl font-semibold">{friendPost?.length}</h1>
                                            <h1 className=" font-medium text-zinc-500">Post</h1>
                                        </div>
                                        <div className="text-center border-zinc-300 border-r-2 border-l-2 md:px-8 px-3">
                                            <h1 className="text-xl font-semibold">0</h1>
                                            <h1 className=" font-medium text-zinc-500">Followers</h1>
                                        </div>
                                        <div className="text-center">
                                            <h1 className="text-xl font-semibold">0</h1>
                                            <h1 className=" font-medium text-zinc-500">Following</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* post container  */}
                            <div className="grid gap-5">
                                {friendPost.map((post) => <FriendPost key={post._id} post={post} friend={friend} />)}
                            </div>
                        </div>
                    }
                </div>

                {/* All Friends  */}
                <div className='lg:col-span-3 p-5'>

                    <h1 className='text-lg mb-5 font-semibold'>All Friends</h1>

                    <div className='grid  gap-2 '>
                        {friendsData.map((friend, idx) => (
                            <AllFriends key={idx} friend={friend} />
                        ))}
                    </div>
                </div>


            </div>



        </div>
    )
}

export default FriendDetails