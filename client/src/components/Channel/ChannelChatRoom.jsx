import React from "react";
import ChannelInput from "./ChannelInput";

import { useSelector } from "react-redux";

const ChannelChatRoom = () => {
  const { server } = useSelector((state) => state.channel);

  return (
    <div className="bg-[#36393F] h-full flex flex-col justify-end p-2 overflow-y-scroll">
      <h1 className="text-center text-4xl font-bold text-white mb-3">
        Welcome to <br /> {server.title}
      </h1>
      <ChannelInput />
    </div>
  );
};

export default ChannelChatRoom;
