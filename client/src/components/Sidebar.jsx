import React from "react";
import SidebarOption from "./SidebarOption";
import discordLogo from "../images/discord_logo.png";
import Seperator from "./Seperator";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { useDispatch } from "react-redux";
import { setModalState } from "../features/serverSlice";
import CreateServer from "../models/CreateServer";

const Sidebar = () => {
  const dispatch = useDispatch((state) => state.server);
  return (
    <div className="bg-[#202225] w-[6rem] h-screen sticky top-0 left-0 flex flex-col items-center py-5 space-y-2">
      <CreateServer />
      <SidebarOption
        image={discordLogo}
        text="Direct Messages"
        hoverBg="hover:bg-[#5865F2]"
      />
      <Seperator />
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
