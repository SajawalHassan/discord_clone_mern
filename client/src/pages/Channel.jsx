import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import ServerHeader from "../components/Channel/ServerHeader";
import ServerSidebar from "../components/Channel/ServerSidebar";
import Sidebar from "../components/Sidebar/Sidebar";

const Server = () => {
  const [server, setServer] = useState({});
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState({});

  const { serverId } = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getServer = async () => {
      try {
        const { data } = await axiosAuth.get(`/servers/get/${serverId}`, {
          signal: controller.signal,
        });

        isMounted && setServer(data.server);
        isMounted && setCategories(data.categories);
        isMounted && setChannels(data.channels);
      } catch (error) {}
    };

    getServer();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [serverId]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <ServerHeader
          server={server}
          categories={categories}
          channels={channels}
        />
        <ServerSidebar
          server={server}
          categories={categories}
          channels={channels}
        />
      </div>
    </div>
  );
};

export default Server;
