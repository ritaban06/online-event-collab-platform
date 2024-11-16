import React, { useState } from 'react';
import VideoCall from './VideoCall';
import { useRoom } from '../hooks/useRoom';
import { auth } from '../firebaseConfig';
import { BsChatLeft, BsPeople, BsTelephoneX, BsCameraVideo, BsMic } from 'react-icons/bs';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [inputRoomName, setInputRoomName] = useState('');
  const { roomName, isHost, token, createRoom, joinRoom } = useRoom();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const handleCreateRoom = async () => {
    if (!auth.currentUser) {
      alert('Please login first');
      return;
    }
    if (!inputRoomName.trim()) {
      alert('Please enter a room name');
      return;
    }
    const success = await createRoom(inputRoomName.trim());
    if (!success) {
      alert('Failed to create room. Please try again.');
    }
  };

  const handleJoinRoom = async () => {
    if (!auth.currentUser) {
      alert('Please login first');
      return;
    }
    if (!inputRoomName.trim()) {
      alert('Please enter a room name');
      return;
    }
    const success = await joinRoom(inputRoomName.trim());
    if (!success) {
      alert('Failed to join room. Please check the room name and try again.');
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
            <button onClick={handleCreateRoom} className="create-button">
              Create Room
            </button>
            <button onClick={handleJoinRoom} className="join-button">
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <>
          <VideoCall 
            channelName={roomName}
            token={token}
            isHost={isHost}
            isCameraOn={isCameraOn}
            isMicOn={isMicOn}
          />
          
          <div className="controls-container">
            <button 
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`control-button ${!isCameraOn ? 'off' : ''}`}
            >
              <BsCameraVideo />
            </button>
            
            <button 
              onClick={() => setIsMicOn(!isMicOn)}
              className={`control-button ${!isMicOn ? 'off' : ''}`}
            >
              <BsMic />
            </button>

            <button 
              onClick={() => setShowParticipants(!showParticipants)}
              className="control-button"
            >
              <BsPeople />
            </button>

            <button 
              onClick={() => setShowChat(!showChat)}
              className="control-button"
            >
              <BsChatLeft />
            </button>

            <button 
              onClick={() => window.location.reload()}
              className="control-button end-call"
            >
              <BsTelephoneX />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
