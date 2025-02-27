import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return <h1>loading...</h1>;
  const firstLetter = user.username.slice(0, 1) || " ";

  return (
    <div className="w-[20vw] relative h-screen bg-[#e7e9eb] text-black flex flex-col items-start px-6 py-4">
      <div className="w-full flex justify-center border-b-2">
        <h2 className="text-2xl font-bold text-[#272928] mb-4">Instagram </h2>
      </div>
      <div className="flex items-center mt-4 mb-6 space-x-3">
        <div className="bg-[#3c392a] text-[#fff] capitalize rounded-full w-8 h-8 flex items-center justify-center text-lg">
          {firstLetter}
        </div>
        <h2 className="text-lg font-semibold capitalize">{user.username}</h2>
      </div>

      <button>
        <i className="ri-add-box-line text-2xl"></i> Create Post
      </button>
    </div>
  );
};

export default Sidebar;
