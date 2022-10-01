import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosAuth = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const resIntercept = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err: any) => {
        const req = err?.config;
        if (err.response.status === 403 && !req.sent) {
          req.sent = true;
          // Generating new access token and setting it on header
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          req.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(req); // Making the request again
        }
        return Promise.reject(err); // Rejecting promise incase of unexpected error
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosAuth;
