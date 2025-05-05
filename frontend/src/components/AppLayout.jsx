import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import api from "../api"
import useAuthStore from "../store/useAuthStore";

const AppLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setUser: setUserInStore } = useAuthStore()
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await api.get("/users/userProfile")
        setUser(res.data);
        setUserInStore(res.data);
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
