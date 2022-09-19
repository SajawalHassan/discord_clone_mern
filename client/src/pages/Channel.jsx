import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import ChannelHeader from "../components/Channel/ChannelHeader";
import ChannelMessage from "../components/Channel/ChannelMessage";
import ChannelSidebar from "../components/Channel/ChannelSidebar";
import Sidebar from "../components/Sidebar/Sidebar";
import Loader from "../components/Utils/Loader";

const Server = () => {
  const [server, setServer] = useState({});
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { serverId, channelId } = useParams();

  const channelTitle = channels
    ?.filter((channel) => channel._id === channelId)
    .map(({ title }) => {
      return title;
    });

  useEffect(() => {
    setIsLoading(true);
    const getServer = async () => {
      try {
        const { data } = await axiosAuth.get(`/servers/get/${serverId}`);

        setServer(data.server);
        setCategories(data.categories);
        setChannels(data.channels);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getServer();
  }, [serverId]);

  useEffect(() => {
    document.title = `Discord | #${channelTitle} | ${server.title}`;
  }, [channelId, channels, server.title, channelTitle]);

  if (isLoading) {
    return (
      <div className="bg-zinc-800 fixed inset-0 z-50 grid place-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen flex">
        <div className="h-full">
          <ChannelSidebar
            server={server}
            categories={categories}
            channels={channels}
            isLoading={isLoading}
          />
        </div>
        <div className="w-full h-full flex flex-col">
          <ChannelHeader
            server={server}
            categories={categories}
            channels={channels}
            isLoading={isLoading}
          />
          <ChannelMessage
            server={server}
            categories={categories}
            channels={channels}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Server;
