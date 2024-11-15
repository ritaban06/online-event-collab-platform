// import React, { useState } from "react";
// import EventForm from "./EventForm";
// import VideoPlayer from "./VideoPlayer";
// import CodingEditor from "./CodingEditor";
// import Navbar from "./Navbar";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [showEventForm, setShowEventForm] = useState(true);
//   const [showCodingEditor, setShowCodingEditor] = useState(false);
//   const [showVideoPlayer, setShowVideoPlayer] = useState(false);

//   const handleShowEvent = () => {
//     setShowEventForm(true);
//     setShowCodingEditor(false);
//     setShowVideoPlayer(false);
//   };

//   const handleShowCoding = () => {
//     setShowEventForm(false);
//     setShowCodingEditor(true);
//     setShowVideoPlayer(false);
//   };

//   const handleShowVideo = () => {
//     setShowEventForm(false);
//     setShowCodingEditor(false);
//     setShowVideoPlayer(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 space-y-12">
//       {/* Navbar Section */}
//       <Navbar 
//         onShowEvent={handleShowEvent}
//         onShowCoding={handleShowCoding}
//         onShowVideo={handleShowVideo}
//       />
      
//       <h1 className="text-4xl font-bold text-center mb-8">Event Dashboard</h1>
//       <div className="max-w-5xl mx-auto space-y-12">
        
//         {/* Event Form Section */}
//         {showEventForm && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Create Your Event</h2>
//             <EventForm />
//             <button 
//               onClick={handleShowCoding}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Next: Show Online Coding
//             </button>
//           </section>
//         )}
        
//         {/* Online Coding Section */}
//         {showCodingEditor && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Online Coding</h2>
//             <CodingEditor />
//             <button 
//               onClick={handleShowVideo}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Next: Show Live Video Session
//             </button>
//           </section>
//         )}
        
//         {/* Live Video Session Section */}
//         {showVideoPlayer && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Live Video Session</h2>
//             <VideoPlayer />
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from "react";
import EventForm from "./EventForm";
import VideoPlayer from "./VideoPlayer";
import CodingEditor from "./CodingEditor";
import Navbar from "./Navbar";
import "./Dashboard.css"; // Import the new CSS file for styling

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
