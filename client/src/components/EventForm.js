// import React, { useState } from "react";
// import InputField from "./InputField";
// import DatePicker from "./DatePicker";
// import SessionList from "./SessionList";

// const EventForm = () => {
//   const [eventDetails, setEventDetails] = useState({
//     title: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Create Event</h2>
//       <InputField label="Event Title" name="title" value={eventDetails.title} onChange={handleChange} />
//       <InputField label="Description" name="description" value={eventDetails.description} onChange={handleChange} />
//       <DatePicker label="Start Date" name="startDate" value={eventDetails.startDate} onChange={handleChange} />
//       <DatePicker label="End Date" name="endDate" value={eventDetails.endDate} onChange={handleChange} />
//       <SessionList />
//       <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Create Event</button>
//     </div>
//   );
// };

// export default EventForm;






import React, { useState } from "react";
import io from "socket.io-client";
import InputField from "./InputField";
import DatePicker from "./DatePicker";
import SessionList from "./SessionList";

const socket = io("http://localhost:9000"); // Ensure this matches your server URL

const EventForm = () => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [room, setRoom] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const createRoom = () => {
    const roomName = eventDetails.title.trim().replace(/\s+/g, "-").toLowerCase();
    socket.emit("createRoom", roomName);
    setRoom(roomName);
  };

  // Listen for confirmation that room was created
  socket.on("roomCreated", (roomName) => {
    alert(`Room '${roomName}' created successfully! Other users can join.`);
  });

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <InputField label="Event Title" name="title" value={eventDetails.title} onChange={handleChange} />
      <InputField label="Description" name="description" value={eventDetails.description} onChange={handleChange} />
      <DatePicker label="Start Date" name="startDate" value={eventDetails.startDate} onChange={handleChange} />
      <DatePicker label="End Date" name="endDate" value={eventDetails.endDate} onChange={handleChange} />
      <SessionList />
      <button onClick={createRoom} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Create Event
      </button>

      {room && <p className="mt-4 text-green-600">Room created: {room}</p>}
    </div>
  );
};

export default EventForm;
