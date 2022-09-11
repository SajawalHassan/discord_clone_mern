import React, { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";
import discordLogo from "../images/discord_logo.png";
import Seperator from "./Seperator";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { useDispatch } from "react-redux";
import { setModalState } from "../features/serverSlice";
import CreateServer from "../modals/CreateServer";
import { axiosAuth } from "../api/axios";

const Sidebar = () => {
  const [createdServers, setCreatedServers] = useState([]);

  const dispatch = useDispatch((state) => state.server);

  useEffect(() => {
    const getServers = async () => {
      try {
        const { data } = await axiosAuth.get("/servers/get/created");

        setCreatedServers(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getServers();
  }, []);

  return (
    <div className="bg-[#202225] w-[6rem] h-screen sticky top-0 left-0 flex flex-col items-center py-5 space-y-2">
      <CreateServer />
      <SidebarOption
        image={discordLogo}
        text="Direct Messages"
        hoverBg="hover:bg-[#5865F2]"
      />
      <Seperator />
      {createdServers?.map(({ icon, title, _id }) => (
        <SidebarOption image={icon} text={title} key={_id} />
      ))}
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
