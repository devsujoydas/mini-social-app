import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Autoplay, Pagination } from 'swiper/modules'
import devsujoydas from "/devsujoydas.png"

const Storybox = () => {
  const storyimgstyle = 'w-18 border-3 border-purple-500 hover:border-red-500 cursor-pointer   rounded-full'

  return (
    <div className=' bg-white rounded-2xl overflow-hidden shadow-xl p-5 flex md:gap-5 gap-2 items-center '>
      
      <div className=''>
        <Swiper
          slidesPerView={10}
          spaceBetween={5}
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false
          }}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 5 },
            1024: { slidesPerView: 8, spaceBetween: 1 },
          }}
          modules={[FreeMode, Autoplay]}
          className='w-[800px] md:max-w-[830px] '
        >
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>
          <SwiperSlide><img className={storyimgstyle} src={devsujoydas} alt="" /></SwiperSlide>

        </Swiper>
      </div>

    </div>
  )
}

export default Storybox