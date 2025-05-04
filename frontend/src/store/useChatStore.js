import { create } from "zustand";

const useChatStore = create((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({selectedUser: user}),
  socket: null,
  setSocket: (socketInstance) => set({ socket: socketInstance }),
  onlineUsers: null,
  setOnlineUser: (users) => set({onlineUsers: users})
}));

export default useChatStore;
