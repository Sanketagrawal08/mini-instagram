import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import api from "../api";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

const Feed = () => {
  const { user } = useOutletContext();
  console.log(user);
  const [postData, setPostData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/posts/getAllPosts?userId=${user._id}`);
        console.log(response.data);
        if (response.data.length === 0) {
          setPostData([]);
        } else {
          setPostData(response.data);
        }
      } catch (error) {
        setError("Unexpected Error Occurred");
        toast.error("Unexpected Error Occurred");
      }
    };
    fetchPosts();
  }, []);

  
  const likeClickFunction = async (post) => {
    try {
      const updatedPosts = postData.map((item) =>
        item._id === post._id
          ? { ...item, likedByCurrentUser: !item.likedByCurrentUser }
          : item
      );
      setPostData(updatedPosts);

      const res = await api.post("/posts/like", {
        userId: user._id,
        postId: post._id,
      });

    } catch (error) {
  
      const updatedPosts = postData.map((item) =>
        item._id === post._id
          ? { ...item, likedByCurrentUser: !item.likedByCurrentUser }
          : item
      );
      setPostData(updatedPosts);

      toast.error("Error liking the post");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <div className="text-center w-full">
        <h1 className="text-3xl font-bold text-pink-800 mb-6 border-b-2 pb-2">
          All Posts
        </h1>
      </div>

      {error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : postData.length > 0 ? (
        <div className="flex gap-6 w-full flex-wrap mt-12">
          {postData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg border border-zinc-300 overflow-hidden"
            >
              <div className="flex items-center p-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-lg">
                    {item.userId?.username?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <h2 className="ml-3 font-semibold text-md">
                      {item.userId?.username || "Unknown"}{" "}
                    </h2>
                  </div>
                  <svg
                    aria-label="Verified"
                    className="x1lliihq x1n2onr6"
                    fill="rgb(0, 149, 246)"
                    height="12"
                    role="img"
                    viewBox="0 0 40 40"
                    width="12"
                  >
                    <path
                      d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              {item.media && (
                <img
                  className="w-70 h-50 object-cover"
                  src={item.media}
                  alt="Post"
                />
              )}
              <div className="flex border-b-1">
                <i
                  className={`p-2 ${
                    item.likedByCurrentUser
                      ? "ri-heart-fill text-red-500"
                      : "ri-heart-line"
                  }`}
                  onClick={() => {
                    likeClickFunction(item);
                  }}
                ></i>
                <h1> {item.likeCount} Likes</h1>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm">
                  {item.caption || "No caption provided"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          <p className="text-gray-500 text-lg">No posts available.</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
