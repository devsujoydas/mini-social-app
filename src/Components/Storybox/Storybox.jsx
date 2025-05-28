import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Autoplay, Pagination } from 'swiper/modules'
import { AuthContext } from '../../Pages/PrivateRoute/AuthProvider';
import { useContext } from 'react';

const Storybox = () => {
  const storyimgstyle = 'w-20 h-20 border-3 object-cover border-purple-500 hover:border-red-500 active:scale-95 transition-all duration-500 cursor-pointer rounded-full'
  const { friendsData } = useContext(AuthContext)

  return (
    <div className='bg-white md:p-5 p-2 rounded-xl shadow-xl'>
      <div className='w-full rounded-full overflow-hidden' >
        {friendsData == "" ?
          <div>
            <h1 className='text-center text-zinc-300'>no friend here..</h1>
          </div>
          :
          <Swiper
            slidesPerView={4}
            spaceBetween={4}
            freeMode={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false
            }}
            breakpoints={{
              768: { slidesPerView: 8, spaceBetween: 5 },
              1024: { slidesPerView: 9, spaceBetween: 1 },
            }}
            modules={[FreeMode, Autoplay]}
            className=''
          >
            {friendsData.map((friend, idx) => (
              <SwiperSlide key={idx}>
                <Link to={`/profiles/${friend?.username}`}>
                  <img className={storyimgstyle} src={friend?.profilephotourl} alt="" />
                </Link>
              </SwiperSlide>
            ))}

          </Swiper>


        }
      </div>
    </div>
  )
}

export default Storybox