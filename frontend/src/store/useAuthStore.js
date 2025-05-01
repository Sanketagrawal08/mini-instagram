import { create } from "zustand";
import api from "../api";
import { toast } from "react-hot-toast";
const useAuthStore = create((set) => ({
  isLogging: false,

  loginUser: async (navigate, email, password) => {
    try {
      const res = await api.post("/users/login", { email, password });
      const { token } = res.data;
      set({ isLogging: true });
      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/profile");
      toast.success("Login Successfull");
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        alert("incorrect password");
      }
      console.log(error.message);
    } finally {
      set({ isLogging: false });
    }
  },

  getFollowers: async (userId) => {
    try{
       const res = await api.get(`/users/${userId}/getfollower`);
       return res.data;
    }catch(err){
        console.log(err)
        toast.error("Error in fetching followers")
    }
  } 
  
}));

export default useAuthStore;
