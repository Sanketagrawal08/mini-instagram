import { create } from "zustand";
import api from "../api";
import toast from "react-hot-toast";

const useChatStore = create((set) => ({
  user: [],
  isUsersLoading:false,
  getUsers: async () => {
    try {
      set({isUsersLoading:true})
      const res = await api.get("/users/getallusers", {
        withCredentials: true,
      });
      set({ users: res.data });
    } catch (error) {
      toast.error("Error in Loading Users");
    } finally{
      set({isUsersLoading:false})
    }
  },
}));

export default useChatStore;