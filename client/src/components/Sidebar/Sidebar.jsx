import React, { useEffect } from "react";
import SidebarOption from "./SidebarOption";
import discordLogo from "../../images/discord_logo.png";
import Seperator from "../Utils/Seperator";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Loader from "../Utils/Loader";
import CreateServer from "../../modals/CreateServer";
import ServerOption from "./ServerOption";

import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../../features/serverSlice";
import { axiosAuth } from "../../api/axios";
import { Link } from "react-router-dom";
import { setIsLoading, setServers } from "../../features/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { servers, isLoading } = useSelector((state) => state.sidebar);

  useEffect(() => {
    if (servers.length !== 0) return;
    dispatch(setIsLoading(true));
    const getServers = async () => {
      try {
        const { data } = await axiosAuth.get("/servers/get/created");

        dispatch(setServers(data));
      } catch (error) {
        console.log(error);
        dispatch(setIsLoading(false));
      }
    };
    getServers();
  }, [dispatch, servers.length]);

  return (
    <div className="bg-[#202225] w-[6rem] h-screen sticky top-0 left-0 flex flex-col items-center py-5 space-y-2 z-50">
      <CreateServer />
      <SidebarOption
        image={discordLogo}
        text="Direct Messages"
        hoverBg="hover:bg-[#5865F2]"
      />
      <Seperator />
      {isLoading ? (
        <Loader />
      ) : (
        servers?.map(({ icon, title, _id, ownerId, channels }) => (
          <Link to={`/channel/${_id}/${channels[0]}`} key={_id}>
            <ServerOption
              image={icon}
              text={title}
              key={_id}
              ownerId={ownerId}
            />
          </Link>
        ))
      )}
      <SidebarOption
        Icon={AddOutlinedIcon}
        text="Add a Server"
        onClick={() => dispatch(setModalState(true))}
      />
      <SidebarOption Icon={ExploreOutlinedIcon} text="Explore Public Servers" />
      <Seperator />
      <SidebarOption Icon={FileDownloadOutlinedIcon} text="Download Apps" />
    </div>
  );
};

export default Sidebar;
