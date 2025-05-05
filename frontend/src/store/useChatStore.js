import { create } from "zustand";
import api from "../api";
import toast from "react-hot-toast";

const useChatStore = create((set) => ({
  selectedUser:null,
  users: [],
  isUsersLoading: false,
  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await api.get("/users/getallusers", {
        withCredentials: true,
      });
      set({ users: res.data.users || [] });  
    } catch (error) {
      toast.error("Error in Loading Users");
      set({ users: [] });  
    } finally {
      set({ isUsersLoading: false });
    }
  },
  setSelectedUser: async (user) => {
    set({selectedUser: user})
  }
}));

export default useChatStore;