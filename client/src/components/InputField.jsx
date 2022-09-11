import React from "react";

const InputField = ({
  type,
  value,
  setValue,
  label,
  minLength,
  maxLength,
  error,
  errorMsg,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center mb-1">
        <p className="font-bold uppercase text-[#8B8D91] text-sm">{label}</p>
        {error && (
          <p className="font-bold text-red-500 text-xs ml-1">- {errorMsg}</p>
        )}
      </div>
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

export default InputField;
