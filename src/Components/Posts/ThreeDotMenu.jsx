import { MdEdit } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaCircleMinus } from "react-icons/fa6";
import axios from "axios"; 
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const ThreeDotMenu = ({ post, setShowEdit, showEdit }) => {
    const { userData, savePostHandler } = useContext(AuthContext)



    const likeCommentStyle = "md:text-[16px] active:scale-95 w-full transition-all px-3 py-1 md:py-2 rounded-md hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1"
    const editTrashBtnStyle = "active:scale-95 w-full transition-all px-3 py-1 rounded-md  hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1"

    const [showUsers, setShowUsers] = useState(false)
    const [like, setlike] = useState(false)
    const [reactorsUsers, setReactorsUsers] = useState([])
    const [likesCount, setLikesCount] = useState(post.likes.length)

    useEffect(() => {
        if (post?.likes.length > 0 && userData?._id) {
            setReactorsUsers(post.likes)
            const likedUser = post?.likes.find(likedUserId => likedUserId.userId == userData?._id);
            if (!likedUser) return
            setlike(true)
        }
    }, [post.likes, userData]);

    const likeHandler = () => {
        const userId = userData?._id;
        const username = userData?.username;
        const name = userData?.name;
        const fromData = { name, username, userId };

        axios.put(`${import.meta.env.VITE_BACKEND_URL}/post/like/${post._id}`, fromData)
            .then(res => {
                if (res.data.message === "Liked") {
                    setlike(true);
                    setLikesCount(prev => prev + 1);
                    toast.success('Liked!')
                }
                if (res.data.message === "Disliked") {
                    setlike(false);
                    setLikesCount(prev => prev - 1);
                    toast.success('Disliked!')
                }
            }).catch(err => console.error(err));

    };

    const url = `${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`

    const sharePostHandler = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success('Post Url Copied Successfully!')
            })
            .catch((err) => {
                console.error("Copy failed: ", err);
            });
    }








    return (
        <div>
            {post?.authorUsername == userData?.username ?
                <div onMouseLeave={() => { setShowEdit(!showEdit) }} onClick={() => { setShowEdit(!showEdit) }} className={`absolute top-8 right-4 md:right-6 bg-white  w-50 border border-zinc-300 shadow-2xl p-3  rounded-md space-y-2 transition-all duration-500 ${showEdit ? '-z-10 opacity-0' : ' opacity-100 z-10'}`} >
                    <button onClick={() => sharePostHandler()} className={`${editTrashBtnStyle} bg-zinc-100 border border-zinc-200`}>
                        <h1 className='flex justify-center items-center gap-2   '> {<FaCopy />} Copy Url</h1>
                    </button>
                    <Link to={`/post/update/${post?._id}`} className={`${editTrashBtnStyle} bg-zinc-100 border border-zinc-200`}>
                        <h1 className='flex justify-center items-center gap-2 '> {<MdEdit />} Edit Post</h1>
                    </Link>
                    <button className={editTrashBtnStyle}>
                        <h1 className='flex justify-center items-center gap-2 '> {<IoSettings />} Edit audience</h1>
                    </button>
                    <hr className="" />
                    <button className={editTrashBtnStyle}>
                        <h1 className='flex  justify-center items-center gap-2 '> {<FaArchive />} Move to archive</h1>
                    </button>
                    <button onClick={() => { deletePost() }} className={`${editTrashBtnStyle} border bg-zinc-100 border-zinc-200`}>
                        <h1 className='flex justify-center items-center gap-2 '> {<FaTrashCan />} Move to trash</h1>
                    </button>
                </div>
                :
                <div onMouseLeave={() => { setShowEdit(!showEdit) }} onClick={() => { setShowEdit(!showEdit) }} className={`absolute top-8 right-4 md:right-6 bg-white  w-50 border border-zinc-300 shadow-2xl p-3  rounded-md space-y-2 transition-all duration-500 ${showEdit ? '-z-10 opacity-0' : ' opacity-100 z-10'}`} >
                    <button onClick={() => sharePostHandler()} className={`${editTrashBtnStyle} bg-zinc-100 border border-zinc-200`}>
                        <h1 className='flex justify-center items-center gap-2   '> {<FaCopy />} Copy Url</h1>
                    </button>
                    <button className={editTrashBtnStyle}>
                        <h1 className='flex justify-center items-center gap-2 '> <span className="">{<FaCircleMinus />}</span> Not Interested</h1>
                    </button>
                    <button onClick={() => savePostHandler(post)} className={`${editTrashBtnStyle} bg-zinc-100 border border-zinc-200`}>
                        <h1 className='flex justify-center items-center gap-2  '> <span className="">{<FaBookmark />}</span> Save post</h1>
                    </button>
                    <button className={editTrashBtnStyle}>
                        <h1 className='flex justify-center items-center gap-2 '> <span className="">{<IoSettings />}</span> Hide Post</h1>
                    </button>
                    <hr className="" />
                    <button className={editTrashBtnStyle}>
                        <h1 className='flex  justify-center items-center gap-2 '> <span className="">{<FaArchive />}</span> Report Post</h1>
                    </button>
                </div>}
        </div>
    )
}

export default ThreeDotMenu