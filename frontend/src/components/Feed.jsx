import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Feed = () => {
  const [postData, setPostData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/posts/getAllPosts"
        );

        if (response.data.length === 0) {
          setPostData([]);
        } else {
          setPostData(response.data);
        }
      } catch (error) {
        setError("Unexpected Error Occurred");
      }
    };
    fetchPosts();
  }, []);

  return ( 
    
    <div className="flex flex-col items-center p-6 min-h-screen">
      <div className="text-center w-full">
        <h1 className="text-3xl font-bold text-pink-800 underline mb-6">
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
                <h2 className="ml-3 font-semibold text-lg">
                  {item.userId?.username || "Unknown"}
                </h2>
              </div>
              {item.media && (
                <img
                  className="w-70 h-50 object-cover"
                  src={item.media}
                  alt="Post"
                />
              )}
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
