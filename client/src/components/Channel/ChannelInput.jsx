import React from "react";
import AddCircle from "@mui/icons-material/AddCircle";
import GifBox from "@mui/icons-material/GifBox";
import EmojiEmotionsOutlined from "@mui/icons-material/EmojiEmotionsOutlined";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { axiosAuth } from "../../api/axios";

const ChannelInput = ({ className }) => {
  const [body, setBody] = useState("");

  const { channels } = useSelector((state) => state.channel);
  const { channelId, serverId } = useParams();

  const handleOnClick = async (e) => {
    e.preventDefault();
    if (!body) return;
    try {
      await axiosAuth.post("/messages/create", {
        body,
        serverId,
      });
      setBody("");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form
      onSubmit={(e) => handleOnClick(e)}
      className="flex items-center justify-between bg-[#40444B] w-[95%] inset-x-0 mx-auto px-2 rounded-md"
    >
      <div className="flex items-center space-x-2 flex-grow">
        <AddCircle className="message-form-icon" />
        <input
          type="text"
          className="flex-grow bg-transparent h-10 outline-none text-white font-extralight"
          placeholder={`Message #${channels
            .filter((channel) => channel._id === channelId)
            .map(({ title }) => title)}`}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="ml-2 flex items-center justify-between">
        <GifBox className="message-form-icon" />
        <EmojiEmotionsOutlined className="message-form-icon" />
      </div>
    </form>
  );
};

export default ChannelInput;
