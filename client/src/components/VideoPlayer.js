import React, { useState, useEffect } from 'react';
import VideoCall from './VideoCall';
import { useRoom } from '../hooks/useRoom';
import { auth } from '../firebaseConfig';
import { BsChatLeft, BsPeople, BsTelephoneX } from 'react-icons/bs';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [inputRoomName, setInputRoomName] = useState('');
  const { roomName, isHost, token, createRoom, joinRoom } = useRoom();

  const handleCreateRoom = async () => {
    if (!auth.currentUser) {
      alert('Please login first');
      return;
    }
    const success = await createRoom(inputRoomName);
    if (!success) {
      alert('Failed to create room');
    }
  };

  const handleJoinRoom = async () => {
    if (!auth.currentUser) {
      alert('Please login first');
      return;
    }
    const success = await joinRoom(inputRoomName);
    if (!success) {
      alert('Failed to join room');
    }
  };

  return (
    <div className="video-container">
      {!roomName ? (
        <div className="join-call-container">
          <input
            type="text"
            value={inputRoomName}
            onChange={(e) => setInputRoomName(e.target.value)}
            placeholder="Enter room name"
            className="room-input"
          />
          <div className="button-group">
            <button 
              onClick={handleCreateRoom}
              className="create-button"
            >
              Create Room
            </button>
            <button 
              onClick={handleJoinRoom}
              className="join-button"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <VideoCall 
          channelName={roomName}
          token={token}
          isHost={isHost}
        />
      )}
      
      <div className="control-bar">
        <button onClick={() => setShowParticipants(!showParticipants)}>
          <BsPeople />
        </button>
        <button onClick={() => setShowChat(!showChat)}>
          <BsChatLeft />
        </button>
        <button onClick={() => window.location.reload()}>
          <BsTelephoneX />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
