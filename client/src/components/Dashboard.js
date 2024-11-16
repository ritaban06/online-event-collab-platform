import React, { useState } from "react";
import EventForm from "./EventForm";
import VideoPlayer from "./VideoPlayer";
import CodingEditor from "./CodingEditor";
import Navbar from "./Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const [showEventForm, setShowEventForm] = useState(true);
  const [showCodingEditor, setShowCodingEditor] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const handleShowEvent = () => {
    setShowEventForm(true);
    setShowCodingEditor(false);
    setShowVideoPlayer(false);
  };

  const handleShowCoding = () => {
    setShowEventForm(false);
    setShowCodingEditor(true);
    setShowVideoPlayer(false);
  };

  const handleShowVideo = () => {
    setShowEventForm(false);
    setShowCodingEditor(false);
    setShowVideoPlayer(true);
  };

  return (
    <div className="dashboard-container">
      <Navbar 
        onShowEvent={handleShowEvent}
        onShowCoding={handleShowCoding}
        onShowVideo={handleShowVideo}
      />
      
      <h1 className="dashboard-title">Event Dashboard</h1>
      <div className="dashboard-content">
        
        {
        showEventForm && 
        (
          <section>
  <h2 className="section-title">Create Your Event</h2>
  <EventForm />
  <div style={{ marginTop: '20px' }}>
    <button 
      onClick={handleShowCoding}
      className="animated-button"
    >
      Next: Show Online Coding
    </button>
  </div>
</section>

        )}
        
        {showCodingEditor && (
          <section>
            <h2 className="section-title">Online Coding</h2>
            <CodingEditor />
            <button 
              onClick={handleShowVideo}
              className="animated-button"
              style={{ marginTop: '40px' }}
            >
              Next: Show Live Video Session
            </button>
          </section>
        )}
        
        {showVideoPlayer && (
          <section>
            <h2 className="section-title">Live Video Session</h2>
            <VideoPlayer />
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
