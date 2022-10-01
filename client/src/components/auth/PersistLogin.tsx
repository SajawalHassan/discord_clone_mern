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

    const getUser = async () => {
      try {
        const { data } = await axiosAuth.get("/users/me");
        setAuth &&
          setAuth((prev) => {
            return { ...prev, user: data };
          });
      } catch (error) {
        console.log(error);
      }
    };
    !auth.user ? getUser() : setIsLoading(false);
  }, [auth, axiosAuth, refresh, setAuth]);

  return isLoading ? <p>Loading</p> : <Outlet />;
};

export default PersistLogin;
