import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { config } from '../config/agoraConfig';

export const useRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [token, setToken] = useState(null);

  const generateToken = async (channelName, uid) => {
    try {
      const response = await fetch('YOUR_TOKEN_SERVER_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelName,
          uid,
          role: isHost ? 'publisher' : 'audience'
        })
      });
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error generating token:', error);
      return null;
    }
  };

  const createRoom = async (name) => {
    if (!auth.currentUser) return false;
    
    const token = await generateToken(name, auth.currentUser.uid);
    if (token) {
      setRoomName(name);
      setIsHost(true);
      setToken(token);
      return true;
    }
    return false;
  };

  const joinRoom = async (name) => {
    if (!auth.currentUser) return false;
    
    const token = await generateToken(name, auth.currentUser.uid);
    if (token) {
      setRoomName(name);
      setIsHost(false);
      setToken(token);
      return true;
    }
    return false;
  };

  return {
    roomName,
    isHost,
    token,
    createRoom,
    joinRoom
  };
};