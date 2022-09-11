const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const channelSchema = new Schema({
  title: { type: String, required: true },
  categoryId: { type: String, required: true },
});

module.exports = model("Channels", channelSchema);
