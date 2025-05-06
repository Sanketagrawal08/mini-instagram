import { create } from "zustand";
import api from "../api";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
const useAuthStore = create((set, get) => ({
  socket: null,
  user: null,
  isLogging: false,
  onlineUsers: [],
  setUser: (user) => set({ user }),
  loginUser: async (navigate, email, password) => {
    try {
      const res = await api.post("/users/login", { email, password });
      const { token, user } = res.data; // assuming you're sending user object in response
      set({ isLogging: true });
  
      if (token) {
        localStorage.setItem("token", token);
        set({ user }); // ✅ SET USER HERE BEFORE CONNECTING SOCKET
        get().connectSocket();
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
  
  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;
    const socket = io("http://localhost:3000", {
      query: {
        userId: user._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
}));
export default useAuthStore;
