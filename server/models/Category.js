const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  serverId: {
    type: String,
    default: "",
  },
});

module.exports = model("Categories", categorySchema);
