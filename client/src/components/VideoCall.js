import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { config } from '../config/agoraConfig';
import { auth } from '../firebaseConfig';

const VideoCall = ({ channelName, token, isHost, isCameraOn, isMicOn }) => {
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const init = async () => {
      const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      
      try {
        await agoraClient.join(config.appId, channelName, token, auth.currentUser.uid);
        
        if (isHost) {
          const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
          await agoraClient.publish([audioTrack, videoTrack]);
          setLocalAudioTrack(audioTrack);
          setLocalVideoTrack(videoTrack);
        }
        
        setClient(agoraClient);

        agoraClient.on("user-published", async (user, mediaType) => {
          await agoraClient.subscribe(user, mediaType);
          if (mediaType === "video") {
            setRemoteUsers(prev => [...prev, user]);
          }
        });

        agoraClient.on("user-unpublished", (user) => {
          setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
        });
      } catch (error) {
        console.error('Failed to join channel:', error);
      }
    };

    if (token) {
      init();
    }

    return () => {
      client?.leave();
      localVideoTrack?.close();
      localAudioTrack?.close();
    };
  }, [channelName, token, isHost]);

  useEffect(() => {
    if (localVideoTrack) {
      localVideoTrack.setEnabled(isCameraOn);
    }
  }, [isCameraOn]);

  useEffect(() => {
    if (localAudioTrack) {
      localAudioTrack.setEnabled(isMicOn);
    }
  }, [isMicOn]);

  return (
    <div className="video-grid">
      {localVideoTrack && (
        <div className="video-player">
          <div ref={el => localVideoTrack.play(el)} className="video-element"></div>
        </div>
      )}
      {remoteUsers.map(user => (
        <div key={user.uid} className="video-player">
          <div 
            ref={el => user.videoTrack?.play(el)} 
            className="video-element"
          ></div>
        </div>
      ))}
    </div>
  );
};

export default VideoCall;
