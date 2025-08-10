import ProfileTopSection from "./ProfileTopSection";
import ProfileIntroSection from "./ProfileIntroSection";
import ProfilePostSection from "./ProfilePostSection";



const ProiflePage = () => {
    return (
        <div className='p-2 md:pt-2 pt-18 min-h-screen bg-[#F2F4F7] font-family-Poppins'>
            {/* Profile Info */}
            <ProfileTopSection />

            {/* Post info */}
            <div className='md:mt-5 mt-2 lg:mx-20 md:mx-10 flex lg:flex-row flex-col gap-5'>
                <div  className="">
                    <ProfileIntroSection />
                </div>
                <ProfilePostSection />
            </div>
        </div>
    )
}

export default ProiflePage