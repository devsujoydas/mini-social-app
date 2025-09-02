import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsCamera, BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import UpdateUsernameModal from "./UpdateUsernameModal.jsx";
import UpdateProfileModal from "./UpdateProfileModal.jsx";
import { Camera } from "lucide-react";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import { BsFillCameraFill } from "react-icons/bs";
import UploadProfilePicture from "./UploadProfilePicture.jsx";

const ProfileSidebar = () => {
  const { signOutUser, userData, usersPostsData, deleteAccount } =
    useContext(AuthContext);

  const [showEdit, setShowEdit] = useState(0);
  const navigate = useNavigate();

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
  const [showUploadProfilePicture, setShowUploadProfilePicture] =
    useState(false);

  const accountDeleteHandle = () => {
    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 ml-2 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2",
        cancelButton:
          "bg-red-600 hover:bg-red-700 mr-2 cursor-pointer  text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });

    swalWithTailwind
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete account!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteAccount();
          navigate("/login");

          swalWithTailwind.fire({
            title: "Account Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwind.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const signOutHander = () => {
    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 ml-2 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2",
        cancelButton:
          "bg-red-600 hover:bg-red-700 mr-2 cursor-pointer  text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });
    swalWithTailwind
      .fire({
        title: "Logout! Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          signOutUser()
            .then(() => {
              // console.log("Sign Out Successfull");
            })
            .catch((error) => {
              // console.log(error.message);
            });
          navigate("/login");

          swalWithTailwind.fire({
            title: "Logout!",
            text: "Logout Successfully.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwind.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className=" space-y-6 relative h-full ">
      {/* UpdateProfile Modal */}
      <UpdateProfileModal
        showUpdateInfoModal={showUpdateInfoModal}
        setShowUpdateInfoModal={setShowUpdateInfoModal}
      />
      {/* Username Update Modal */}
      <UpdateUsernameModal
        showUsernameModal={showUsernameModal}
        setShowUsernameModal={setShowUsernameModal}
      />

      <UploadProfilePicture
        showUploadProfilePicture={showUploadProfilePicture}
        setShowUploadProfilePicture={setShowUploadProfilePicture}
      />
      

      {/* profile section  */}
      <div className="flex flex-col h-screen sticky top-0 flex-1 overflow-y-auto">
        <div className=" p-5 flex justify-center items-center flex-col gap-2 md:gap-8">
          <div
            style={{
              backgroundImage: `url(${
                userData?.coverphotourl != ""
                  ? userData?.coverphotourl
                  : "https://www.deped.gov.ph/wp-content/uploads/placeholder.png"
              })`,
            }}
            className="border border-zinc-300 h-45 w-full bg-center bg-cover absolute top-0"
          >
            <div className=" h-full p-5">
              <div
                onClick={() => {
                  setShowEdit(!showEdit);
                }}
                className="w-full flex justify-end relative"
              >
                <div className="border w-fit border-zinc-400 md:text-2xl text-xl md:mt-0 mt-3 md:p-3 p-2 rounded-full cursor-pointer  transition-all bg-zinc-200 hover:bg-zinc-400 ">
                  <IoSettingsOutline className="active:scale-95  transition-all" />
                </div>

                <div
                  onClick={() => setShowEdit(!showEdit)}
                  className={`absolute right-0 top-14 bg-white md:w-44 border border-zinc-300 shadow-2xl p-3 rounded-md font-semibold transition-transform duration-300 ease-in-out ${
                    showEdit
                      ? "translate-x-0 opacity-100 z-10"
                      : "translate-x-full opacity-0 -z-10"
                  }`}
                >
                  <button
                    onClick={() => setShowUpdateInfoModal(!showUpdateInfoModal)}
                    className={`md:text-xl active:scale-95 w-full transition-all p-2 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-2`}
                  >
                    <p className="flex justify-center items-center gap-2  text-sm text-emerald-700">
                      <FaUserEdit /> Edit Profile
                    </p>
                  </button>

                  <button
                    onClick={() => signOutHander()}
                    className={`md:text-xl active:scale-95 w-full transition-all p-2 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-2`}
                  >
                    <h1 className="flex justify-center items-center gap-2 text-sm ">
                      {" "}
                      {<FiLogOut />} LogOut
                    </h1>
                  </button>

                  <button
                    onClick={() => accountDeleteHandle()}
                    className={`md:text-xl active:scale-95 w-full transition-all p-2 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-2`}
                  >
                    <h1 className="flex text-red-500 justify-center items-center gap-1 text-sm ">
                      {" "}
                      {<FaUserSlash />} Delete Account
                    </h1>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-36 h-36 mt-22 overflow-hidden relative  ">
            <div className="bg-zinc-200 rounded-full overflow-hidden">
              <img
                className="rounded-full w-36 h-36 border-4 border-white object-cover "
                src={
                  userData?.profilephotourl
                    ? `${userData?.profilephotourl}`
                    : `/default.jpg`
                }
                alt=""
              />
            </div>
            <div className="absolute  md:bottom-4 bottom-1 md:right-3 right-1 bg-zinc-300 hover:bg-zinc-200 active:bg-zinc-400 active:scale-95 rounded-full border-2 border-white p-2 md:text-xl text-lg  cursor-pointer ">
              <BsFillCameraFill className="" />
            </div>
          </div>

          <div className=" text-center md:-mt-5 space-y-1">
            <h1 className="font-semibold text-xl">
              {userData?.name ? `${userData?.name}` : "Your Name"}
            </h1>
            <div className="flex justify-between items-center gap-1 ">
              <p className="w-full"></p>
              <h1 className="w-full">
                @{userData?.username ? `${userData?.username}` : "username"}
              </h1>
              <div className="w-full">
                <MdEdit
                  onClick={() => setShowUsernameModal(!showUsernameModal)}
                  className=" border border-transparent hover:border-zinc-300 rounded-full p-1 text-2xl hover:bg-zinc-300  cursor-pointer transition-all"
                />
              </div>
            </div>

            <p className="text-zinc-500">
              {userData?.address == "" ? "Address" : userData?.address}
            </p>
          </div>

          <div className=" flex justify-center items-center gap-5">
            <div className="text-center">
              <h1 className="md:text-xl font-semibold">
                {usersPostsData?.length}
              </h1>
              <h1 className="md:text-lg font-medium text-zinc-500">Post</h1>
            </div>

            <Link
              to={"/friends"}
              className="text-center border-zinc-300 border-r-2 border-l-2 px-4"
            >
              <h1 className="md:text-xl font-semibold">
                {userData?.myFriends?.length}
              </h1>
              <h1 className="md:text-lg hover:text-black transition-all font-medium text-zinc-500">
                Friends
              </h1>
            </Link>

            <div className="text-center">
              <h1 className="md:text-xl font-semibold">0</h1>
              <h1 className="md:text-lg font-medium text-zinc-500">
                Following
              </h1>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-4">
          <div className="">
            <div className="space-y-1">
              <h1 className="font-semibold md:text-xl text-lg ">About Me</h1>
              <p className="text-zinc-500 md:text-lg text-sm">
                {userData?.bio}
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center pt-2">
              <h1 className="md:text-xl text-lg  font-semibold">
                Contact Infomation
              </h1>
              <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
            </div>

            <hr className="text-zinc-300 my-3" />

            <a target="_blank" href={`tel:${userData?.phone}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl md:p-3 p-2 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                    <IoCallOutline />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all  cursor-pointer">
                      Phone Number
                    </h1>
                    <p className="text-zinc-500 text-sm">+{userData?.phone}</p>
                  </div>
                </div>
                <MdOutlineArrowOutward className="md:text-3xl text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </div>
            </a>

            <hr className="text-zinc-300 my-3" />

            <a target="_blank" href={`mailto:${userData?.email}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl md:p-3 p-2 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                    <MdOutlineEmail />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all  cursor-pointer">
                      Email Address
                    </h1>
                    <p className="text-zinc-500 text-sm">{userData?.email}</p>
                  </div>
                </div>
                <MdOutlineArrowOutward className="md:text-3xl text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </div>
            </a>

            <hr className="text-zinc-300 my-3" />

            <a target="_blank" href={userData?.website}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl md:p-3 p-2 rounded-full cursor-pointer active:scale-95 transition-all bg-[#dde3fd] text-[#2600ff]">
                    <TbWorldWww />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all  cursor-pointer">
                      Website
                    </h1>
                    <p className="text-zinc-500 text-sm">{userData?.website}</p>
                  </div>
                </div>
                <MdOutlineArrowOutward className="md:text-3xl text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </div>
            </a>

            <hr className="text-zinc-300 my-3" />
          </div>
        </div>

        {/* <ProfileSideTop /> 

        <div className="w-4/5 mx-auto">
          <ProfileSideIntro />
        </div>*/}
      </div>
    </div>
  );
};

export default ProfileSidebar;
