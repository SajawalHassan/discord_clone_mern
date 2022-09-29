import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    joinedServers: { type: Array, default: [] },
    createdServers: { type: Array, default: [] },
    month: { type: String, required: true },
    day: { type: Number, required: true },
    year: { type: Number, required: true },
    profilePic: { type: String, default: "" },
    userTag: { type: String, required: true },
    banner: { type: String, default: "" },
    refreshToken: { type: String, defualt: "" },
  },
  { timestamps: true }
);

export default model("User", userSchema);
