import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PostModal from "./PostModal";
import MessageIcon from "@mui/icons-material/Message";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Sidebar = ({ user = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ignore", user);
  }, [user]);
  const firstLetter = user?.username?.slice(0, 1) || " ";
  return (
    <div className="w-[20vw] fixed h-screen bg-[#e7e9eb] text-black flex flex-col items-start px-6 py-4">
      <div className="w-full flex justify-center border-b-2">
        <h2 className="text-2xl font-bold text-[#272928] mb-4">Instagram</h2>
       
      </div>
      {!user?.username ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="flex items-center mt-4 mb-8 space-x-3">
           
          </div>
          <div className="ml-2">
            <div className="flex items-center ml-1 gap-2 mb-4">
              <svg
                aria-label="Home"
                className="x1lliihq x1n2onr6 x5n08af cursor-pointer"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Home</title>
                <path
                  d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                ></path>
              </svg>
              <p
                className="cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Home
              </p>
            </div>
            <div
              className="flex items-center ml-1 gap-2"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <svg
                aria-label="New post"
                className="cursor-pointer x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                strokeWidth="24"
              >
                <title>New post</title>
                <path
                  d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="6.545"
                  x2="17.455"
                  y1="12.001"
                  y2="12.001"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="12.003"
                  x2="12.003"
                  y1="6.545"
                  y2="17.455"
                ></line>
              </svg>
              <p className="cursor-pointer">Create</p>
            </div>
            <div className="flex gap-3 mt-4">
              <svg
                aria-label="Explore"
                className="x1lliihq x1n2onr6 x5n08af ml-1"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Explore</title>
                <polygon
                  fill="none"
                  points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
                <polygon
                  fillRule="evenodd"
                  points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                ></polygon>
                <circle
                  cx="12.001"
                  cy="12.005"
                  fill="none"
                  r="10.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></circle>
              </svg>
              <NavLink to="/feed"> Feed</NavLink>
            </div>
            <div className="flex items-center ml-1 mt-3 gap-2">
            <MessageIcon/>
              <NavLink to="/message" >  Message </NavLink>
            </div>
            <div className="flex items-center ml-1 mt-3 gap-2">
             <PersonOutlineIcon/>
              <NavLink to="/user-profile" > Profile </NavLink>
            </div>

           <div className="flex fixed bottom-0 gap-4 text-white left-0 py-4 px-4 bg-neutral-800 w-[20vw]">
           <div className="bg-[#414d63] text-[#ffffff] capitalize rounded-full w-12 h-12 flex items-center justify-center text-lg">
              {firstLetter}
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold capitalize">
                {user.username}
              </h2>
              <h5 className="text-sm">{user.email}</h5>
            </div>
           </div>
          </div>
        </>
      )}

      <PostModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Sidebar;
