import React, { useState } from "react";
import axios from "axios";
import { data, NavLink, useNavigate } from "react-router-dom";
import api from "../api";
import Loader from "./Loader";
import toast from 'react-hot-toast';
import useAuthStore from "../store/useAuthStore";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const {loginUser} = useAuthStore();
  
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }; 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(navigate,user.email,user.password);
  };


  return (
    <div className="flex w-full items-center justify-center h-screen bg-gradient-to-b from-[#A1BCB5] via-[#9FBAB3] to-[#745745]">
      
        <div className=" bg-white p-8 rounded-lg shadow-md w-86">
          <h1 className="text-3xl font-bold text-center mb-10 border-b-2 pb-4 border-gray-400">
            Postify
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <NavLink to="/" className="text-blue-500 hover:underline">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
  
  );
};
export default Login;
