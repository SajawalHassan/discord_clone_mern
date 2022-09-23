import React, { useRef } from "react";
import ArrowRightOutlined from "@mui/icons-material/ArrowRightOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Loader from "../Utils/Loader";
import SearchMenuOption from "../Menu/SearchMenuOption";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

import { ReactComponent as TextIcon } from "../../images/textIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setServerSidebarState } from "../../features/serverSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const ServerHeader = () => {
  const [channelName, setChannelName] = useState("");
  const [search, setSearch] = useState(false);
  const [searchField, setSearchField] = useState("");

  const { channelId } = useParams();
  const { channels, isLoading } = useSelector((state) => state.channel);

  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setSearch);

  useEffect(() => {
    channels
      ?.filter((channel) => channel._id === channelId)
      .map(({ title }) => setChannelName(title));
  }, [channelId, channels]);

  return (
    <div className="bg-[#36393F] flex items-center p-2 h-14 justify-between border-b border-[#232527] w-full sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <ArrowRightOutlined
          onClick={() => dispatch(setServerSidebarState(true))}
          className="text-4xl cursor-pointer p-1 rounded-full hover:bg-gray-600 transition-colors duration-300 text-white sm:hidden"
        />
        <h1 className="text-xl flex items-center font-bold text-white flex-wrap gap-x-3">
          <span className="text-[#686a70]">
            <TextIcon />
          </span>{" "}
          {isLoading ? <Loader /> : channelName}
        </h1>
      </div>
      <SearchOutlined
        onClick={() => setSearch(true)}
        className="text-[40px] cursor-pointer p-1.5 rounded-full hover:bg-zinc-600 text-white transition-colors duration-300"
      />
      {search && (
        <div className="fixed h-screen w-screen z-50 bg-black bg-opacity-60 m-auto inset-0 grid place-content-center">
          <div
            className="bg-[#212327] rounded-md w-[20rem] md:w-[30rem] p-2 shadow-lg space-y-2"
            ref={wrapperRef}
          >
            <div className="p-1 flex items-center justify-between">
              <input
                type="text"
                className="rounded-sm text-white bg-transparent outline-none flex-grow"
                placeholder="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <SearchOutlined className="text-zinc-500" />
            </div>
            <div>
              {searchField !== "" && (
                <div className="flex items-center justify-between p-2 bg-[#23262A] my-2">
                  <div className="flex items-center space-x-1">
                    <p className="uppercase text-xs font-extralight text-stone-600">
                      Search for:
                    </p>
                    <p className="font-bold text-sm text-white">
                      {searchField}
                    </p>
                  </div>
                </div>
              )}
              <h1 className="text-sm font-bold ml-2 text-gray-400 uppercase">
                Search Options
              </h1>
              <div className="mt-2">
                <SearchMenuOption boldedText="from" text="user" />
                <SearchMenuOption boldedText="mentions" text="user" />
                <SearchMenuOption boldedText="has" text="link, embed or file" />
                <SearchMenuOption boldedText="before" text="specific date" />
                <SearchMenuOption boldedText="during" text="specific date" />
                <SearchMenuOption boldedText="after" text="specific date" />
                <SearchMenuOption boldedText="in" text="channel" />
                <SearchMenuOption boldedText="pinned" text="true or false" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerHeader;
