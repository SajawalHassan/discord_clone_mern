const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();

const authRouter = require("./routes/auth");
const serversRouter = require("./routes/servers");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("common"));
app.use(helmet());

// Routes middleware
app.use("/api/auth", authRouter);
app.use("/api/servers", serversRouter);

// Connecting to mongodb
mongoose.connect(process.env.MONGO_URI, () =>
  console.log("Connceted to mongodb!")
);

// Starting our server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
