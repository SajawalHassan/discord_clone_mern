import { Dispatch, SetStateAction } from "react";

export interface authContextInterface {
  auth?: any;
  setAuth?: Dispatch<SetStateAction<object>>;
}
