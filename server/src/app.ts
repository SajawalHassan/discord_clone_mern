import express, { Response, NextFunction, Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import verifyJwt from "./middleware/verifyJwt";
import protectedRoutes from "./routes/protected";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users";

import { Server } from "socket.io";
import { createServer } from "http";
import { RouteReq } from "./utils/interfaces";

import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const server: any = createServer(app);
const PORT: any = process.env.PORT || 5000;
const MONGO_URI: any = process.env.MONGO_URI;
const origin: string =
  process.env.NODE_ENV === "production"
    ? "https://discord-clone-1f12.vercel.app"
    : "http://localhost:3000";

// Socket.io
const io = new Server(server, {
  cors: {
    origin,
    credentials: true,
  },
});

io.on("connection", (socket: any) => {
  console.log(`Socket.io: User connected [${socket.id}]`);

  io.on("disconnection", () => {
    console.log(`Socket.io: User disconnected [${socket.id}]`);
  });
});

// Middleware
app.use(cors({ origin, credentials: true }));
app.set("Access-Control-Allow-Origin", origin);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use((req: RouteReq, _res: Response, next: NextFunction) => {
  req.io = io;
  next();
});

// Routes middleware
app.use("/api/auth", authRoutes);
app.use(verifyJwt);
app.use("/api/protected", protectedRoutes);
app.use("/api/users", usersRoutes);

// MongoDB
mongoose.connect(MONGO_URI, () => console.log("Connected to mongodb!"));

// Starting server
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
