const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const channelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
    min: 1,
    max: 500,
  },
  categoryId: {
    type: String,
    required: true,
  },
});

module.exports = model("Channels", channelSchema);
