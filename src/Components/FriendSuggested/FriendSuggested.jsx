import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";

const FriendSuggested = () => {
  return (
    <div>

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Friend Suggested</h1>
        <a href="/" className="flex items-center text-lg gap-1 text-blue-600 hover:text-black font-semibold">See All <MdOutlineArrowOutward className="text-2xl" /></a>
      </div>

      <hr className="text-zinc-300 my-5" />

      {/* Friend 1 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-10 h-10 rounded-full" src="https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/299934557_601541308210123_4641967208430796265_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH9h75ZFKBQHF4YbrQBCDaeCYypS01C2rYJjKlLTULatjvlxu5gxoSi0DAXeUou5H7Ysk53g_xRF9h8VTSKLwIW&_nc_ohc=8TJzDRg6FGsQ7kNvwGxevTP&_nc_oc=Adk_oil3LjS11Pe4_bSaN86aRId6Wzu5UisJIBpVw8LVPwyjVy7-AA5MpXJe0bUBReY&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=4mBs7-69D8xtx-xSsykO-A&oh=00_AfKxnxZr0aRT2f-8TKmbR5LCUz7JKM5YFNyykrKi_4RYPA&oe=6820CD51" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all cursor-pointer">Ahadul Islam</h1>
            <p className="text-zinc-500 text-sm">@devahadulislam</p>
          </div>
        </div>
        <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
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
        <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />

      {/* Friend 3 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="active:scale-95 transition-all cursor-pointer">
            <img className="w-10 h-10 rounded-full" src="https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-1/481467792_122199383672129698_4209241168445682482_n.jpg?stp=c92.5.1321.1321a_dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHg_yQ9I_Id6wOSm3XT4Tpmp8nImeV2gSCnyciZ5XaBIJ-IcefUFnDMvzHIIGxL5ABCafyofrPLuC_YgtMT4zV2&_nc_ohc=-eGa2AGEI7kQ7kNvwEg2lbT&_nc_oc=Adn-ND6uOp-IcnPCrVt4QIONibQkKVSVRecMDDwuQvsGpVCCU-Qi2Zl5CoclVN3Guuw&_nc_zt=24&_nc_ht=scontent.fdac99-1.fna&_nc_gid=bGkDxLm2sVpvp9CumVIXjQ&oh=00_AfJ4EH0kC_vP_9LtarwN4nhwJw39_eJXEc28k8VNQEPJrg&oe=6820E6D2" alt="" />
          </div>
          <div>
            <h1 className="font-semibold active:underline transition-all cursor-pointer">Enamul Haque</h1>
            <p className="text-zinc-500 text-sm">@devenamul</p>
          </div>
        </div>
        <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
      </div>

      <hr className="text-zinc-300 my-5" />

    </div>
  )
}

export default FriendSuggested