import React from "react";

const MenuOption = ({ text, Icon }) => {
  return (
    <div className="menu-option flex items-center justify-between">
      <h1 className="text-sm">{text}</h1>
      {Icon && <Icon className="text-xl" />}
    </div>
  );
};

export default MenuOption;
