import React from "react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowLeftOutlined from "@mui/icons-material/ArrowLeftOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MicOffOutlined from "@mui/icons-material/MicOffOutlined";
import HeadsetOutlined from "@mui/icons-material/HeadsetOutlined";
import UserCard from "../User/UserCard";
import IconWithLabel from "../Utils/IconWithLabel";

import { useDispatch, useSelector } from "react-redux";
import { setServerSidebarState } from "../../features/serverSlice";
import { ReactComponent as TextIcon } from "../../images/textIcon.svg";
import { ReactComponent as VoiceIcon } from "../../images/voiceIcon.svg";
import { useParams } from "react-router-dom";

const ServerSidebar = ({ server, categories, channels }) => {
  const { channelId } = useParams();
  const { user } = useSelector((state) => state.user);

  const { serverSidebarIsOpen } = useSelector((state) => state.server);

  const dispatch = useDispatch();

  return (
    serverSidebarIsOpen && (
      <div className="fixed inset-0 m-auto bg-[#2F3136]">
        <div className="px-2 py-4 flex items-center justify-between hover:bg-[#3C3F45] transition-colors duration-200 cursor-pointer">
          <h1 className="text-white text-xl font-bold">{server?.title}</h1>
          <ArrowDropDownOutlinedIcon className="text-3xl text-white" />
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

        <div className="absolute bottom-0 px-4 py-4 bg-[#292B2F] w-full h-16 flex items-center justify-between">
          <UserCard />
          <div className="flex items-center space-x-3">
            <MicOffOutlined className="icon-btn" />
            <HeadsetOutlined className="icon-btn" />
            <SettingsOutlined className="icon-btn" />
          </div>
        </div>
      </div>
    )
  );
};

export default ServerSidebar;
