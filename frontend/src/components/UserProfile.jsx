import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useOutletContext } from "react-router-dom";

const UserProfile = () => {
  const { user } = useOutletContext();
  console.log(user);

  return (
    <div className="w-full h-screen bg-red-50 flex flex-col items-center justify-center gap-8">
      
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        <h3 className="text-lg text-gray-600">Update Your Profile</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-[10vw] h-[10vw] bg-red-100 rounded-full relative flex items-center justify-center">
          
          <div className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-2 cursor-pointer">
            <CameraAltIcon />
          </div>
        </div>

        <h1 className="text-md text-gray-700">Click camera to update profile photo</h1>
      </div>

     
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl">Username: {user?.username}</h1>
        <h1 className="text-xl">Email Address: {user?.email}</h1>
      </div>

    </div>
  );
};

export default UserProfile;
