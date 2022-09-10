import React from "react";

const Loader = () => {
  return (
    <div
      style={{ borderTopColor: "white" }}
      className="w-6 h-6 border-2 border-gray-300 animate-spin rounded-full"
    ></div>
  );
};

export default Loader;
