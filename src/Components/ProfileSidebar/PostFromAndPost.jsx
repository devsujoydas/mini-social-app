const img = "https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-1/489885147_1748589156033422_9163824150761745252_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeG0rlIcc6qUT_kppGK00LV6Ywxz5YAM5oBjDHPlgAzmgEcBW8f14b_W7ZVja0mePJxDSo4u_MkexazFS7c-iagC&_nc_ohc=Iwxw3BcdXM0Q7kNvwEigN3i&_nc_oc=Adn9djbCWV4S84gcpDmQpZEzVPPecAZGBVLOKOiBNhCr2fZ4Ef70VASo0OsBMscwC0U&_nc_zt=24&_nc_ht=scontent.fdac24-5.fna&_nc_gid=oBQ_p5wFMK5vd7l9ITGufg&oh=00_AfW68mArGsiuVMta6ZNCJrAdEqCkoA8bmpebE4K7rtsgUA&oe=689E1031"
import { BsFileImage } from "react-icons/bs";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { BiSolidMoviePlay } from "react-icons/bi";
import { useContext } from "react"; 
import UsersPosts from "../UsersPosts/UsersPosts";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../AuthProvider/AuthProvider";



const PostFromAndPost = () => {
    const { userData, setLoading, usersPostsData } = useContext(AuthContext)

    if (!userData) {
        setLoading(true)
    }


    return (
        <>
            {/* Post Form */}
            <div className="border p-3 bg-white border-zinc-300 rounded-lg grid gap-3">
                
                <div className="flex items-center gap-2 text-zinc-500">
                    <div className="md:w-13 w-10 md:h-12.5 h-8.5 cursor-pointer overflow-hidden">
                        <img className="h-full w-full object-cover rounded-full" src={userData?.profilephotourl ? `${userData?.profilephotourl}` : `/default.jpg`} alt="" />
                    </div>
                    <div className="border bg-zinc-100 text-sm hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer border-zinc-200 px-4 py-2 md:py-2.5 w-full transition-all rounded-full">
                        <h1 className=" text-xs md:text-[14px]">Whats on your mind</h1>
                    </div>
                </div>

                <hr className='border text-zinc-300 ' />

                <div className="flex justify-center items-center gap-2 text-xs md:text-sm">
                    <button className='font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer w-full py-1.5 md:py-3 rounded-sm transition-all flex justify-center items-center gap-1'><BsFillCameraReelsFill className=" text-md md:text-2xl text-red-500" />Live Video</button>

                    <button className=' font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer w-full py-1.5 md:py-3 rounded-sm transition-all flex justify-center items-center gap-1'><BsFileImage className=" text-md md:text-2xl text-emerald-500" />Photo/Video</button>

                    <button className=' font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer w-full py-1.5 md:py-3 rounded-sm transition-all flex justify-center items-center gap-1'><BiSolidMoviePlay className=" text-md md:text-2xl text-red-500" />Reel</button>
                </div>
            </div>

            <div className="mt-3">
                {!usersPostsData ? <Loading /> : <  UsersPosts />}
            </div>

        </>
    )
}

export default PostFromAndPost