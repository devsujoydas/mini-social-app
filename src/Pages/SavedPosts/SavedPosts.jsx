
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import SavePostSideBar from './SavePostSideBar';
import SavedPostCard from './SavedPostCard';
const SavedPosts = () => {
    const navigate = useNavigate()
    const { savedPosts } = useContext(AuthContext)

    // console.log(savedPosts);

    return (
        <div className=' md:pt-5 pt-18 px-5'>
            <h1 className='md:text-2xl text-xl font-semibold  text-blue-600'>Saved Posts</h1>

            <div className='grid grid-cols-1 lg:grid-cols-9 gap-5'>
                <div className='mt-4 lg:col-span-6'>
                    <div className=' rounded-2xl '>
                        {!savedPosts
                            ?
                            <div className="flex justify-center items-center">
                                <h1 className="text-zinc-400">No post found...</h1>
                            </div>
                            :
                            <div className="grid md:gap-5 gap-3 ">
                                {savedPosts.map((post, idx) => <SavedPostCard key={idx} post={post} />)}
                            </div>
                        }
                    </div>
                </div>
                <div className='lg:col-span-3'>
                    <SavePostSideBar />
                </div>
            </div>
        </div>
    )
}

export default SavedPosts