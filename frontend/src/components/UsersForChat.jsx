import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";

const UsersForChat = () => {
  const { users, isUsersLoading, getUsers, setSelectedUser, selectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return <div className="p-4 text-center">Loading users...</div>;
  }

  if (users.length === 0) {
    return <div className="p-4 text-center">No users found</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-indigo-100 p-4 border-r">
        <h2 className="text-xl text-center font-bold mb-4">Chat Now</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <div
              key={user._id || user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-2 rounded cursor-pointer hover:bg-gray-200 ${
                selectedUser?._id === user._id ? "bg-white font-semibold" : ""
              }`}
            >
              {user.username}
            </div>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1">
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default UsersForChat;
