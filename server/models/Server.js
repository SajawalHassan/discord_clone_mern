const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const serverSchema = new Schema(
  {
    title: String,
    banner: String,
    icon: String,
    ownerId: String,
    categories: Array,
    channels: Array,
    members: Array,
    banedUsers: Array,
    description: Array,
  },
  { timestamps: true, typeKey: "$type" }
);

module.exports = model("Servers", serverSchemas);
