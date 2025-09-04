import { Link } from "react-router-dom";
import { useContext } from "react";
import PostCard from "../../Components/PostCard/PostCard";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const SavedPosts = () => {
  const { savedPosts, removeSavedPostHandler } = useContext(AuthContext);

  const hasSavedPosts = savedPosts && savedPosts.length > 0;

  return (
    <div className="bg-[#f1f5fa] min-h-screen grid grid-cols-1 lg:grid-cols-9">
      {/* Left: Saved Posts Feed */}
      <div className="lg:col-span-6 flex flex-col h-screen">
        <div className="md:sticky top-0 z-10 bg-[#f1f5fa] px-5 py-4">
          <h1 className="md:text-2xl text-xl font-semibold text-blue-600">
            Saved Posts
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3 scroll-smooth">
          {!hasSavedPosts ? (
            <div className="flex justify-center items-center h-full text-zinc-400">
              <h1>No saved posts found...</h1>
            </div>
          ) : (
            <div className="grid md:gap-5 gap-3">
              {savedPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  variant="saved"
                  onRemove={removeSavedPostHandler}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="lg:col-span-3 bg-white border-l border-zinc-300 flex flex-col h-screen sticky top-0 p-5">
        <h1 className="font-semibold text-blue-500 text-lg mb-4">
          Saved Posts List
        </h1>

        {!hasSavedPosts ? (
          <div className="flex justify-center items-center h-full text-zinc-400">
            <h1>No saved posts found...</h1>
          </div>
        ) : (
          <div className="grid gap-3">
            {savedPosts.map((post) => (
              <Link
                key={post._id}
                to={`/post/${post._id}`}
                className="hover:shadow-md transition-all duration-300 flex gap-2 border border-zinc-200 rounded-md p-2"
              >
                <img
                  src={post?.postImageUrl}
                  alt={post?.content?.text || "Post"}
                  className="w-36 h-24 object-cover rounded-lg"
                />
                <h1 className="px-2 pt-2 text-sm font-semibold line-clamp-3">
                  {post?.content?.text || "No Content"}
                </h1>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
