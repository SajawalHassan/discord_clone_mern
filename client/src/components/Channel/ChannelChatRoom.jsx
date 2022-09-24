import React, { useRef, useState } from "react";
import ChannelInput from "./ChannelInput";
import io from "socket.io-client";

import { useEffect } from "react";
import { axiosAuth } from "../../api/axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChannelMessage from "./ChannelMessage";

const ChannelChatRoom = () => {
  const [messages, setMessages] = useState([]);

  const { serverId } = useParams();
  const { server } = useSelector((state) => state.channel);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axiosAuth.get(`/messages/get/all/${serverId}`);

        setMessages(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getMessages();
  }, [serverId]);

  useEffect(() => {
    const socket = io("ws://localhost:5000");

    socket.on("message_created", (data) => {
      setMessages([...messages, data]);
    });

    messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  return (
    <div className="bg-[#36393F] h-full p-2 overflow-scroll flex flex-col">
      <div className="mb-12">
        <h1 className="text-center text-4xl font-bold text-white">
          Welcome to <br /> {server.title}
        </h1>
        {messages.map((message) => (
          <ChannelMessage message={message} key={message._id} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-[#36393F] absolute bottom-0 py-3 inset-x-0">
        <ChannelInput />
      </div>
    </div>
  );
};

export default ChannelChatRoom;
