import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../api";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

const Feed = () => {
  const { user } = useOutletContext();
  const store = useAuthStore();
  

  const [postData, setPostData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/posts/getAllPosts?userId=${user._id}`);
        setPostData(response.data || []);
      } catch (error) {
        const msg = error?.response?.data?.message || "Unexpected Error Occurred";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
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
      setPostData((prev) =>
        prev.map((item) =>
          item._id === post._id
            ? {
                ...item,
                likedByCurrentUser: post.likedByCurrentUser,
                likeCount: post.likedByCurrentUser
                  ? post.likeCount + 1
                  : post.likeCount - 1,
              }
            : item
        )
      );
    }
  };


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <h1 className="text-4xl font-extrabold text-pink-700 mb-10 border-b-1 border-pink-800 pb-3 text-center w-full max-w-4xl">
        Latest Posts
      </h1>

      {loading ? (
        <p className="text-gray-500 text-lg mt-10">Loading posts...</p>
      ) : error ? (
        <p className="text-red-600 text-xl font-medium">{error}</p>
      ) : postData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {postData.map((item) => {
           

            return (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Post Header */}
                <div className="flex items-center p-4 gap-3 border-b">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br from-pink-500 to-purple-500">
                    {item.userId?.username?.[0]?.toUpperCase() || "U"}
                  </div>
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
                </div>

                {/* Post Media */}
                {item.media && (
                  <img
                    src={item.media}
                    alt="Post"
                    className="w-full h-60 object-cover"
                  />
                )}

                {/* Post Likes */}
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
