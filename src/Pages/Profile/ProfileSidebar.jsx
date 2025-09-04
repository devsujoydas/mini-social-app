import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdEdit,
  MdOutlineArrowOutward,
  MdOutlineEmail,
} from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { TbWorldWww } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { FaUserEdit, FaUserSlash, FaFacebook, FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import UpdateUsernameModal from "../../Components/ProfileSidebar/UpdateUsernameModal.jsx";
import UpdateProfileModal from "../../Components/ProfileSidebar/UpdateProfileModal.jsx";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import { BsFillCameraFill } from "react-icons/bs";
import UploadProfilePicture from "../../Components/ProfileSidebar/UploadProfilePicture.jsx";
import ContactInfo from "./ContactInfo.jsx";

const ProfileSidebar = () => {
  const { signOutUser, userData, usersPostsData, deleteAccount } =
    useContext(AuthContext);

  const [showEdit, setShowEdit] = useState(0);
  const navigate = useNavigate();

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // delete account handler
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
        }
      });
  };

  // logout handler
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
        text: "You won’t be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          signOutUser().finally(() => navigate("/login"));
          swalWithTailwind.fire({
            title: "Logout!",
            text: "Logout Successfully.",
            icon: "success",
          });
        }
      });
  };

  return (
    <div className="">
      {/* Modals */}
      <UpdateProfileModal
        showUpdateInfoModal={showUpdateInfoModal}
        setShowUpdateInfoModal={setShowUpdateInfoModal}
      />
      <UpdateUsernameModal
        showUsernameModal={showUsernameModal}
        setShowUsernameModal={setShowUsernameModal}
      />
      <UploadProfilePicture isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Profile Sidebar */}
      <div className="flex flex-col bg-gradient-to-b from-white to-zinc-50">
        {/* Cover Photo */}
        <div
          style={{
            backgroundImage: `url(${
              userData?.coverphotourl
                ? userData?.coverphotourl
                : "https://www.deped.gov.ph/wp-content/uploads/placeholder.png"
            })`,
          }}
          className="relative h-44 w-full bg-center bg-cover rounded-b-2xl shadow-md"
        >
          {/* Cover Camera Icon */}
          <div
            onClick={() => setIsOpen(true)}
            className="absolute bottom-3 right-3 p-3 bg-white rounded-full shadow-md cursor-pointer hover:bg-zinc-100 transition"
          >
            <BsFillCameraFill className="text-xl text-zinc-700" />
          </div>

          {/* Settings Dropdown */}
          <div className="absolute top-4 right-4">
            <div
              onClick={() => setShowEdit(!showEdit)}
              className="p-2 md:p-3 rounded-full bg-white/80 shadow-md cursor-pointer hover:bg-white transition"
            >
              <IoSettingsOutline className="text-xl md:text-2xl text-zinc-700" />
            </div>

            <div
              className={`absolute right-0 z-50 mt-3 w-48 bg-white rounded-xl shadow-lg border border-zinc-200 transition-all duration-300 overflow-hidden ${
                showEdit
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <div className="border border-zinc-200 shadow-xl rounded-xl p-2 ">
                <button
                  onClick={() => setShowUpdateInfoModal(true)}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all hover:bg-zinc-100 active:scale-95 cursor-pointer"
                >
                  <FaUserEdit className="text-emerald-600" /> Edit Profile
                </button>
                <button
                  onClick={() => signOutHander()}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all hover:bg-zinc-100 active:scale-95 cursor-pointer"
                >
                  <FiLogOut className="text-zinc-500" /> Log Out
                </button>
                <button
                  onClick={() => accountDeleteHandle()}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all active:scale-95 cursor-pointer text-red-600 hover:bg-red-50"
                >
                  <FaUserSlash /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center -mt-16">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              src={userData?.profilephotourl || "/default.jpg"}
              alt="Profile"
            />
            <div
              onClick={() => setIsOpen(true)}
              className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-zinc-100 transition"
            >
              <BsFillCameraFill className="text-lg text-zinc-700" />
            </div>
          </div>

          <div className="mt-4 text-center">
            <h1 className="font-semibold text-xl">
              {userData?.name || "Your Name"}
            </h1>
            <div className="flex items-center justify-center gap-2 text-zinc-500">
              <span>@{userData?.username || "username"}</span>
              <MdEdit
                onClick={() => setShowUsernameModal(true)}
                className="p-1 text-xl rounded-full hover:bg-zinc-200 cursor-pointer transition"
              />
            </div>
            <p className="text-sm text-zinc-400">
              {userData?.address || "Address"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <h1 className="text-lg font-semibold">{usersPostsData?.length}</h1>
            <p className="text-sm text-zinc-500">Posts</p>
          </div>
          <Link to={"/friends"} className="text-center border-x px-6">
            <h1 className="text-lg font-semibold">
              {userData?.myFriends?.length}
            </h1>
            <p className="text-sm text-zinc-500">Friends</p>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-semibold">0</h1>
            <p className="text-sm text-zinc-500">Following</p>
          </div>
        </div>

        {/* About & Contact Info */}
        <div className="px-6 mt-8 space-y-6">
          <div>
            <h1 className="font-semibold text-lg mb-2">About Me</h1>
            <p className="text-sm text-zinc-600">
              {userData?.bio || "No bio added."}
            </p>
          </div>

         <ContactInfo userData={userData}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
