import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import useChatStore from "../store/useChatStore";
import NoChatSelected from "./NoChatSelected";
import useAuthStore from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    isMessagesLoading,
    getMessages,
    sendMessage,
    susbcribeForMessage,
    unsubscribeForMessages,
  } = useChatStore();

  const [text, setText] = useState("");
  const { user } = useAuthStore();
  const messageEndRef = useRef(null);

  // 🧠 If no user selected
  if (!selectedUser) return <NoChatSelected />;

  // 📥 Get and subscribe to messages
  useEffect(() => {
    getMessages(selectedUser._id);
    susbcribeForMessage();

    return () => unsubscribeForMessages();
  }, [selectedUser._id]);

  //  Scroll to latest message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 📤 Send message handler
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({
        text,
        recieverId: selectedUser._id,
      });
      setText("");
    } catch (err) {
      console.log("Error in sending message", err);
    }
  };

  // 🕓 Loading state
  if (isMessagesLoading) {
    return (
      <div className="flex justify-center items-center w-[55vw] h-full">
        Messages Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => {
          const isSenderMe = message.senderId === user._id;
          return (
            <div
              key={message._id}
              className={`chat ${isSenderMe ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-bubble">{message.text}</div>
            </div>
          );
        })}

        {/* ✅ Scroll to this div */}
        <div ref={messageEndRef} />
      </div>

      <form
        className="sticky bottom-0 bg-white p-4 border-t flex items-center gap-2"
        onSubmit={sendMessageHandler}
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button

          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
