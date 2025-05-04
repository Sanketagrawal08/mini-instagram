import React, { useEffect, useState } from "react";
import api from "../api";
import useChatStore from "../store/useChatStore";
import ShowMessage from "./ShowMessage";

const Message = () => {
  const [allusers, setAllUsers] = useState([]);
  const { selectedUser, setSelectedUser, onlineUsers } = useChatStore();

  useEffect(() => {
    const userHandler = async () => {
      const response = await api.get("/users/getallusers");
      setAllUsers(response.data.users);
    };
    userHandler();
  }, []);

  
  const isOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Sidebar - User List */}
      <div
        style={{ width: "30%", borderRight: "1px solid #ccc", padding: "10px" }}
      >
        <h2>Users</h2>
        {allusers.map((user) => (
          <h3
            key={user._id}
            onClick={() => setSelectedUser(user)}
            style={{
              cursor: "pointer",
              margin: "10px 0",
              color: selectedUser?._id === user._id ? "blue" : "black",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {user.username}
            {isOnline(user._id) && (
              <span style={{ color: "green", fontSize: "12px" }}>● Online</span>
            )}
          </h3>
        ))}
      </div>

      {/* Right Panel - Chat Area */}
      {selectedUser ? (
        <div className="w-[70%] p-[10px]">
          <div
            style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}
          >
            <ShowMessage selectedUser={selectedUser} />
          </div>
          <div className="flex justify-between p-2 bg-gray-200">
            <input type="text" placeholder="Enter your message" />
            <button>Send</button>
          </div>
        </div>
      ) : (
        <h1>No Chat Selected</h1>
      )}
    </div>
  );
};

export default Message;
