import React from "react";

const ChatWindow = () => {
  return (
    <div className="absolute top-4 right-4 w-1/3 bg-white rounded shadow-lg p-4 h-80 overflow-y-auto">
      <h4 className="font-semibold mb-2">Live Chat</h4>
      <div className="space-y-2">
        {/* Messages go here */}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full mt-2 px-3 py-1 border rounded-md focus:outline-none"
      />
    </div>
  );
};

export default ChatWindow;
