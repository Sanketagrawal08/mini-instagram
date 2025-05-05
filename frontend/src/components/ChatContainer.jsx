import React from 'react';
import ChatHeader from './ChatHeader';
import useChatStore from '../store/useChatStore';
import NoChatSelected from './NoChatSelected';

const ChatContainer = () => {
  const { selectedUser } = useChatStore();

  if (!selectedUser) {
    return <NoChatSelected />;
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Header */}
      <ChatHeader />

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {/* Example Messages */}
        <div className="bg-indigo-100 p-2 rounded max-w-[70%] self-start">
          This is   message from user.
        </div>
      </div>

      {/* Fixed Input Section */}
      <div className="sticky bottom-0 bg-white p-4 border-t flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
