import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import SavedPostCard from './SavedPostCard';

const SavedPosts = () => {
    const navigate = useNavigate();
    const { savedPosts } = useContext(AuthContext);

    return (
        <div className="bg-[#f1f5fa] min-h-screen grid grid-cols-1 lg:grid-cols-9 relative">

            {/* Left side: saved posts */}
            <div className="lg:col-span-6 flex flex-col h-screen">
                <div className="md:sticky top-0 z-10 bg-[#f1f5fa] px-5 py-4">
                    <h1 className="md:text-2xl text-xl font-semibold text-blue-600">Saved Posts</h1>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-3 scroll-smooth">
                    {!savedPosts || savedPosts.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-zinc-400">
                            <h1>No post found...</h1>
                        </div>
                    ) : (
                        <div className="grid md:gap-5 gap-3">
                            {savedPosts.map((post, idx) => (
                                <SavedPostCard key={idx} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right side: sidebar */}
            <div className="lg:col-span-3 bg-white border-l border-zinc-300 flex flex-col h-screen sticky top-0">
                <div className=' rounded-2xl p-5'>
                    <h1 className='font-semibold text-blue-500 text-lg'>Saved Posts List</h1>
                    {!savedPosts
                        ?
                        <div className="flex justify-center items-center">
                            <h1 className="text-zinc-400">No saved post found...</h1>
                        </div>
                        :
                        <div className='grid gap-3'>
                            {savedPosts.map((post, idx) => (
                                <div key={idx} className='hover:shadow-md transition-all duration-500 flex gap-2 border border-zinc-200 rounded-md p-2'>
                                    <Link to={`/post/${post._id}`}>
                                        <img className="w-36 h-24 object-cover rounded-lg" src={`${post?.postImageUrl}`} alt="" />
                                    </Link>
                                    <h1 className="space-x-2 px-2 cursor-pointer pt-2  text-sm flex text-wrap font-semibold flex-wrap">{post?.postContent}</h1>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SavedPosts;
