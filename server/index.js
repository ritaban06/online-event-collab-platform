const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Configure CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://ba3d-136-232-88-2.ngrok-free.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow non-browser requests
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy violation"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
});

// In-memory store for room data (could be replaced with a database)
const rooms = {};

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle room creation
  socket.on("createRoom", (roomName) => {
    if (rooms[roomName]) {
      socket.emit("error", "Room already exists.");
      return;
    }
    rooms[roomName] = { members: [] };
    socket.join(roomName);
    rooms[roomName].members.push(socket.id);
    io.to(roomName).emit("roomCreated", roomName);
    console.log(`Room created: ${roomName}`);
  });

  // Handle joining an existing room
  socket.on("joinRoom", (roomName) => {
    if (!rooms[roomName]) {
      socket.emit("error", "Room does not exist.");
      return;
    }
    socket.join(roomName);
    rooms[roomName].members.push(socket.id);
    io.to(roomName).emit("userJoined", { userId: socket.id, roomName });
    console.log(`User ${socket.id} joined room: ${roomName}`);
  });

  // Handle collaborative code updates
  socket.on("code-change", (data) => {
    if (data.roomName) {
      socket.to(data.roomName).emit("code-update", data.code);
      console.log(`Code updated in room ${data.roomName}:`, data.code);
    } else {
      socket.emit("error", "Room name is required for code updates.");
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    // Remove user from rooms
    for (const roomName in rooms) {
      rooms[roomName].members = rooms[roomName].members.filter(
        (id) => id !== socket.id
      );
      if (rooms[roomName].members.length === 0) {
        delete rooms[roomName]; // Clean up empty rooms
        console.log(`Room deleted: ${roomName}`);
      }
    }
  });
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
