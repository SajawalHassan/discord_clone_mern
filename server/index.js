const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const serverRoutes = require("./routes/servers");
const messageRoutes = require("./routes/messages");

require("dotenv").config();

const app = express();

// Starting server
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`server listening on port ${port}`)
);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`Socket.io: User connected: ${socket.id}`);
  io.on("disconnect", () => {
    console.log(`Socket.io: User disconnected: ${socket.id}`);
  });
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("common"));
app.use(helmet());
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/servers", serverRoutes);
app.use("/api/messages", messageRoutes);

// Connecting to mongodb
mongoose.connect(process.env.MONGO_URI, () =>
  console.log("Connected to mongodb")
);
