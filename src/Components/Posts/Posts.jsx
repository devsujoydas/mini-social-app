import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import PostCard from "../PostCard/PostCard";
import PostSkeleton from "./PostSkeleton";

const Posts = () => {
  const { postsData, loading } = useContext(AuthContext);
 
  const skeletons = Array.from({ length: 3 });

  if (loading) {
    return (
      <div className="grid md:gap-5 gap-3">
        {skeletons.map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (!loading && (!postsData || postsData.length === 0)) {
    return (
      <div className="flex justify-center items-center py-10">
        <h1 className="text-zinc-400 text-lg">No posts found...</h1>
      </div>
    );
  }

  return (
    <div className="grid md:gap-5 gap-2">
      {postsData.map((post) => (
        <PostCard key={post._id} post={post} variant="feed" />
      ))}
    </div>
  );
};

export default Posts;
