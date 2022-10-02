import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface Props {
  active?: boolean;
  text: string;
  to?: string;
  onClick?: MouseEventHandler;
}

const SidebarOption = ({
  active = false,
  text,
  to = "#",
  onClick = undefined,
}: Props) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`p-2 cursor-pointer ${
        active
          ? `text-[#24BAF4] font-light bg-[#F6F6F6] hover:underline rounded-md`
          : `text-black hover:underline font-light`
      }`}
      title={text}
    >
      {text}
    </Link>
  );
};

export default SidebarOption;
