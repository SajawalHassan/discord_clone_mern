import React from "react";

const SidebarOption = ({
  image,
  Icon,
  text,
  hoverBg = "hover:bg-[#3BA55D]",
  onClick = null,
}) => {
  return (
    <div
      className={`h-12 w-12 flex items-center justify-center rounded-3xl bg-[#323236] transition-all hover:rounded-xl duration-200 ease-linear ${hoverBg} cursor-pointer relative group`}
      onClick={() => onClick()}
    >
      {Icon && <Icon className="text-[2rem] text-white" />}
      {image && <img src={image} alt="" className="h-10" />}
      <p className="absolute left-14 bg-[#323236] p-2 rounded-md w-max text-white m-2 shadow-md transition-all duration-100 scale-0 group-hover:scale-100 origin-left">
        {text}
      </p>
    </div>
  );
};

export default SidebarOption;
