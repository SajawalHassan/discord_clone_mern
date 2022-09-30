const FinishButton = ({
  text,
  className,
  isLoading,
}: {
  text: string;
  className?: string;
  isLoading: boolean;
}) => {
  return (
    <button
      type="submit"
      className={`w-full py-2 rounded-[3px] bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white font-bold ${className}`}
    >
      {isLoading ? (
        <div
          style={{ borderTopColor: "white" }}
          className="w-6 h-6 border-2 border-main-bg animate-spin rounded-full mx-auto"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default FinishButton;
