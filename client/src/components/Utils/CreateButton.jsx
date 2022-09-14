import React from "react";
import Loader from "./Loader";

const CreateButton = ({ isLoading, text, className }) => {
  return (
    <button
      type="submit"
      className={`bg-blue-500 rounded-sm py-2 w-full mt-4 text-white font-bold hover:bg-blue-600 transition-colors duration-300 flex justify-center ${className}`}
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};

export default CreateButton;
