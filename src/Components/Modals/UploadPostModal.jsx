import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 
import { useAuth } from "../../hooks/useAuth";

const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function UploadPostModal({ isOpen, setIsOpen }) {
  const { userData, postsData, setPostsData, usersPostsData, setUsersPostsData } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selected = e.dataTransfer.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      formData
    );
    if (!data.success) throw new Error("Upload failed");
    return data.data.url;
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = "";

      if (file) {
        finalImageUrl = await uploadImage(file);
      } else if (url) {
        finalImageUrl = url;
      }

      const postData = {
        authorId: userData._id,
        content: {
          text: e.target.postContent.value,
          postImageUrl: finalImageUrl || null,
        },
        createdAt: new Date(),
        updatedAt: null,
        likes: [],
        comments: [],
        shares: [],
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/post`,
        postData
      );

      if (res.data?.result?.insertedId) {
        Swal.fire({
          title: "Post Successful 🎉",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        const newPost = {
          _id: res.data.result.insertedId,
          ...postData,
        };

        setPostsData([newPost, ...postsData]);
        setUsersPostsData([newPost, ...usersPostsData]);
        setIsOpen(false);
        e.target.reset();
        setFile(null);
        setPreview(null);
        setUrl("");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to create post",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black/40 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg w-[500px] max-w-[95%] animate-fadeIn relative flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b-zinc-300 border-b">
          <img
            src={userData?.profile?.profilePhotoUrl || "/default-avatar.png"}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="font-medium text-gray-800">
            Create Post as {userData?.name || "User"}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="ml-auto text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handlePostSubmit} className="flex flex-col flex-grow">
          {/* Caption */}
          <textarea
            name="postContent"
            placeholder={`What's on your mind, ${userData?.name || "friend"}?`}
            className="w-full p-4 text-gray-700 resize-none min-h-[100px] focus:outline-none"
          ></textarea>

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-xl m-4 p-6 text-center cursor-pointer relative hover:bg-gray-50 transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {preview ? (
              <div className="relative inline-block">
                <img
                  src={preview}
                  alt="preview"
                  className="mx-auto max-h-52 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 mb-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 16l5-5 4 4 8-8"
                  />
                </svg>
                <p>Drop your image here, or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">
                  Supports: PNG, JPG, JPEG, WEBP
                </p>
              </div>
            )}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Import from URL */}
          <div className="flex items-center gap-2 mx-4 mb-4">
            <input
              type="text"
              placeholder="Or paste image URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="text-red-500 text-lg"
              >
                ×
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 border-t-zinc-300 border-t">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm flex items-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
