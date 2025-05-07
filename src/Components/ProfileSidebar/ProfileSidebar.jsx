import { BsThreeDotsVertical } from "react-icons/bs"
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";


const ProfileSidebar = () => {
  return (
    <div className="  space-y-6">

      {/* profile section  */}
      <div className=" flex justify-center items-center flex-col gap-8">

        <div className="">
          <img className="w-30 rounded-full" src="/devsujoydas.png" alt="" />
        </div>

        <div className=" text-center space-y-1">
          <h1 className="font-semibold text-xl">Sujoy Das</h1>
          <h1 className="">@devsujoydas</h1>
          <p className="text-zinc-500">Mymensingh, Bangladesh</p>
        </div>

        <div className=" flex justify-center items-center gap-5">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">548</h1>
            <h1 className="text-xl font-medium text-zinc-500">Post</h1>
          </div>
          <div className="text-center border-zinc-300 border-r-2 border-l-2 px-4">
            <h1 className="text-2xl font-semibold">1.5M</h1>
            <h1 className="text-xl font-medium text-zinc-500">Followes</h1>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">8</h1>
            <h1 className="text-xl font-medium text-zinc-500">Following</h1>
          </div>
        </div>

      </div>

      {/* about me */}
      <div className="space-y-3">
        <h1 className="font-semibold text-xl ">About Me</h1>
        <p className="text-zinc-500">Hi there! 👋 I'm Sujoy Das, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.</p>
        <a className="text-blue-600 font-semibold text-lg hover:text-blue-500" href="/profile" >Read More</a>
      </div>


      {/* contact  */}
      <div>
        <div className="flex justify-between items-center pt-2">
          <h1 className="text-xl font-semibold">Contact Infomation</h1>
          <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
        </div>

        <hr className="text-zinc-300 my-5" />

        <a target="_blank" href="tel:01303436299">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                <IoCallOutline />
              </div>
              <div>
                <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Phone Number</h1>
                <p className="text-zinc-500">+01303436299</p>
              </div>
            </div>
            <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>
        </a>

        <hr className="text-zinc-300 my-5" />

        <a target="_blank" href="mailto:devsujoydas@gmail.com" >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                <MdOutlineEmail />
              </div>
              <div>
                <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Email Address</h1>
                <p className="text-zinc-500">devsujoydas@gmail.com</p>
              </div>
            </div>
            <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>
        </a>

        <hr className="text-zinc-300 my-5" />

        <a target="_blank" href="https://devsujoydas.vercel.app/">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-2xl p-3 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                <TbWorldWww />
              </div>
              <div>
                <h1 className="font-semibold active:underline transition-all text-lg cursor-pointer">Website</h1>
                <p className="text-zinc-500">https://devsujoydas.vercel.app</p>
              </div>
            </div>
            <MdOutlineArrowOutward className="text-3xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>
        </a>

        <hr className="text-zinc-300 my-5" />

      </div >

      {/* Friends */}
      <div className="space-y-3  ">
        <div className="flex justify-between items-center pt-2">
          <h1 className="text-xl font-semibold">Friends</h1>
          <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
        </div>


        <div>
          <hr className="text-zinc-300 my-5" />

          {/* Friend 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="active:scale-95 transition-all cursor-pointer">
                <img className="w-10 h-10 rounded-full" src="https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/476776223_608657025121384_459306901201601229_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGmzj5MzrRPtlztI2x7LUHcUlgl-gkt_VhSWCX6CS39WP8-nfI6bdrO4XJaRPo3zy1x95_sgj9hrDDBsLNUJSg4&_nc_ohc=0hCIR33ducgQ7kNvwFyY7Fk&_nc_oc=AdnIsTV9QxbiG7ctywkHngKpAJkXf74BbaQ-dSJBmYPQpGbqgpVPyKX0BLEDo0zBpSw&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=vA3F32gQ1f87OG0SS9mNqQ&oh=00_AfKnKCJbnKTu2DKRCxHKZwFBkWVqEvgXytiXER4g47o97w&oe=6820E049" alt="" />
              </div>
              <div>
                <h1 className="font-semibold active:underline transition-all cursor-pointer">Ahadul Islam</h1>
                <p className="text-zinc-500 text-sm">@devahadulislam</p>
              </div>
            </div>
            <RiDeleteBin6Line className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>

          <hr className="text-zinc-300 my-5" />

          {/* Friend 2 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="active:scale-95 transition-all cursor-pointer">
                <img className="w-10 h-10 rounded-full" src="https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/474783706_1148459610184954_2782533247798226751_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFMBEX8SX0jSTkut3zU25ZmdpTVMep4FFd2lNUx6ngUV5TCaMrUHz9DjcFU8BypO375t3JNhZ0QHZTvbuhLoZTK&_nc_ohc=YK1DOLfP1FUQ7kNvwHCtIZ9&_nc_oc=AdnyNqnDd-ApiQo4Cig4z3UBltipuDWGsHi80uCqF3jaytYy_VWyz7pLt6bciSRTcl0&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=UEmrC8DtgD40Mf8jO1cOdA&oh=00_AfKQ6ulyS6tLXGjjBE_aon-tPhA1t_ApVcypwGrto24B8w&oe=6820D9CA" alt="" />
              </div>
              <div>
                <h1 className="font-semibold active:underline transition-all cursor-pointer">Maksudur Rahman</h1>
                <p className="text-zinc-500 text-sm">@devmaksudur</p>
              </div>
            </div>
            <RiDeleteBin6Line className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>

          <hr className="text-zinc-300 my-5" />

          {/* Friend 3 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="active:scale-95 transition-all cursor-pointer">
                <img className="w-10 h-10 rounded-full" src="https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-1/481467792_122199383672129698_4209241168445682482_n.jpg?stp=c92.5.1321.1321a_dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHg_yQ9I_Id6wOSm3XT4Tpmp8nImeV2gSCnyciZ5XaBIJ-IcefUFnDMvzHIIGxL5ABCafyofrPLuC_YgtMT4zV2&_nc_ohc=-eGa2AGEI7kQ7kNvwEg2lbT&_nc_oc=Adn-ND6uOp-IcnPCrVt4QIONibQkKVSVRecMDDwuQvsGpVCCU-Qi2Zl5CoclVN3Guuw&_nc_zt=24&_nc_ht=scontent.fdac99-1.fna&_nc_gid=bGkDxLm2sVpvp9CumVIXjQ&oh=00_AfJ4EH0kC_vP_9LtarwN4nhwJw39_eJXEc28k8VNQEPJrg&oe=6820E6D2" alt="" />
              </div>
              <div>
                <h1 className="font-semibold active:underline transition-all cursor-pointer">Enamul Hoque</h1>
                <p className="text-zinc-500 text-sm">@devenamul</p>
              </div>
            </div>
            <RiDeleteBin6Line className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>
          <hr className="text-zinc-300 my-5" />

        </div>
        <br />
        <br />
      </div>



    </div>
  )
}

export default ProfileSidebar