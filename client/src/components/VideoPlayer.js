import React, { useState } from 'react';
import VideoCall from './VideoCall';
import { BsChatLeft, BsPeople, BsTelephoneX } from 'react-icons/bs';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [isInCall, setIsInCall] = useState(false);

  const startCall = (roomName) => {
    setChannelName(roomName);
    setIsInCall(true);
  };

  return (
    <div className="video-container">
      {!isInCall ? (
        <div className="join-call-container">
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Enter room name"
            className="room-input"
          />
          <button 
            onClick={() => startCall(channelName)}
            className="join-button"
          >
            Join Room
          </button>
        </div>
      ) : (
        <VideoCall 
          channelName={channelName}
          isHost={true}
        />
      )}
      
      {/* Your existing control buttons */}
      <div className="control-bar">
        <button onClick={() => setShowParticipants(!showParticipants)}>
          <BsPeople />
        </button>
        <button onClick={() => setShowChat(!showChat)}>
          <BsChatLeft />
        </button>
        <button onClick={() => setIsInCall(false)}>
          <BsTelephoneX />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
