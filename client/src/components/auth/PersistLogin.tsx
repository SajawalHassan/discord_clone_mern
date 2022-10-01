import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  const refresh = useRefreshToken();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    auth && !auth?.accessToken && verifyRefreshToken();
  }, [auth, axiosAuth, refresh, setAuth]);

  return isLoading ? <p>Loading</p> : <Outlet />;
};

export default PersistLogin;
