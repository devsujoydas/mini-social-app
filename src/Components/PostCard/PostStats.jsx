import { Link } from "react-router-dom";

const PostStats = ({ reactorsUsers, showUsers, setShowUsers, post }) => (
    <div className="flex justify-between items-center mt-2 text-sm px-4 pb-2">
        <div className="flex items-center gap-1">
            <img
                src="/like.png"
                alt="Like"
                className="w-4 h-4 md:w-5 md:h-5 rounded-full"
            />
            {reactorsUsers.length > 0 && (
                <div
                    className="flex gap-1 cursor-pointer relative"
                    onMouseEnter={() => setShowUsers(true)}
                >
                    {showUsers && (
                        <div className="absolute bottom-8  left-0 z-10 bg-black/70 text-white p-3 rounded-lg flex flex-col space-y-1 shadow-lg">
                            {reactorsUsers.map((user, idx) => (
                                <Link
                                    key={idx}
                                    to={user.username}
                                    className="hover:underline w-full"
                                >
                                    {user.name}
                                </Link>
                            ))}
                        </div>
                    )}
                    <p className="text-zinc-600 hidden md:block">
                        {(() => {
                            const names = reactorsUsers.map((u) => u.name);
                            const others = names.length - 2;
                            const display = names.slice(0, 2).join(", ");
                            return others > 0 ? `${display} and ${others} others` : display;
                        })()}
                    </p>
                </div>
            )}
        </div>

        <div className="flex items-center gap-3 text-sm">
            <div>{post.comments.length} Comments</div>
            <div>{post.shares.length} Shares</div>
        </div>
    </div>
);

export default PostStats