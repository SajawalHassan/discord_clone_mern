const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    joinedServers: Array,
    createdServers: Array,
    month: String,
    day: Number,
    year: String,
    profilePic: String,
  },
  { timestamps: true, typeKey: "$type" }
);

module.exports = model("Users", userSchema);
