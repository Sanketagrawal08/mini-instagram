import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import api from "../api";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

const Feed = () => {
  const { user } = useOutletContext();
  const { followersData } = useAuthStore();
  const [postData, setPostData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/posts/getAllPosts?userId=${user._id}`);
        setPostData(response.data || []);
      } catch (error) {
        setError("Unexpected Error Occurred");
        toast.error("Unexpected Error Occurred");
      }
    };
    if (user?._id) fetchPosts();
  }, [user?._id]);

  const likeClickFunction = async (post) => {
    try {
      const updatedPosts = postData.map((item) =>
        item._id === post._id
          ? {
              ...item,
              likedByCurrentUser: !item.likedByCurrentUser,
              likeCount: item.likedByCurrentUser
                ? item.likeCount - 1
                : item.likeCount + 1,
            }
          : item
      );
      setPostData(updatedPosts);

      await api.post("/posts/like", {
        userId: user._id,
        postId: post._id,
      });
    } catch (error) {
      toast.error("Error liking the post");
    }
  };

  const handlefollow = async (item) => {
    try {
      const userIdToFollow = item.userId._id;
      await api.post(
        `/users/${userIdToFollow}/follow`,
        { currentLoggedInuserId: user._id },
        { withCredentials: true }
      );
    } catch (err) {
      toast.error("Follow failed");
    }
  };

  const handleUnfollow = async (item) => {
    try {
      const userIdToUnfollow = item.userId._id;
      await api.post(
        `/users/${userIdToUnfollow}/unfollow`,
        { currentLoggedInuserId: user._id },
        { withCredentials: true }
      );
    } catch (err) {
      toast.error("Unfollow failed");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <h1 className="text-4xl font-extrabold text-pink-700 mb-10 border-b-1 border-pink-800 pb-3 text-center w-full max-w-4xl">
        Latest Posts
      </h1>

      {error ? (
        <p className="text-red-600 text-xl font-medium">{error}</p>
      ) : postData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {postData.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center p-4 gap-3 border-b">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br from-pink-500 to-purple-500">
                    {item.userId?.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-1">
                      <h2 className="text-md font-semibold text-gray-800">
                        {item.userId?.username || "Unknown"}
                      </h2>
                      <svg
                        aria-label="Verified"
                        fill="rgb(0, 149, 246)"
                        height="14"
                        role="img"
                        viewBox="0 0 40 40"
                        width="14"
                      >
                        <path d="M19.998 3.094..." />
                      </svg>
                    </div>

                    <h1
                      className="font-small bg-pink-600 text-white rounded p-1 cursor-pointer"
                      onClick={() =>
                        isFollowing ? handleUnfollow(item) : handlefollow(item)
                      }
                    >
                      Follow
                    </h1>
                  </div>
                </div>

                {item.media && (
                  <img
                    src={item.media}
                    alt="Post"
                    className="w-full h-60 object-cover"
                  />
                )}

                {/* Like Section */}
                <div className="flex items-center gap-3 px-4 py-2 border-t">
                  <i
                    className={`text-2xl cursor-pointer transition-all duration-200 ${
                      item.likedByCurrentUser
                        ? "ri-heart-fill text-red-500"
                        : "ri-heart-line hover:text-gray-700"
                    }`}
                    onClick={() => likeClickFunction(item)}
                  ></i>
                  <span className="text-gray-700 font-medium">
                    {item.likeCount} Likes
                  </span>
                </div>

                {/* Caption */}
                <div className="px-4 pb-4 text-sm text-gray-700">
                  {item.caption || "No caption provided"}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-lg mt-10">No posts available.</p>
      )}
    </div>
  );
};

export default Feed;
