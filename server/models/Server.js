const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const serverSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    banner: { type: String, default: "" },
    icon: { type: String, default: "" },
    ownerId: { type: String, required: true },
    categories: { type: Array, default: [] },
    channels: { type: Array, default: [] },
    members: { type: Array, default: [] },
    banedUsers: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = model("Servers", serverSchema);
