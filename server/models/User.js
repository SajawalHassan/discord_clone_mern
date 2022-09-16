const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    joinedServers: { type: Array, default: [] },
    createdServers: { type: Array, default: [] },
    month: { type: String, required: true },
    day: { type: Number, required: true },
    year: { type: String, required: true },
    profilePic: { type: String, default: "" },
    userTag: { type: String, required: true },
    banner: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = model("Users", userSchema);
