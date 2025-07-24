import { useContext, useState } from "react"
import { Link, useLoaderData } from "react-router-dom"
import { AuthContext } from "../../AuthProvider/AuthProvider"
import AllFriends from "./AllFriends"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoAttach } from "react-icons/io5";
import { IoCameraOutline } from "react-icons/io5";
import { MdAddReaction } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import moment from 'moment'
import Loading from "../../Components/Loading/Loading";


const ChatBox = () => {
  const { friendsData, userData } = useContext(AuthContext) 
  const [loading, setLoading] = useState(true)
  const [follow, setFollow] = useState(true)
  const data = useLoaderData()
  const { friend, friendPost } = data; 
  setTimeout(() => {
    setLoading(false)
  }, 500);

  const formSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="h-screen md:overflow-hidden scroll-auto p-3 md:p-5 md:mt-0 mt-16">

      <div className='grid grid-cols-1 lg:grid-cols-9 gap-5'>
        <div className='lg:col-span-6'>
          {loading ? <Loading /> :
            <div className='lg:col-span-6  p-2 border border-zinc-300 rounded-md'>

              <div className="border border-zinc-300 rounded-md md:p-1 flex justify-between items-center">
                <Link to={`/friends/${friend.username}`}>
                  <div className="flex items-center gap-2 hover:bg-zinc-200 cursor-pointer transition-all active:scale-95 p-2 rounded-lg">
                    <img className="md:w-12 w-10 md:h-12 h-10 object-cover border border-zinc-300 rounded-full" src={friend?.profilephotourl ? friend?.profilephotourl : "/default.jpg"} alt="" />
                    <div>
                      <h1 className="md:text-lg text-sm font-semibold">{friend.name}</h1>
                      <h1 className="md:text-sm text-xs">@{friend.username}</h1>
                    </div>
                  </div>
                </Link>
                <div className="md:text-2xl text-lg flex items-center md:gap-5 gap-1 md:mr-2">
                  <button className="p-2 hover:bg-zinc-200 cursor-pointer transition-all active:scale-95 rounded-full"><IoCall /></button>
                  <button className="p-2 hover:bg-zinc-200 cursor-pointer transition-all active:scale-95 rounded-full"><FaVideo /></button>
                  <button className="p-2 hover:bg-zinc-200 cursor-pointer transition-all active:scale-95 rounded-full"><BsThreeDotsVertical /></button>
                </div>
              </div>

              <div className="space-y-3 mt-2 text-sm md:text-lg">
                <div className=" rounded-md md:min-h-[640px] min-h-[450px] md:p-5 p-2 flex flex-col justify-end gap-2">
                  <p className="text-center text-xs ">{moment().subtract(1, 'days').calendar()}</p>
                  <div className=" flex justify-start w-full gap-2">
                    <Link to={`/friends/${friend.username}`}><img className="md:w-9 w-7 md:h-9 h-7 object-cover border border-zinc-300 rounded-full" src={friend?.profilephotourl ? friend?.profilephotourl : "/default.jpg"} alt="" /></Link>
                    <h1 className="border border-zinc-200 text-white w-fit h-fit px-6  py-1 rounded-full bg-zinc-400">Hi</h1>
                  </div>
                  <p className="text-center text-xs ">{moment().format('LT')}</p>
                  <div className=" flex justify-end w-full gap-2 ">
                    <h1 className="border border-zinc-200 text-white w-fit h-fit px-6  py-1 rounded-b-2xl rounded-l-2xl bg-blue-400">Hello</h1>
                    <Link to={`/profile`}><img className="md:w-9 w-7 md:h-9 h-7 object-cover border border-zinc-300 rounded-full" src={userData?.profilephotourl ? userData?.profilephotourl : "/default.jpg"} alt="" /></Link>
                  </div>

                </div>


                <div className="border border-zinc-300 rounded-full  md:px-2 md:py-2 py-1 px-1">
                  <form onSubmit={(e) => formSubmitHandler(e)}>
                    <div className=" text-xl flex items-center md:gap-4 gap-2 md:mr-2">
                      <p className="message-btn"><MdAddReaction /></p>
                      <input className="md:text-lg text-sm w-full outline-none" type="text" placeholder="Message" />
                      <div className="flex justify-center items-center md:gap-4 gap-2">
                        <p className="message-btn bg-zinc-100" ><IoAttach /></p>
                        <p className="message-btn bg-zinc-100"><IoCameraOutline /></p>
                        <button className="message-btn bg-blue-400 text-white"><IoIosSend /></button>
                      </div>
                    </div>
                  </form>
                </div>

              </div>

            </div>
          }
        </div>



        {/* All Friends  */}
        <div className='lg:col-span-3'>
          <h1 className='text-lg font-semibold'>All Inbox</h1>
          <div className='grid  gap-2 '>
            {friendsData?.map((friend, idx) => (
              <AllFriends key={idx} friend={friend} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ChatBox