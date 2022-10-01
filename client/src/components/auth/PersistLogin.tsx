import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = () => {
  const { auth, setAuth } = useAuth();

  const refresh = useRefreshToken();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      }
    };

    if (auth && !auth.accessToken) verifyRefreshToken();
  }, [auth, axiosAuth, refresh, setAuth]);

  return <Outlet />;
};

export default PersistLogin;
