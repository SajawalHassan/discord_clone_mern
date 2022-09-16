import React, { useRef, useState } from "react";
import discordLogo from "../../images/discord_logo.png";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import { useSelector } from "react-redux";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const UserCard = ({ user }) => {
  const [userMenu, setUserMenu] = useState(false);
  const [usernameCopied, setUsernameCopied] = useState(
    "Click to copy username"
  );

  const currentUser = useSelector((state) => state.user);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setUserMenu);

  const handleCopyText = () => {
    navigator.clipboard.writeText(`${user?.username}#${user?.userTag}`);
    setUsernameCopied("Copied!");
  };

  return (
    <div>
      {userMenu && (
        <div
          className="bg-[#18191C] left-0 absolute bottom-20 pb-2 inset-x-0 mx-auto w-[94%]"
          ref={wrapperRef}
        >
          {user?.banner ? (
            <div className="relative">
              <img
                src={user?.banner}
                alt="User banner"
                className="w-full h-20"
              />
              {user?._id === currentUser?.user._id && (
                <EditOutlinedIcon className="p-1.5 cursor-pointer hover:bg-gray-500 rounded-full bg-gray-400 text-3xl absolute top-2 right-2" />
              )}
            </div>
          ) : (
            <div className="relative bg-gray-300 w-full h-20">
              {user?._id === currentUser?.user._id && (
                <EditOutlinedIcon className="p-1.5 cursor-pointer hover:bg-gray-500 rounded-full bg-gray-400 text-3xl absolute top-2 right-2" />
              )}
            </div>
          )}
          <div className="relative h-24 w-24 -mt-10 ml-3 group rounded-full border-4 border-[#18191C]">
            <p className="opacity-0 group-hover:opacity-100 font-bold text-white uppercase text-[11.5px] absolute inset-0 bg-gray-900 rounded-full flex items-center justify-center bg-opacity-50 cursor-pointer transition-all duration-200">
              View profile
            </p>
            <img
              src={user?.profilePic ? user?.profilePic : discordLogo}
              alt="User Profile"
              className="h-full w-full rounded-full bg-gray-600 cursor-pointer transition-colors duration-300"
            />
          </div>
          <div className="mt-5 ml-3">
            <div
              className="flex items-center justify-between group h-10 relative cursor-pointer"
              onClick={() => handleCopyText()}
            >
              <h1 className="flex items-center text-2xl font-bold text-white">
                {user?.username}
                <span className="text-zinc-400">#{user?.userTag}</span>
              </h1>
              <ContentCopyOutlinedIcon className="hidden group-hover:block transition-colors duration-300 text-white p-2 text-4xl rounded-full hover:bg-zinc-800 cursor-pointer mr-1" />
              <p className="group-hover:opacity-100 opacity-0 absolute transition-all duration-[0ms] group-hover:delay-1000 group-hover:duration-75 -top-7 p-1 text-white bg-zinc-800 inset-x-0 mx-auto w-max cursor-pointer">
                {usernameCopied}
              </p>
            </div>
          </div>
        </div>
      )}
      <div
        className="flex items-center space-x-3 cursor-pointer hover:bg-zinc-700 p-1 px-2 rounded-md"
        onClick={() => setUserMenu(!userMenu)}
      >
        <img
          src={user?.profilePic ? user?.profilePic : discordLogo}
          alt="User Profile"
          className="h-10 w-10 rounded-full bg-gray-600"
        />
        <div>
          <h1 className="font-bold truncate text-white text-sm">
            {user?.username}
          </h1>
          <p className="truncate text-xs text-[#80858b]">#{user?.userTag}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
