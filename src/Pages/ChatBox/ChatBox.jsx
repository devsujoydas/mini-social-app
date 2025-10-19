import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { IoCall, IoAttach, IoCameraOutline } from "react-icons/io5";
import { MdAddReaction } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const ChatBox = () => {
  const { userData } = useAuth();
  const params = useParams();
  const [friend, setFriend] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMsgId, setEditingMsgId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const scrollRef = useRef();

  // Fetch messages
  useEffect(() => {
    if (!params.id) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/message/${params.id}?userId=${userData._id}`)
      .then((res) => {
        setFriend(res.data.friend);
        setMessages(res.data.messages);
        scrollToBottom();
      })
      .catch(console.error);
  }, [params.id, userData._id]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/message/send`, {
        senderId: userData._id,
        receiverId: friend._id,
        message: newMessage,
      });
      if (res.data.success) {
        setMessages((prev) => [
          ...prev,
          {
            _id: Date.now(),
            message: newMessage,
            createdAt: new Date(),
            senderId: userData._id,
            receiverId: friend._id,
            sender: userData,
            receiver: friend,
          },
        ]);
        setNewMessage("");
        scrollToBottom();
      }
    } catch (err) {
      toast.error("Failed to send message");
      console.error(err);
    }
  };

  const updateMessage = async (msgId) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/message/update`, { messageId: msgId, message: editingText });
      setMessages((prev) => prev.map((msg) => (msg._id === msgId ? { ...msg, message: editingText } : msg)));
      setEditingMsgId(null);
      setEditingText("");
      setDropdownOpenId(null);
      toast.success("Message updated!");
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteMessage = async (msgId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/message/delete/${msgId}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== msgId));
      setDropdownOpenId(null);
      toast.success("Message deleted!");
    } catch {
      toast.error("Delete failed");
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    setDropdownOpenId(null);
  };

  const formatDateTime = (dateStr) => {
    const date = moment(dateStr);
    const time = date.format("hh:mm A");
    if (date.isSame(moment(), "day")) return `Today, ${time}`;
    if (date.isSame(moment().subtract(1, "days"), "day")) return `Yesterday, ${time}`;
    return `${date.format("MMM DD, YYYY")}, ${time}`;
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 p-2">
        <Link to={`/profile/${friend?._id}`} className="flex items-center gap-2">
          <img
            className="w-12 h-12 object-cover rounded-full border border-gray-300"
            src={friend?.profile?.profilePhotoUrl || "/default.jpg"}
            alt=""
          />
          <div>
            <h1 className="font-semibold">{friend?.name}</h1>
            <h1 className="text-xs text-gray-500">@{friend?.username}</h1>
          </div>
        </Link>
        <div className="flex items-center gap-3 text-xl">
          <IoCall className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" />
          <FaVideo className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" />
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 flex flex-col-reverse gap-3 overflow-y-auto p-2">
        {messages.map((msg) => {
          const isSender = msg.senderId === userData._id;
          return (
            <div key={msg._id} className="flex flex-col">
              <p className="text-center text-xs text-gray-400 my-1">{formatDateTime(msg.createdAt)}</p>
              <div className={`flex gap-2 ${isSender ? "justify-end" : "justify-start"} relative`}>
                {!isSender && (
                  <img
                    className="w-9 h-9 object-cover rounded-full border border-gray-300"
                    src={friend?.profile?.profilePhotoUrl || "/default.jpg"}
                    alt=""
                  />
                )}
                <div className="relative group">
                  <div
                    className={`px-4 py-2 max-w-xs md:max-w-md break-words rounded-full shadow ${
                      isSender ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                    }`}
                  >
                    {editingMsgId === msg._id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="px-4 py-1 rounded-full border w-full"
                        />
                        <button
                          onClick={() => updateMessage(msg._id)}
                          className="px-3 bg-blue-500 text-white rounded-full"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      msg.message
                    )}
                  </div>

                  {/* Dropdown */}
                  <div className={`absolute ${isSender ? "-left-10" : "-right-10"} top-0`}>
                    <BsThreeDotsVertical
                      className="cursor-pointer text-gray-500 hover:text-black"
                      onClick={() => setDropdownOpenId(dropdownOpenId === msg._id ? null : msg._id)}
                    />
                    {dropdownOpenId === msg._id && (
                      <div className="absolute top-5 bg-white border rounded-md shadow-lg flex flex-col z-50 w-32">
                        {!isSender ? (
                          <>
                            <button
                              className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                              onClick={() => copyText(msg.message)}
                            >
                              Copy
                            </button>
                            <button
                              className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                              onClick={() => deleteMessage(msg._id)}
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                              onClick={() => {
                                setEditingMsgId(msg._id);
                                setEditingText(msg.message);
                                setDropdownOpenId(null);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                              onClick={() => deleteMessage(msg._id)}
                            >
                              Delete
                            </button>
                            <button
                              className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                              onClick={() => copyText(msg.message)}
                            >
                              Copy
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {isSender && (
                  <img
                    className="w-9 h-9 object-cover rounded-full border border-gray-300"
                    src={userData?.profile?.profilePhotoUrl || "/default.jpg"}
                    alt=""
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border border-gray-300 rounded-full p-2 mt-2 flex items-center gap-2">
        <MdAddReaction className="text-xl cursor-pointer" />
        <input
          type="text"
          placeholder="Message"
          className="flex-1 outline-none px-2 text-sm md:text-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <IoAttach className="text-xl cursor-pointer" />
        <IoCameraOutline className="text-xl cursor-pointer" />
        <button className="bg-blue-500 text-white px-3 py-1 rounded-full" onClick={sendMessage}>
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
