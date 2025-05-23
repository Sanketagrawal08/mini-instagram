import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import UserPosts from "./UserPosts";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const Profile = () => {
  
  const { user } = useOutletContext();


  return (
<div className="flex flex-col p-6 bg-white rounded-lg shadow-md items-center">
  <div className="flex gap-8 items-center mb-6 p-2">
    <div className="w-34 h-34 rounded-full bg-red-400 overflow-hidden">
      <img src="" alt="Profile Picture" className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">{user.username}</h1>
        <Link to={"/user-profile"}>
        <button className="py-1 px-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none">
          Edit Profile
        </button>
        </Link>
      </div>
    </div>
  </div>
  
  <div className="mt-6">
    <UserPosts />
  </div>
</div>

  );
};

export default Profile;
