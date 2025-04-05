import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import api from "../api";

const UserPosts = () => {
  const [userPostData, setUserPostData] = useState([]);

  const { user } = useOutletContext();

  const fetchUserPosts = async () => {
    try {
      const response = await api(`/posts/${user._id}`);
      setUserPostData(response.data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Posts</h1>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        {userPostData.length > 0 ? (
          userPostData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300 w-72 flex flex-col"
            >
              <img
                className="w-full h-60 object-cover rounded-lg"
                src={item.media}
                alt="Post"
              />
              <h3 className="text-lg font-semibold mt-3 text-gray-700 pl-">
                {item.caption}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
