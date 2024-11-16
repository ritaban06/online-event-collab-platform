import React, { useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { BsChatLeft, BsPeople } from 'react-icons/bs';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [api, setApi] = useState(null);

  const handleJitsiIFrameRef = (iframeRef) => {
    iframeRef.style.height = '100%';
    iframeRef.style.width = '100%';
  };

  const handleApiReady = (apiObj) => {
    setApi(apiObj);
  };

  const toggleChat = () => {
    if (api) {
      if (!showChat) {
        api.executeCommand('toggleChat');
      } else {
        api.executeCommand('toggleChat');
      }
      setShowChat(!showChat);
    }
  };

  const toggleParticipants = () => {
    if (api) {
      if (!showParticipants) {
        api.executeCommand('toggleParticipants');
      } else {
        api.executeCommand('toggleParticipants');
      }
      setShowParticipants(!showParticipants);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 h-full">
      <div className="video-wrapper">
        <div className="video-view">
          <JitsiMeeting
            domain="meet.jit.si"
            roomName="your-event-room-name"
            configOverwrite={{
              startWithAudioMuted: true,
              startWithVideoMuted: false,
              toolbarButtons: [
                'microphone',
                'camera',
                'closedcaptions',
                'desktop',
                'fullscreen',
                'fodeviceselection',
                'hangup',
                'profile',
                'recording',
                'livestreaming',
                'etherpad',
                'settings',
                'raisehand',
                'videoquality',
                'filmstrip',
                'feedback',
                'stats',
                'shortcuts',
                'tileview',
                'select-background',
                'download',
                'help',
                'mute-everyone',
                'security'
              ],
            }}
            interfaceConfigOverwrite={{
              TOOLBAR_BUTTONS: [],
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false,
              SHOW_BRAND_WATERMARK: false,
            }}
            userInfo={{
              displayName: 'Your Name'
            }}
            onApiReady={handleApiReady}
            getIFrameRef={handleJitsiIFrameRef}
          />

          <div className="control-bar">
            <button 
              onClick={toggleParticipants}
              className="p-3 rounded-full bg-gray-600 hover:bg-opacity-80 transition-colors"
            >
              <BsPeople className="text-white text-xl" />
            </button>

            <button 
              onClick={toggleChat}
              className="p-3 rounded-full bg-gray-600 hover:bg-opacity-80 transition-colors"
            >
              <BsChatLeft className="text-white text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
