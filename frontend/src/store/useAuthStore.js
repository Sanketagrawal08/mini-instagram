import { create } from "zustand";
import api from "../api";
import { toast } from "react-hot-toast";
const useAuthStore = create((set) => ({
  isLogging: false,
  followers: [],
  following: [],
  followerCount: 0,
  followingCount: 0,
  loginUser: async (navigate, email, password) => {
    try {
      const res = await api.post("/users/login", { email, password });
      const { token } = res.data;
      set({ isLogging: true });
      if (token) {
        localStorage.setItem("token", token);
      }
      const userId = res.data.isExist._id;
      await useAuthStore.getState().fetchUserStats(userId);
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
       set({followersData: res.data});
       return res.data;
    }catch(err){
        console.log(err)
        toast.error("Error in fetching followers")
    }
  },
  getFollowing: async (userId) => {
    try{
      const res = await api.get(`/users/${userId}/getfollowing`);
      return res.data
    }catch(err){
      console.log(err)
      toast.error("Something went wrong")
    }
  },
  fetchUserStats: async (userId) => {
    try {
      const followerData = await useAuthStore.getState().getFollowers(userId);
      const followingData = await useAuthStore.getState().getFollowing(userId);
      
      set({
        followers: followerData.followers,
        followerCount: followerData.followerCount,
        following: followingData.following,
        followingCount: followingData.followingCount,
      });
    } catch (err) {
      console.error("Failed to fetch user stats", err);
      toast.error("Something went wrong while fetching stats");
    }
  },
}));

export default useAuthStore;
