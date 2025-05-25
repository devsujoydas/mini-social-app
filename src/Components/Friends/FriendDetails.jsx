import React from 'react'
import { useLoaderData } from 'react-router-dom'

const FriendDetails = () => {
    const data = useLoaderData()
    console.log(data)
    const friend = data[0]
    console.log(friend)

    return (
        <div className='h-screen border '>
            {/* <div className='border w-96 mx-auto cursor-pointer border-zinc-300 rounded-md p-5 flex justify-center items-center flex-col gap-3 hover:shadow-lg active:shadow-none duration-300 transition-all  '>
                <div className='w-20 rounded-full overflow-auto'>
                    <img className='w-full  ' src={friend?.imgURL} alt="" />
                    </div>
                    <div className='text-center'>
                    </div>
                    </div> */}

            <div>
                <div className='border h-96 overflow-hidden'>
                    <img
                        className='object-cover w-full object-center' src="https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/501010111_1782992695926401_7171587082084457487_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=TGj4wX9YZoAQ7kNvwE6XVPZ&_nc_oc=AdlPAQsm8wi1XESU5jBVGn-Di1OlusfIphSptLzX0_uHdM1NnhMBVm04Dl7zMZyXi7I&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=v2LHccZ_Qn_KcdAY6rueLA&oh=00_AfJD7v0CY3OQajU9eEd6Fwb5Pr1e04PqS0UEDtUIpfB1iw&oe=683885B8" alt=""
                    />
                </div>

                <div className=' h-20  flex justify-center items-center overflow-auto relative'>
                    <div className='w-40 border-5 border-white fixed -mt-20 z-10 rounded-full overflow-hidden'>
                        <img className=' ' src={friend?.imgURL} alt="" />
                    </div>
                </div>
                <div className='text-center'>
                    <h1 className='text-2xl font-semibold'>{friend?.name}</h1>
                    <h1 className=''>@{friend?.username}</h1>
                </div>


            </div>
        </div>
    )
}

export default FriendDetails