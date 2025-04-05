import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "https://mini-instagram.onrender.com"; 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const res = await axios.get(`${API_BASE_URL}/users/userProfile`, {
          headers: {
            Authorization: `Bearer ${token}` // Add token to headers
          }
        });
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

 
    return (
      <div className="flex">
        <Sidebar user={user} />
        <div className="flex-1 overflow-auto ml-[20vw]">
          <Outlet context={{ user }} />
        </div>
      </div>
    );
    

};

export default AppLayout;
