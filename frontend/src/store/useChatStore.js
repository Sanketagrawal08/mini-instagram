import { create } from "zustand";
import api from "../api";
import toast from "react-hot-toast";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  isMessagesLoading: false,
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
    set({ selectedUser: user });
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await api.get(`/messages/receive/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await api.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  susbcribeForMessage: async (req, res) => {
    const { selectedUser } = get();
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeForMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));

export default useChatStore;
