const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  createdServers: {
    type: Array,
    default: [],
  },
  joinedServer: {
    type: Array,
    default: [],
  },
});

module.exports = model("Users", userSchema);
