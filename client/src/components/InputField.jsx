import React from "react";

const TextField = ({ type, value, setValue, label, minLength, maxLength }) => {
  return (
    <div className="w-full">
      <p className="mb-1 font-bold uppercase text-[#8B8D91] text-sm">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-[#202225] w-full p-2 rounded-sm outline-none text-white"
        required
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
};

export default TextField;
