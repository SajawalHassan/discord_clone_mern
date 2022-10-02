import { Dispatch, SetStateAction, useEffect } from "react";

const useOutsideAlerter = (
  ref: any,
  setState: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current?.contains(e.target)) {
        setState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setState]);
};

export default useOutsideAlerter;
