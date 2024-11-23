import React, { useState } from "react";
import SessionItem from "./SessionItem";

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [isAddingSession, setIsAddingSession] = useState(false);

  const addSession = () => {
    setIsAddingSession(true);
    setSessions([...sessions, { id: sessions.length, title: "", time: "" }]);
  };

  const handleSessionChange = (index, updatedSession) => {
    setSessions(sessions.map((session, i) => (i === index ? updatedSession : session)));
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-lg mb-2">Event Sessions</h3>
      {sessions.map((session, index) => (
        <SessionItem
          key={index}
          session={session}
          onChange={(updatedSession) => handleSessionChange(index, updatedSession)}
        />
      ))}
      {isAddingSession ? (
        <SessionItem
          key={sessions.length}
          session={{ id: sessions.length, title: "", time: "" }}
          onChange={(updatedSession) => handleSessionChange(sessions.length, updatedSession)}
        />
      ) : (
        <button onClick={addSession} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
          Add Session
        </button>
      )}
    </div>
  );
};

export default SessionList;
