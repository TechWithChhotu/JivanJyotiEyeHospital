import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.config.js";
import patientRoutes from "./routes/patient.routes.js";
import queueRoutes from "./routes/queue.routes.js";

// .env फाइल लोड करें
dotenv.config();

// डेटाबेस कनेक्शन चालू करें
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io इनिशियलाइजेशन
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
// Socket.io कनेक्शन रूम्स मैनेजमेंट
io.on("connection", (socket) => {
  console.log(`🔌 User Connected: ${socket.id}`);

  socket.on("join_doctor_room", (doctorName) => {
    socket.join(doctorName);
    console.log(`👥 Patient joined room: ${doctorName}`);
  });

  socket.on("disconnect", () => {
    console.log("🔌 User Disconnected");
  });
});

// 'io' को एक्सप्रेस ऐप पर सेट करें ताकि राउट्स में इसका उपयोग हो सके
app.set("socketio", io);

// API रूट्स मैपिंग
app.use("/api/patients", patientRoutes);
app.use("/api/queue", queueRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`⚙️ Server running in ES Module on port ${PORT}`),
);
