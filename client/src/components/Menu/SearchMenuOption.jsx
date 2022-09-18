import React from "react";
import AddOutlined from "@mui/icons-material/AddOutlined";

const SearchMenuOption = ({ boldedText, text }) => {
  return (
    <div className="text-gray-300 text-sm px-2 cursor-pointer hover:bg-[#2E3136] group flex items-center justify-between h-10 rounded-[4px]">
      <h1>
        <span className="font-bold text-gray-200">{boldedText}</span>: {text}
      </h1>
      <AddOutlined className="hidden group-hover:block text-white" />
    </div>
  );
};

export default SearchMenuOption;
