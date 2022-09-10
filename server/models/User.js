const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    joinedServers: {
      type: String,
      default: [],
    },
    createdServers: {
      type: String,
      default: [],
    },
    month: String,
    day: Number,
    year: String,
  },
  { timestamps: true, typeKey: "$type" }
);

module.exports = model("Users", userSchema);
