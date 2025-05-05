import React, { useState } from "react";
import axios from "axios";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import api from "../api";


const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/users/register")

      if (response.data.success) {
        navigate("/profile");
      }

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setError("User already exists with this email!");
      } else {
        setError("An unexpected error occurred.");
      }
      console.log(error);
    }

    setUser({ username: "", email: "", password: "", profileImage: "" });
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-b from-[#A1BCB5] via-[#9FBAB3] to-[#745745]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center mb-6  text-pink-700">
            Postify
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={user.username}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
          <p className="text-center text-gray-500 mt-4">
            Already have an account? {"  "}
            <NavLink to="/login" className="text-amber-600 underline p-2">
              Log In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
