import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useContext } from "react"; 
import { AuthContext } from "../../../AuthProvider/AuthProvider";


const PostTableCard = ({ post, deletePost }) => {
    const { userData } = useContext(AuthContext)

    const { postImageUrl, postContent, createdDate, authorEmail, authorName, authorPhoto, likes, shares, comments } = post;

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td scope="row" className=" md:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/post/${post._id}`}>
                        <img className="w-28 h-18 object-cover" src={postImageUrl} alt="" />
                    </Link>
                </td>

                <td className="px-6 md:py-3">{postContent}</td>
                <td className="px-6 md:py-3">{likes.length}</td>
                <td className="px-6 md:py-3">{shares.length}</td>
                <td className="px-6 md:py-3">{comments.length}</td>


                <td className="md:py-3 px-6 ">
                    <Link to={post?.authorUsername === userData?.username ? "/profile" : `/friends/${post?.authorUsername}`} className="flex items-center gap-3">
                        <div><img
                            className="md:w-10 w-8 md:h-10 h-8 rounded-full border-2 border-zinc-300 object-cover "
                            src={`${authorPhoto ? authorPhoto : "/default.jpg"}`}
                            alt="authorPhoto" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="font-semibold ">{authorName}</h1>
                        </div>
                    </Link>
                </td>
                <td className="md:py-3 px-6 md:text-[16px] text-xs">
                    Posted on{" "}
                    {new Date(createdDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </td>
                <td className="md:py-3 px-6 md:text-sm text-xs">
                    <button onClick={() => deletePost(post._id)} className="flex items-center gap-1 border border-zinc-300 rounded-md py-2 px-2 bg-[#a60000] text-white hover:bg-[#ff6565] cursor-pointer active:scale-95 duration-300 transition-all">
                        <FaRegTrashCan className="" />
                        <p className="text-xs">Delete</p>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default PostTableCard