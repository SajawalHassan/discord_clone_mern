import React from "react";
import ArrowRightOutlined from "@mui/icons-material/ArrowRightOutlined";

import { useDispatch } from "react-redux";
import { setServerSidebarState } from "../../features/serverSlice";

const ServerHeader = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-[#36393F] flex items-center justify-between p-2">
      <ArrowRightOutlined
        onClick={() => dispatch(setServerSidebarState(true))}
        className="text-4xl cursor-pointer p-1 rounded-full hover:bg-gray-600 transition-colors duration-300 text-white"
      />
    </div>
  );
};

export default ServerHeader;
