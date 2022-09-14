import React from "react";
import discordLogo from "../../images/discord_logo.png";

import { useSelector } from "react-redux";

const UserCard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex items-center space-x-3">
      <img
        src={user?.profilePic ? user?.profilePic : discordLogo}
        alt="User Profile Picture"
        className="h-12 w-12 rounded-full bg-gray-600"
      />
      <div>
        <h1 className="font-bold truncate text-white">{user?.username}</h1>
        <p className="truncate text-xs text-[#5b6066]">#{user?.userTag}</p>
      </div>
    </div>
  );
};

export default UserCard;
