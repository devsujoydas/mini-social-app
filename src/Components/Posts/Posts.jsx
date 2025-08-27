// import { useContext, useEffect } from "react"
// import Post from "./Post"
// import { AuthContext } from "../../AuthProvider/AuthProvider"

// const Posts = () => {
//   const { postsData } = useContext(AuthContext)

//   return (
//     <div className=' rounded-2xl '>
//       {!postsData
//         ?
//         <div className="flex justify-center items-center">
//           <h1 className="text-zinc-400">No post found...</h1>
//         </div>
//         :
//         <div className="grid md:gap-5 gap-3 ">
//           {postsData.map((post, idx) => <Post key={idx} post={post} />)}
//         </div>
//       }
//     </div>
//   )
// }

// export default Posts

import { useContext } from "react";
import Post from "./Post";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import PostSkeleton from "./PostSkeleton"; // 👉 একটা skeleton component বানাও

const Posts = () => {
  const { postsData, loading } = useContext(AuthContext);
 
  return (
    <div className="rounded-2xl">
      {/* 1. Loading হলে skeleton দেখাবে */}
      {loading && (
        <div className="grid md:gap-5 gap-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <PostSkeleton key={idx} />
          ))}
        </div>
      )}

      {/* 2. Loading শেষ, কিন্তু কোনো পোস্ট নাই */}
      {!loading && postsData?.length === 0 && (
        <div className="flex justify-center items-center">
          <h1 className="text-zinc-400">No post found...</h1>
        </div>
      )}

      {/* 3. Data থাকলে */}
      {!loading && postsData?.length > 0 && (
        <div className="grid md:gap-5 gap-3">
          {postsData.map((post, idx) => (
            <Post key={idx} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
