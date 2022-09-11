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
  inputClassName,
  multiline,
  rows,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center mb-1">
        <p className="font-bold uppercase text-[#8B8D91] text-sm">{label}</p>
        {error && (
          <p
            className="font-bold text-red-500 text-xs ml-1 truncate"
            title={errorMsg}
          >
            - {errorMsg}
          </p>
        )}
      </div>
      {multiline ? (
        <textarea
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`resize-none w-full p-2 rounded-sm outline-none ${inputClassName}`}
          required="required"
          minLength={minLength}
          maxLength={maxLength}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full p-2 rounded-sm outline-none ${inputClassName}`}
          required
          minLength={minLength}
          maxLength={maxLength}
        />
      )}
    </div>
  );
};

export default InputField;
