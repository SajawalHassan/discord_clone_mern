const InputField = ({
  type,
  label,
  error = "",
}: {
  type: string;
  label: string;
  error?: string;
}) => {
  return (
    <div>
      <div className="flex items-center mb-1">
        <p className="font-bold uppercase text-[#B4B6B9] text-sm">{label}</p>
        {error !== "" && (
          <p
            className="font-bold text-red-500 text-xs ml-1 truncate"
            title={error}
          >
            - {error}
          </p>
        )}
      </div>
      <input
        className="w-full p-2 rounded-sm outline-none bg-[#202225] text-white"
        name={type}
        type={type}
      />
    </div>
  );
};

export default InputField;
