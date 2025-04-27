import React, { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useOutletContext } from "react-router-dom";
import { useRef } from "react";
import api from "../api.js";
const UserProfile = () => {
  const { user } = useOutletContext();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);
  function photoHandler() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const ImageUrl = reader.result;
      setSelectedImg(ImageUrl);
      await updateProfile();
    };
  }

  const updateProfile = async () => {
   const res = await api.put("/users/update-profile",{ImageUrl:selectedImg});
  };

  return (
    <div className="w-full h-screen bg-red-50 flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        <h3 className="text-lg text-gray-600">Update Your Profile</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-[10vw] h-[10vw] bg-red-100 rounded-full relative flex items-center justify-center">
          <div
            className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-2 cursor-pointer"
            onClick={photoHandler}
          >
            <CameraAltIcon />
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <h1 className="text-md text-gray-700">
          Click camera to update profile photo
        </h1>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl">Username: {user?.username}</h1>
        <h1 className="text-xl">Email Address: {user?.email}</h1>
      </div>
    </div>
  );
};

export default UserProfile;
