const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("common"));
app.use(helmet());

// Routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Connecting to mongodb
mongoose.connect(process.env.MONGO_URI, () =>
  console.log("Connected to mongodb")
);

// Starting server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));
