import { Dispatch, SetStateAction } from "react";

const DropdownOption = ({
  active = false,
  option,
  setMenu,
  setValue,
}: {
  active?: boolean;
  option: string;
  setMenu: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const handleOnClick = () => {
    setValue(option);
    setMenu(false);
  };

  return (
    <h1
      className={
        active
          ? `p-2 text-white bg-[#656a72] cursor-pointer`
          : `p-2 text-[#A3A6AA] hover:bg-[#656a72] cursor-pointer hover:text-white`
      }
      onClick={() => handleOnClick()}
    >
      {option}
    </h1>
  );
};

export default DropdownOption;
