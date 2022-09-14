import React from "react";

const IconWithLabel = ({ Icon, labelText }) => {
  return (
    <div className="relative group">
      <h1 className="absolute hidden right-0 -top-8 rounded-md text-xs truncate group-hover:block p-2 bg-[#1f2022] shadow-md text-white font-bold">
        {labelText}
      </h1>
      <Icon className="text-[#b1b1b1] hover:text-[#D5D6D7] cursor-pointer" />
    </div>
  );
};

export default IconWithLabel;
