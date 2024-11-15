import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:9000"); // Adjust this URL based on your server configuration

const ScreenShareButton = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [screenStream, setScreenStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  };

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(stream);

      // Set up the WebRTC connection
      const pc = new RTCPeerConnection(configuration);
      setPeerConnection(pc);

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", event.candidate);
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", offer);

      setIsSharing(true);
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  };

  const stopScreenShare = () => {
    screenStream.getTracks().forEach((track) => track.stop());
    if (peerConnection) {
      peerConnection.close();
    }
    setIsSharing(false);
    setScreenStream(null);
    setPeerConnection(null);
    socket.emit("screen-share-stopped");
  };

  // Handle signaling for WebRTC
  socket.on("offer", async (offer) => {
    if (!peerConnection) {
      const pc = new RTCPeerConnection(configuration);
      setPeerConnection(pc);

      pc.ontrack = (event) => {
        // Set the remote stream (shared screen) on a video element
        const remoteVideo = document.getElementById("remoteVideo");
        remoteVideo.srcObject = event.streams[0];
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", event.candidate);
        }
      };

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", answer);
    }
  });

  socket.on("answer", async (answer) => {
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  });

  socket.on("ice-candidate", async (candidate) => {
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  });

  return (
    <div>
      <button
        onClick={isSharing ? stopScreenShare : startScreenShare}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSharing ? "Stop Sharing" : "Share Screen"}
      </button>
      <video id="remoteVideo" autoPlay style={{ width: "100%", marginTop: "10px" }}></video>
    </div>
  );
};

export default ScreenShareButton;
