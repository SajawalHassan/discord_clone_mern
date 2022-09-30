import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Dispatch, SetStateAction, useState } from "react";
import DropdownOption from "./DropdownOption";

const Dropdown = ({
  placeholder,
  options,
  value,
  setValue,
}: {
  placeholder: string;
  options: any;
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
}) => {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <div className="relative">
      {menu && (
        <div className="rounded-sm bg-[#464a50] absolute -top-[10.5rem] w-full text-white max-h-[10rem] overflow-y-scroll">
          {options?.map((option: string, index: number) => (
            <div key={index}>
              <DropdownOption
                option={option}
                setMenu={setMenu}
                setValue={setValue}
              />
            </div>
          ))}
        </div>
      )}
      <div
        className="flex items-center justify-between p-2 rounded-sm bg-[#202225] cursor-pointer max-w-[9rem]"
        onClick={() => setMenu(!menu)}
      >
        <input
          className="bg-transparent max-w-[6rem] outline-none text-white cursor-pointer"
          onClick={() => setMenu(!menu)}
          value={value}
          placeholder={placeholder}
          required
        />
        {/* {!value ? (
        <h1 className="text-[#A3A6AA]">{placeholder}</h1>
        ) : (
          <h1 className="text-white">{value}</h1>
        )} */}
        <ArrowDropDownIcon className="text-white" />
      </div>
    </div>
  );
};

export default Dropdown;
