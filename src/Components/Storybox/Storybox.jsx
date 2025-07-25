import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Autoplay, Pagination } from 'swiper/modules'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useContext } from 'react';

const Storybox = () => {
  const storyimgstyle = 'md:w-20 w-16 md:h-20 h-16 border-3 object-cover border-purple-500 hover:border-red-500 active:scale-95 transition-all duration-500 cursor-pointer rounded-full'
  const { myFriends } = useContext(AuthContext)

  return (
    <div className='bg-white md:p-5 p-2 rounded-xl shadow-xl'>
      <div className='w-full  overflow-hidden ' >
        {myFriends == "" ?
          <div>
            <h1 className='text-center text-zinc-300'>You have no friend here. Add them first</h1>
          </div>
          :
          // <Swiper
          //   slidesPerView={4}
          //   spaceBetween={4}
          //   freeMode={true}
          //   autoplay={{
          //     delay: 1000,
          //     disableOnInteraction: false
          //   }}
          //   breakpoints={{
          //     320: { slidesPerView: 4, spaceBetween: 2 },
          //     377: { slidesPerView: 5, spaceBetween: 2 },
          //     463: { slidesPerView: 6, spaceBetween: 2 },
          //     513: { slidesPerView: 7, spaceBetween: 2 },
          //     609: { slidesPerView: 7, spaceBetween: 2 },
          //     639: { slidesPerView: 8, spaceBetween: 2 },
          //     679: { slidesPerView: 9, spaceBetween: 2 },
          //     976: { slidesPerView: 9, spaceBetween: 2 },
          //     1024: { slidesPerView: 5, spaceBetween: 2 },
          //     1214: { slidesPerView: 6, spaceBetween: 2 },
          //     1373: { slidesPerView: 7, spaceBetween: 2 },
          //     1440: { slidesPerView: 7, spaceBetween: 2 },
          //     1629: { slidesPerView: 9, spaceBetween: 2 },
          //     1920: { slidesPerView: 10, spaceBetween: 2 },
          //     2560: { slidesPerView: 14, spaceBetween: 2 },
          //   }}
          //   modules={[FreeMode, Autoplay]}
          //   className=''
          // >
          //   {friendsData.map((friend, idx) => (
          //     <SwiperSlide key={idx} className=''>
          //       <Link to={`/friends/${friend?.username}`} className='relative '>
          //         <img
          //           className={`md:w-20 w-16 md:h-20 h-16 border-3 object-cover border-purple-500 ${friend.onlineStatus ? "hover:border-emerald-500 border-emeral-500" : "hover:border-red-500"} active:scale-95 transition-all duration-500 cursor-pointer rounded-full`}
          //           src={friend?.profilephotourl ? friend?.profilephotourl : "/default.jpg"} alt="" />
          //         {
          //           friend?.onlineStatus &&
          //           <div className='bg-green-400 h-3 w-3
          //        rounded-full absolute bottom-0 right-4.5 border border-emerald-800'></div>
          //         }
          //       </Link>
          //     </SwiperSlide>
          //   ))}

          // </Swiper>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 py-2">
            {myFriends.map((friend, idx) => (
              <div key={idx} className="shrink-0">
                <Link to={`/friends/${friend?.username}`} className="relative">
                  <img
                    className={`md:w-20 w-16 md:h-20 h-16 object-cover border-3 border-purple-500 ${friend?.onlineStatus ? "hover:border-emerald-500 border-emerald-500" : "hover:border-red-500"} active:scale-95 transition-all duration-500 cursor-pointer rounded-full`}
                    src={friend?.profilephotourl || "/default.jpg"} alt=""
                  />
                  {friend?.onlineStatus && (
                    <div className="bg-green-400 h-4 w-4 rounded-full absolute bottom-1 right-2 border border-emerald-800"></div>
                  )}
                </Link>
              </div>
            ))}
          </div>


        }
      </div>
    </div>
  )
}

export default Storybox