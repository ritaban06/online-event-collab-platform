import React from "react";
import ChatWindow from "./ChatWindow";
import ScreenShareButton from "./ScreenShareButton";
import FileUpload from "./FileUpload";

const VideoPlayer = () => {
  return (
    <div className="bg-black w-full h-96 relative">
      {/* Placeholder for video content */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute bottom-4 left-4 flex space-x-4">
        <ScreenShareButton />
        <FileUpload />
      </div>
      <ChatWindow />
    </div>
  );
};

export default VideoPlayer;
