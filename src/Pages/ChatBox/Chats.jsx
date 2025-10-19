import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const FriendBubble = ({ friend, onClick }) => (
  <div className="relative flex flex-col items-center mx-2 cursor-pointer">
    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300" onClick={onClick}>
      <img
        src={friend?.profile?.profilePhotoUrl || "/default.jpg"}
        alt={friend?.name}
        className="w-full h-full object-cover"
      />
      {friend?.activeStatus && (
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
      )}
    </div>
    <p className="text-xs text-center mt-1 truncate w-16">{friend?.name}</p>
  </div>
);

const Chats = () => {
  const { friendsData } = useAuth();
  const navigate = useNavigate();

  const handleSelectFriend = (friend) => {
    navigate(`/message/${friend._id}`);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      {/* Top friend carousel */}
      <div className="flex overflow-x-auto border-b border-gray-300 p-2">
        {friendsData?.map((friend) => (
          <FriendBubble key={friend._id} friend={friend} onClick={() => handleSelectFriend(friend)} />
        ))}
      </div>

      {/* ChatBox Outlet */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Chats;
