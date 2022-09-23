import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import ChannelHeader from "../components/Channel/ChannelHeader";
import ChannelChatRoom from "../components/Channel/ChannelChatRoom";
import ChannelSidebar from "../components/Channel/ChannelSidebar";
import Sidebar from "../components/Sidebar/Sidebar";
import Loader from "../components/Utils/Loader";

import { useDispatch, useSelector } from "react-redux";
import { channelSuccess, setIsLoading } from "../features/channelSlice";

const Server = () => {
  const { channels, server, isLoading } = useSelector((state) => state.channel);
  const { serverId, channelId } = useParams();

  const dispatch = useDispatch();

  const channelTitle = channels
    ?.filter((channel) => channel._id === channelId)
    .map(({ title }) => {
      return title;
    });

  useEffect(() => {
    dispatch(setIsLoading(true));
    const getServer = async () => {
      try {
        const { data } = await axiosAuth.get(`/servers/get/${serverId}`);
        const { server, categories, channels } = data;

        dispatch(channelSuccess({ server, categories, channels }));
      } catch (error) {
        setIsLoading(false);
      }
    };

    getServer();
  }, [serverId, dispatch]);

  useEffect(() => {
    if (channels && server.title) {
      document.title = `Discord | #${channelTitle} | ${server?.title}`;
    }
  }, [channelId, channels, server.title, channelTitle]);

  if (isLoading) {
    return (
      <div className="bg-zinc-800 fixed inset-0 z-50 grid place-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <div className="w-full flex">
        <div className="h-full">
          <ChannelSidebar />
        </div>
        <div className="w-full h-full flex flex-col">
          <ChannelHeader />
          <ChannelChatRoom />
        </div>
      </div>
    </div>
  );
};

export default Server;
