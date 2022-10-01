import { useContext } from "react";
import { authContextInterface } from "../interfaces/auth/Auth";

import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { auth, setAuth } = useContext<authContextInterface>(AuthContext);

  return { auth, setAuth };
};

export default useAuth;
