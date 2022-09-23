const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = Schema(
  {
    body: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    serverId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
