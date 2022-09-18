import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import ChannelHeader from "../components/Channel/ChannelHeader";
import ChannelSidebar from "../components/Channel/ChannelSidebar";
import Sidebar from "../components/Sidebar/Sidebar";
import Loader from "../components/Utils/Loader";

const Server = () => {
  const [server, setServer] = useState({});
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { serverId } = useParams();

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

  if (isLoading) {
    return (
      <div className="bg-zinc-800 h-screen w-screen grid place-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex">
        <ChannelSidebar
          server={server}
          categories={categories}
          channels={channels}
          isLoading={isLoading}
        />
        <ChannelHeader
          server={server}
          categories={categories}
          channels={channels}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Server;
