const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const serverRoutes = require("./routes/servers");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("common"));
app.use(helmet());

// Routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/servers", serverRoutes);

// Connecting to mongodb
mongoose.connect(process.env.MONGO_URI, () =>
  console.log("Connected to mongodb")
);

// Starting server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));
