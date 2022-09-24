import React, { useState } from "react";
import UserCard from "../User/UserCard";
import discordLogo from "../../images/discord_logo.png";

const ChannelMessage = ({ message }) => {
  const [userMenu, setUserMenu] = useState(false);

  const { owner: user, body } = message;
  let { createdAt } = message;

  createdAt = new Date().toLocaleDateString("en-US");

  return (
    <div className="flex items-center space-x-2 py-2 relative">
      <img
        src={user?.profilePic ? user?.profilePic : discordLogo}
        alt="User Profile"
        className="h-8 w-8 rounded-full bg-[#747C8C] cursor-pointer transition-colors duration-300"
      />
      <div>
        <div className="flex items-center space-x-2 relative">
          <h1
            className="text-white font-bold hover:underline cursor-pointer"
            onClick={() => setUserMenu(true)}
          >
            {user.username}
          </h1>
          <UserCard
            setUserMenu={setUserMenu}
            userMenu={userMenu}
            user={user}
            className="absolute top-0 left-0 hidden md:block"
          />
          <p className="text-sm text-[#595d64]">{createdAt}</p>
        </div>
        <p className="text-white font-light">{body}</p>
      </div>
    </div>
  );
};

export default ChannelMessage;
