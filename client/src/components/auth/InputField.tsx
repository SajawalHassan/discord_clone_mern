import { Dispatch, SetStateAction } from "react";

const InputField = ({
  type,
  label,
  error = "",
  min,
  max,
  value,
  setValue,
}: {
  type: string;
  label: string;
  error?: any;
  min?: number;
  max?: number;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div>
      <div className="flex items-center mb-1">
        <p className="font-bold uppercase text-[#B4B6B9] text-xs">{label}</p>
        {error && (
          <p
            className="font-bold text-red-500 text-xs ml-1 truncate"
            title={error}
          >
            - {error}
          </p>
        )}
      </div>
      <input
        className="w-full py-2 px-2 rounded-[4px] outline-none bg-[#202225] text-white"
        name={type}
        type={type}
        required
        minLength={min}
        maxLength={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputField;
