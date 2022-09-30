import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return isChecked ? (
    <div
      className="cursor-pointer w-6 h-6 rounded-md bg-blue-500 grid place-content-center"
      onClick={() => setIsChecked(false)}
    >
      <DoneIcon className="text-white !text-lg" />
    </div>
  ) : (
    <div
      className="cursor-pointer rounded-md border border-gray-400 w-6 h-6"
      onClick={() => setIsChecked(true)}
    />
  );
};

export default Checkbox;
