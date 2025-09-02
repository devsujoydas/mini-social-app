import { useState, useRef, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function UploadModal() {
  const { userData, setUserData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // File select / preview
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

  // Upload file to imgbb and update backend
  const uploadFile = async () => {
    if (!file) return toast.error("Please select a file first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData
      );

      if (!data.success) throw new Error("Upload failed");

      const finalUrl = data.data.url;
      toast.success("Uploaded Successfully!");

      // Send URL to backend
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userData._id}/profile-photo`,
        { profilePhotoUrl: finalUrl }
      );

      setUserData({ ...userData, profilePhotoUrl: finalUrl });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Upload or backend update failed!");
    } finally {
      setLoading(false);
    }
  };

  // Upload by URL
  const uploadByUrl = async () => {
    if (!url) return toast.error("Please enter a valid URL!");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        new URLSearchParams({ image: url }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (!data.success) throw new Error("Upload failed");

      const finalUrl = data.data.url;
      toast.success("Uploaded Successfully!");

      // Send URL to backend
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userData._id}/profile-photo`,
        { profilePhotoUrl: finalUrl }
      );

      setUserData({ ...userData, profilePhotoUrl: finalUrl });
      setIsOpen(false);
      setUrl("");
    } catch (error) {
      console.error(error);
      toast.error("Upload or backend update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    

      {/* Upload button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Upload
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[500px] max-w-[95%] animate-fadeIn relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-5">
                Upload Photos
              </h2>

              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="mx-auto max-h-40 rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-blue-100 flex items-center justify-center rounded-lg mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-blue-500"
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
                    </div>
                    <p className="text-gray-600">
                      Drop your image here, or{" "}
                      <span className="text-blue-600 cursor-pointer font-medium">
                        browse
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
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

              {/* Divider */}
              <div className="my-5 flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Import from URL */}
              <p className="text-sm text-gray-600 mb-2">Import from URL</p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add file URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={uploadByUrl}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 text-sm"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200 rounded-b-2xl">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Help Centre
              </button>
              <div className="space-x-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={uploadFile}
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
                >
                  {loading ? "Uploading..." : "Import"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
