import React, { useState } from "react";
import axios from "axios";
const PostModal = ({ isOpen, setIsOpen }) => {
  const [details, setDetails] = useState({
    media: "",
    caption: "",
  });

  const detailsHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setDetails({media:"",caption:""})

    try {
      const response = await axios.post(
        "http://localhost:3000/posts/create",
        details,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return ( 
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-xl"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-2xl w-96 relative shadow-lg transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
        >
          <i className="ri-close-line"></i>
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">Create Post</h2>

        <form onSubmit={submitHandler} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter image URL"
            name="media"
            value={details.media}
            onChange={detailsHandler}
            required
            className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Enter caption"
            name="caption"
            value={details.caption}
            onChange={detailsHandler}
            required
            className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;