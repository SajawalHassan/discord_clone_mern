import React, { useRef, useState } from "react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowLeftOutlined from "@mui/icons-material/ArrowLeftOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MicOffOutlined from "@mui/icons-material/MicOffOutlined";
import HeadsetOutlined from "@mui/icons-material/HeadsetOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import UserCard from "../User/UserCard";
import IconWithLabel from "../Utils/IconWithLabel";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import MenuOption from "../Menu/MenuOption";

import { useDispatch, useSelector } from "react-redux";
import { setServerSidebarState } from "../../features/serverSlice";
import { ReactComponent as TextIcon } from "../../images/textIcon.svg";
import { ReactComponent as VoiceIcon } from "../../images/voiceIcon.svg";
import { useParams } from "react-router-dom";

const ServerSidebar = ({ server, categories, channels }) => {
  const [menu, setMenu] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setMenu);

  const { channelId } = useParams();
  const { user } = useSelector((state) => state.user);
  const { serverSidebarIsOpen } = useSelector((state) => state.server);

  const dispatch = useDispatch();

  return (
    <div
      className={
        serverSidebarIsOpen
          ? `fixed inset-0 z-50 w-screen m-auto bg-[#2F3136]`
          : `hidden sm:static sm:w-[20rem] sm:bg-[#2F3136] sm:block sm:flex-[0.85] md:flex-[0.4] lg:flex-[0.3] xl:flex-[0.2] 2xl:flex-[0.15]`
      }
    >
      <div className="relative h-full w-full">
        <div
          className="px-2 py-4 flex items-center justify-between hover:bg-[#3C3F45] transition-colors duration-200 cursor-pointer relative h-14"
          onClick={() => setMenu(!menu)}
        >
          <h1 className="text-white text-xl font-bold">{server?.title}</h1>
          <ArrowDropDownOutlinedIcon className="text-3xl text-white" />
        </div>
        <div
          className={`absolute inset-x-0 z-50 mx-auto top-[4.5rem] flex justify-center ${
            menu ? `scale-100` : `scale-0`
          } transition-all duration-100`}
          ref={wrapperRef}
        >
          <div className="menu mx-auto w-[15em]">
            <MenuOption text="Server Settings" Icon={SettingsOutlined} />
            <MenuOption text="Create Category" Icon={AddCircleIcon} />
            <MenuOption text="Create Channel" Icon={CreateNewFolderIcon} />
          </div>
        </div>

        <div className="mt-5 ml-1">
          {categories?.map((category) => (
            <div key={category._id} className="mb-2">
              <div className="flex items-center justify-between px-2 mb-2">
                <h1 className="font-bold text-sm w-full text-[#5f6066] uppercase hover:text-white cursor-pointer">
                  {">"} {category.title}
                </h1>
                <IconWithLabel
                  Icon={AddOutlinedIcon}
                  labelText="Create Channel"
                />
              </div>
              {channels
                ?.filter((channel) => channel.categoryId === category._id)
                .map((channel) => (
                  <div
                    key={channel._id}
                    className={`flex items-center justify-between ml-4 mr-2 hover:bg-[#42464D] p-2 h-10 rounded-md cursor-pointer group ${
                      channel._id === channelId
                        ? `text-white font-bold bg-[#42464D]`
                        : ` text-[#686a70] hover:text-white hover:font-bold`
                    }`}
                  >
                    <h1 className={`flex items-center  flex-wrap gap-x-2`}>
                      {channel.type === "text" ? <TextIcon /> : <VoiceIcon />}{" "}
                      {channel.title}
                    </h1>

                    {server.ownerId === user?._id && (
                      <SettingsOutlined
                        className={`${
                          channel._id === channelId
                            ? `block p-1 text-3xl rounded-full hover:bg-gray-600`
                            : `hidden`
                        } group-hover:block p-1 text-3xl rounded-full hover:bg-gray-600`}
                      />
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>

        <ArrowLeftOutlined
          onClick={() => dispatch(setServerSidebarState(false))}
          className="text-5xl text-white absolute bottom-20 right-5 cursor-pointer p-2 rounded-full hover:bg-[#3C3F45] transition-colors duration-200"
        />

        <div className="absolute bottom-0 py-2 px-2 bg-[#292B2F] flex items-center justify-between w-full">
          <div className="truncate">
            <UserCard user={user} />
          </div>
          <div className="flex items-center space-x-3">
            <MicOffOutlined className="icon-btn" />
            <HeadsetOutlined className="icon-btn" />
            <SettingsOutlined className="icon-btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerSidebar;
