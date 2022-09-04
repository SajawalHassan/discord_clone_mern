const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const refreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = model("RefreshTokens", refreshTokenSchema);
