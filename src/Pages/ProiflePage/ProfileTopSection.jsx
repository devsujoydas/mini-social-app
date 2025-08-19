import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
const img = "https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-1/489885147_1748589156033422_9163824150761745252_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeG0rlIcc6qUT_kppGK00LV6Ywxz5YAM5oBjDHPlgAzmgEcBW8f14b_W7ZVja0mePJxDSo4u_MkexazFS7c-iagC&_nc_ohc=Iwxw3BcdXM0Q7kNvwEigN3i&_nc_oc=Adn9djbCWV4S84gcpDmQpZEzVPPecAZGBVLOKOiBNhCr2fZ4Ef70VASo0OsBMscwC0U&_nc_zt=24&_nc_ht=scontent.fdac24-5.fna&_nc_gid=oBQ_p5wFMK5vd7l9ITGufg&oh=00_AfW68mArGsiuVMta6ZNCJrAdEqCkoA8bmpebE4K7rtsgUA&oe=689E1031"
const coverimg = "https://scontent.fdac24-4.fna.fbcdn.net/v/t39.30808-6/501010111_1782992695926401_7171587082084457487_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGFLrMlgGZ6qAe3PMdztBdEbfiU8qTLPtdt-JTypMs-18EfeRKVbVbnAdRM0M_SaylnyytG8sUslzvtLDbswsCX&_nc_ohc=b5Cyq4lsvXsQ7kNvwEAzsPz&_nc_oc=AdluZCNo6fovAjWTk19LBu-Nuxq9V7LqWg0kE-dSKExPniuM486090n2K7d2wZVQ8es&_nc_zt=23&_nc_ht=scontent.fdac24-4.fna&_nc_gid=1WE_TygXFPKFDrYAsUzU-A&oh=00_AfVSI5ighbJd4rl_mxyNPZ_phFZsrI1luxlH-Ud0RlXaLQ&oe=689E0938"
import { BsFillCameraFill } from "react-icons/bs"; 
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const ProfileTopSection = () => {
    const { userData, loading, setLoading } = useContext(AuthContext)
    console.log(userData);

    if (!userData) {
        setLoading(true)
    }

    return (
        <div className='w-full bg-white rounded-lg'>

            <div className='w-full h-[150px] md:h-[250px] lg:h-[380px] relative overflow-hidden'>
                <div className=' h-full rounded-lg overflow-hidden'>
                    <img className='w-full h-full object-cover' src={userData?.coverphotourl != "" ? userData?.coverphotourl : "https://www.deped.gov.ph/wp-content/uploads/placeholder.png"} alt="" />
                </div>
                <div className="absolute md:bottom-4 bottom-2 md:right-3 right-2 text-xs md:text-[16px]  flex font-semibold bg-zinc-200 hover:bg-zinc-300 active:scale-95 px-2 md:px-3 py-2 rounded-full md:rounded-md items-center cursor-pointer  transition-all duration-300 border-2 border-white gap-1">
                    <BsFillCameraFill className="text-xl" /> <span className="md:block hidden">Edit Cover Photo</span>
                </div>
            </div>


            <div className='lg:px-20 md:px-8  flex lg:flex-row flex-row md:flex-col gap-3 lg:justify-between md:justify-center  items-center'>

                <div className='flex  gap-1 md:gap-3 lg:flex-row flex-col md:items-center md:p-0 p-3 '>

                    <div className="relative w-fit ">
                        <div className='lg:w-46 md:w-40 w-30 lg:h-46 md:h-40 h-30 object-cover border-4 border-white md:-mt-14 -mt-20 rounded-full overflow-hidden '>
                            <img className='w-full h-full' src={userData?.profilephotourl ? `${userData?.profilephotourl}` : `/default.jpg`} alt="" />
                        </div>

                        <div className="absolute  md:bottom-4 bottom-1 md:right-3 right-1 bg-zinc-300 hover:bg-zinc-200 active:bg-zinc-400 active:scale-95 rounded-full border-2 border-white p-2 md:text-xl text-lg  cursor-pointer ">
                            <BsFillCameraFill className="" />
                        </div>
                    </div>

                    <div className="">
                        <h1 className='md:text-3xl text-2xl font-bold'>{userData.name}</h1>
                        <p className='text-sm mt-1  font-medium text-zinc-500'><a className='hover:underline' href=""><span className="text-black font-semibold">{userData?.myFriends?.length}</span> followers</a> • <a className='hover:underline' href=""><span className="text-black font-semibold">{userData?.sentRequests?.length}</span> following</a></p>
                    </div>

                    <div className="block md:hidden">
                        <p className='text-zinc-600 text-sm mt-2'>{userData?.bio}</p>
                    </div>
                </div>



                <div className="md:block hidden">
                    <button className='flex font-semibold bg-zinc-200 hover:bg-zinc-300 active:scale-95  px-3 py-2 rounded-md items-center cursor-pointer  transition-all duration-300  gap-1'><MdEdit className='text-lg' />Edit</button>
                </div>
            </div>
            <hr className='mt-2 border text-zinc-300' />

            <div className='flex lg:px-20 md:px-8 px-2 py-2 justify-between items-center font-semibold text-zinc-600'>
                <div className=''>
                    <button className='hover:bg-[#F2F4F7] active:bg-[#F2F4F7] cursor-pointer md:px-4 px-2 md:py-3 py-2 rounded-md text-sm border-b-2 border-blue-500'>Post</button>
                    <button className='hover:bg-[#F2F4F7] active:bg-[#F2F4F7] cursor-pointer md:px-4 px-2 md:py-3 py-2 rounded-md text-sm'>About</button>
                    <button className='hover:bg-[#F2F4F7] active:bg-[#F2F4F7] cursor-pointer md:px-4 px-2 md:py-3 py-2 rounded-md text-sm'>More</button>
                </div>
                <div>
                    <button className='hover:bg-[#F2F4F7] active:bg-[#F2F4F7] cursor-pointer md:px-4 px-2 md:py-3 py-2 rounded-md text-xl'><BsThreeDots /></button>
                </div>
            </div>

            <div className="block md:hidden">

            </div>

        </div>
    )
}

export default ProfileTopSection