import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Monitor, X } from 'lucide-react';
import './VideoPlayer.css';

function VideoPlayer({ onClose }) {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState(null);
  
  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const streamRef = useRef(null);
  const screenStreamRef = useRef(null);

  const clearError = () => setError(null);

  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const toggleVideo = async () => {
    try {
      if (isVideoOn) {
        stopMediaTracks();
        setIsVideoOn(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: isAudioOn 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsVideoOn(true);
      }
    } catch (err) {
      setError('Failed to access camera');
      console.error('Error accessing camera:', err);
    }
  };

  const toggleAudio = async () => {
    try {
      if (isAudioOn) {
        if (streamRef.current) {
          streamRef.current.getAudioTracks().forEach(track => track.stop());
        }
        setIsAudioOn(false);
        return;
      }

      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (streamRef.current) {
        const videoTrack = streamRef.current.getVideoTracks()[0];
        if (videoTrack) {
          streamRef.current.addTrack(audioStream.getAudioTracks()[0]);
        } else {
          streamRef.current = audioStream;
        }
      } else {
        streamRef.current = audioStream;
      }
      setIsAudioOn(true);
    } catch (err) {
      setError('Failed to access microphone');
      console.error('Error accessing microphone:', err);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        if (screenStreamRef.current) {
          screenStreamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsScreenSharing(false);
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (screenRef.current) {
        screenRef.current.srcObject = stream;
        screenStreamRef.current = stream;
        setIsScreenSharing(true);

        // Handle when user stops sharing via browser controls
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
        };
      }
    } catch (err) {
      setError('Failed to share screen');
      console.error('Error sharing screen:', err);
    }
  };

  useEffect(() => {
    return () => {
      stopMediaTracks();
    };
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(clearError, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className="video-player-container">
      <div className="video-grid">
        {isVideoOn && (
          <div className="video-wrapper">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={!isAudioOn}
              className="video-element"
            />
          </div>
        )}
        
        {isScreenSharing && (
          <div className="video-wrapper screen-share">
            <video
              ref={screenRef}
              autoPlay
              playsInline
              className="video-element"
            />
          </div>
        )}
      </div>

      <div className="controls-container">
        <button
          onClick={toggleAudio}
          className={`control-button ${isAudioOn ? 'active' : ''}`}
        >
          {isAudioOn ? <Mic className="control-icon" /> : <MicOff className="control-icon" />}
        </button>

        <button
          onClick={toggleVideo}
          className={`control-button ${isVideoOn ? 'active' : ''}`}
        >
          {isVideoOn ? <Video className="control-icon" /> : <VideoOff className="control-icon" />}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`control-button ${isScreenSharing ? 'active' : ''}`}
        >
          <Monitor className="control-icon" />
        </button>

        <button onClick={onClose} className="control-button close">
          <X className="control-icon" />
        </button>
      </div>

      {error && (
        <div className="error-toast animate-slide-up">
          {error}
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;