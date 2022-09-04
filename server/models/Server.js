const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const serverSchema = new Schema(
  {
    banner: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    description: {
      type: String,
      required: true,
      min: 15,
      max: 1000,
    },
    members: {
      type: Array,
      default: [],
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Servers", serverSchema);
