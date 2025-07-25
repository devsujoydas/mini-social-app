import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Nav from "./Nav";
import Swal from "sweetalert2";

import { IoSearch } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";


const Navbar = () => {
  const { user, userData, signOutUser } = useContext(AuthContext)
  const [gopro, setGopro] = useState(1)
  const [humbarger, setHumbarger] = useState(1)
  const navigate = useNavigate()

  const signOutHander = () => {
    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600 hover:bg-green-700 ml-2 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2",
        cancelButton: "bg-red-600 hover:bg-red-700 mr-2 cursor-pointer  text-white font-bold py-2 px-4 rounded"
      },
      buttonsStyling: false
    });
    swalWithTailwind.fire({
      title: "Logout! Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    })
      .then((result) => {
        if (result.isConfirmed) {
          signOutUser()
            .then(() => {
              // console.log("Sign Out Successfull");
            })
            .catch((error) => {
              console.log(error.message);
            });
          navigate("/login")

          swalWithTailwind.fire({
            title: "Logout!",
            text: "Logout Successfully.",
            icon: "success"
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwind.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
  }

  return (
    <div className="lg:sticky left-0 top-0 ">
      <div className="fixed z-20 w-full bg-white left-0 top-0 border-b border-zinc-400 lg:hidden flex justify-between items-center px-5 py-3">
        <Link to={"/"} className="text-3xl font-semibold font-family-secondary text-blue-600">Xenon Media</Link>
        <div onClick={() => setHumbarger(!humbarger)} className="md:text-5xl text-4xl cursor-pointer active:scale-95 transition-all">
          <IoMenu />
        </div>
      </div>

      {/* nav for lg device  */}
      <div className="">
        <div className=" px-5 py-5 hidden lg:flex flex-col justify-between h-[100vh] border-r border-zinc-300">

          <div className=" space-y-6 ">
            {/* nav logo  */}
            <div className="">
              <Link to={"/"} className="text-3xl font-semibold font-family-secondary text-blue-600">Xenon Media</Link>
            </div>
            {/* search box  */}
            <div className="flex items-center gap-2 relative">
              <input className=" text-xl border border-zinc-300 py-2 pl-10 w-full rounded-full outline-zinc-300" type="text" placeholder="Search..." />
              <IoSearch className="absolute left-3 text-2xl cursor-pointer text-zinc-600" />
            </div>
            {/* nav btn container  */}
            <Nav />
          </div>

          <div className="space-y-5">
            <div className={gopro ? "block" : "hidden"}>
              <div className="text-lg p-4 rounded-2xl bg-[#f4f6f8] space-y-5">
                <div className="flex justify-between items-start  text-2xl">
                  <div className="font-semibold bg-[#d7dfeb]  rounded-full p-4">
                    <FiAlertTriangle />
                  </div>
                  <button onClick={() => setGopro(0)}>
                    <IoCloseSharp className="cursor-pointer active:scale-95 transition-all" />
                  </button>
                </div>
                <h1 className="text-sm">Enjoy unlimited access to our app with only a small price monthly.</h1>
                <div className="font-semibold space-x-5">
                  <button onClick={() => setGopro(0)} className="cursor-pointer active:scale-95 transition-all">Dismiss</button>
                  <button className="text-[#2b1fff] cursor-pointer active:scale-95 transition-all">Go Pro</button>
                </div>
              </div>
            </div>

            <hr className="text-zinc-300" />

            <div className=" flex justify-between items-center cursor-pointer">
              <Link to={`/profile`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 overflow-hidden rounded-full">
                    <img className=" h-full w-full object-cover rounded-full" src={!userData?.profilephotourl ? `/default.jpg` : `${userData?.profilephotourl}`} alt="" />
                  </div>
                  <div className="">
                    <h1 className="font-semibold text-xl">{userData?.name ? `${userData?.name}` : "Your Name"}</h1>
                    <p>Basic Member</p>
                  </div>
                </div>
              </Link>
              <button onClick={() => signOutHander()}>
                <RxExit className="text-3xl cursor-pointer m-3" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* nav for sm device  */}
      <div className={humbarger ? 'bg-white lg:hidden fixed top-0 -left-121 w-full -z-50  opacity-0 duration-700 transition-all' : 'lg:hidden opacity-100 fixed z-50 top-0 left-0 w-full   duration-700 transition-all'} >
        <div className="flex h-[100vh]  w-full ">
          <div className="px-3 py-3 w-2/3 bg-white overflow-hidden flex flex-col justify-between">

            <div className="space-y-7 ">
              {/* nav logo  */}
              <div className=" flex justify-between px-2 items-center cursor-pointer">
                <Link to={"/"} className="text-3xl font-semibold font-family-secondary text-blue-600">Xenon Media</Link>
                <IoCloseSharp onClick={() => setHumbarger(!humbarger)} className="md:text-5xl text-4xl " />
              </div>
              {/* search box  */}
              <div className="flex items-center gap-2 relative">
                <input className=" text-xl border border-zinc-300 md:py-2  py-2 pl-10 w-full rounded-full outline-zinc-300" type="text" placeholder="Search..." />
                <IoSearch className="absolute left-3 text-2xl cursor-pointer text-zinc-600" />
              </div>
              {/* nav btn container  */}
              <div onClick={() => setHumbarger(!humbarger)} >
                <Nav />
              </div>
            </div>

            <div className=" ">
              <hr className="text-zinc-300 pb-3" />
              <div onClick={() => setHumbarger(!humbarger)} className=" flex justify-between items-center cursor-pointer">
                <Link to={`/profile`}>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 overflow-hidden rounded-full">
                      <img className=" h-full w-full object-cover rounded-full" src={!userData?.profilephotourl ? `/default.jpg` : `${userData?.profilephotourl}`} alt="" />
                    </div>
                    <div className="">
                      <h1 className="font-semibold">{userData?.name ? `${userData?.name}` : "Your Name"}</h1>
                      <p className=" text-sm">@{userData?.username ? `${userData?.username}` : "username"}</p>
                    </div>
                  </div>
                </Link>
                <button onClick={() => signOutHander()}>
                  <RxExit className="text-2xl cursor-pointer m-3" />
                </button>
              </div>

            </div>

          </div>

          <div onClick={() => setHumbarger(!humbarger)} className={`${humbarger ? "bg-[#00000000] opacity-0 transition-all duration-500" : "bg-[#000000a2] opacity-100 transition-all duration-500"}  w-1/3 cursor-cell`}>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar