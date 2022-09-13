import React, { useRef, useState } from "react";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
import MenuOption from "./MenuOption";
import ArrowRightOutlined from "@mui/icons-material/ArrowRightOutlined";
import Seperator from "./Seperator";
import { useSelector } from "react-redux";

const ServerOption = ({ image, text, ownerId }) => {
  const [menu, setMenu] = useState(false);

  const { user } = useSelector((state) => state.user);

  //   console.log({ _id, ownerId });

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setMenu);

  const handleMenu = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };

  return (
    <div>
      <div
        className="h-12 w-12 flex items-center justify-center rounded-3xl bg-[#323236] transition-all hover:rounded-xl duration-200 ease-linear cursor-pointer relative group"
        onClick={(e) => e.type === "contextmenu" && handleMenu(e)}
        onContextMenu={(e) => e.type === "contextmenu" && handleMenu(e)}
      >
        {image && (
          <img
            src={image}
            alt=""
            className="h-full rounded-3xl group-hover:rounded-xl duration-200 transition-all ease-linear"
          />
        )}
        <p className="absolute left-14 bg-[#323236] p-2 rounded-md w-max text-white m-2 shadow-md transition-all duration-100 scale-0 group-hover:scale-100 origin-left">
          {text}
        </p>
      </div>
      {menu && (
        <div>
          {ownerId === user?._id ? (
            <div className="menu left-8" ref={wrapperRef}>
              <div className="menu-option group relative">
                <h1 className="text-sm">Server Settings</h1>
                <ArrowRightOutlined />
                <div className="menu left-[12rem] -top-2 hidden group-hover:block absolute">
                  <MenuOption text="Overview" />
                  <MenuOption text="Members" />
                </div>
              </div>
              <Seperator className="w-full" />
              <MenuOption text="Create Category" />
              <MenuOption text="Create Channel" />
            </div>
          ) : (
            <MenuOption text="Leave server" />
          )}
        </div>
      )}
    </div>
  );
};

export default ServerOption;
