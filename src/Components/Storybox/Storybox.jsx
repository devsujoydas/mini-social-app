import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Autoplay, Pagination } from 'swiper/modules'
import { AuthContext } from '../../Pages/PrivateRoute/AuthProvider';
import { useContext } from 'react';

const Storybox = () => {
  const storyimgstyle = 'w-20 h-20 border-3 border-purple-500 hover:border-red-500 active:scale-95 transition-all duration-500 cursor-pointer rounded-full'
  const { user, userData, signOutUser } = useContext(AuthContext)
  const { profilephotourl } = userData
  return (
    <div className='bg-white p-5 rounded-xl shadow-xl'>

      <div className='w-full rounded-full overflow-hidden' >
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          freeMode={true}
          loop={true}
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
          <SwiperSlide><img className={storyimgstyle} src={`/ahadul.jpg`} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={`/maksudur.jpg`} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={`/devsujoydas.png`} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={`/enamul.jpg`} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={`/mubarok.jpg`} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={`/tamim.jpg`} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={`/sohan.jpg`} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={`/arman.jpg`} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={`/kausar.jpg`} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={`/kawsar.jpg`} alt="" /></SwiperSlide>
        
        </Swiper>
      </div>

    </div>
  )
}

export default Storybox