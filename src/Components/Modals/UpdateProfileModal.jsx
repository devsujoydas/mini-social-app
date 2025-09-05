import { useContext, useState, useRef } from "react"; 
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const API_KEY = "13ea5da7a8e8c3267fd71c7a99988b63"; // imgbb key

const UpdateProfileModal = ({ showUpdateInfoModal, setShowUpdateInfoModal }) => {
  const { userData } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState(userData?.profilephotourl || null);
  const [coverPreview, setCoverPreview] = useState(userData?.coverphotourl || null);

  // refs for hidden file inputs so we can trigger click from div
  const profileFileInputRef = useRef(null);
  const coverFileInputRef = useRef(null);

  const handleImageSelect = async (file, type) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);

    if (type === "profile") setProfilePreview(previewUrl);
    if (type === "cover") setCoverPreview(previewUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData);
      const uploadedUrl = res.data.data.url;

      if (type === "profile") {
        document.getElementById("profilephotourl").value = uploadedUrl;
      }
      if (type === "cover") {
        document.getElementById("coverphotourl").value = uploadedUrl;
      }
    } catch (err) {
      Swal.fire("Upload Failed!", "Could not upload image", "error");
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name: e.target.name.value,
      email: userData?.email,
      address: e.target.address.value,
      bio: e.target.bio.value,
      profilephotourl: e.target.profilephotourl.value,
      coverphotourl: e.target.coverphotourl.value,
      phone: e.target.phone.value,
      website: e.target.website.value,
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update`, formData);
      setIsLoading(false);
      if (res.data?.modifiedCount > 0) {
        Swal.fire("Profile info updated successfully!", "", "success");
        setShowUpdateInfoModal(false);
      } else {
        Swal.fire("You didn’t change anything!", "", "question");
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Update Failed!", "Something went wrong", "error");
    }
  };

  // Reusable drag & drop + click file select box
  const DragDropBox = ({ preview, onFileSelect, fileInputRef }) => (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onFileSelect(e.dataTransfer.files[0]);
      }}
      onClick={() => fileInputRef.current.click()}
      className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition relative"
    >
      {preview ? (
        <img src={preview} alt="Preview" className="mx-auto max-h-28 object-cover rounded-md" />
      ) : (
        <p className="text-sm text-gray-500 select-none">
          Drag & drop or click to select image
        </p>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files[0])}
      />
    </div>
  );

  return (
    <div
      className={`${
        showUpdateInfoModal ? "z-40 block opacity-100" : "-z-40 hidden opacity-0"
      } fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-[#00000059] flex justify-center items-center transition-all`}
    >
      <form
        onSubmit={updateProfileHandler}
        className="relative bg-white md:w-1/2 md:p-10 p-5 rounded-md md:space-y-5 space-y-3 w-full md:mx-0 mx-5"
      >
        <div className="absolute md:top-3 top-1 md:right-3 right-1">
          <IoClose
            onClick={() => setShowUpdateInfoModal(false)}
            className="border hover:border-zinc-300 rounded-full p-1 text-4xl hover:bg-zinc-300 cursor-pointer transition-all"
          />
        </div>

        <h1 className="font-semibold text-3xl md:text-4xl text-center text-blue-600">
          Complete Your Profile
        </h1>

        <div className="grid md:gap-5 gap-2">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs md:text-sm font-medium">Name</label>
              <input
                defaultValue={userData?.name}
                name="name"
                type="text"
                className="bg-white border border-slate-300 w-full text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium">Phone</label>
              <input
                defaultValue={userData?.phone}
                name="phone"
                type="text"
                className="bg-white border border-slate-300 w-full text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium">Website</label>
              <input
                defaultValue={userData?.website}
                name="website"
                type="text"
                className="bg-white border border-slate-300 w-full text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter website url"
              />
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium">Address</label>
              <input
                defaultValue={userData?.address}
                name="address"
                type="text"
                className="bg-white border border-slate-300 w-full text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter address"
              />
            </div>
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium">Bio</label>
            <input
              defaultValue={userData?.bio}
              name="bio"
              type="text"
              className="bg-white border border-slate-300 w-full text-xs md:text-sm px-4 py-3 rounded-md outline-blue-500"
              placeholder="Enter bio"
            />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="text-xs md:text-sm font-medium">Profile Photo</label>
            <DragDropBox
              preview={profilePreview}
              onFileSelect={(file) => handleImageSelect(file, "profile")}
              fileInputRef={profileFileInputRef}
            />
            <input
              id="profilephotourl"
              name="profilephotourl"
              type="text"
              defaultValue={userData?.profilephotourl}
              className="hidden"
            />
          </div>

          {/* Cover Photo */}
          <div>
            <label className="text-xs md:text-sm font-medium">Cover Photo</label>
            <DragDropBox
              preview={coverPreview}
              onFileSelect={(file) => handleImageSelect(file, "cover")}
              fileInputRef={coverFileInputRef}
            />
            <input
              id="coverphotourl"
              name="coverphotourl"
              type="text"
              defaultValue={userData?.coverphotourl}
              className="hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`${
            isLoading ? "bg-blue-700" : "bg-blue-500"
          } text-white hover:bg-blue-500 w-full py-3 rounded-md flex justify-center items-center gap-5`}
          disabled={isLoading}
        >
          <p
            className={`${
              isLoading ? "block" : "hidden"
            } border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`}
          />
          <p className={`${isLoading ? "hidden" : "block"}`}>Update</p>
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
