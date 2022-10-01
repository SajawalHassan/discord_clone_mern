import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const { data } = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    setAuth &&
      setAuth((prev) => {
        return { ...prev, accessToken: data.accessToken }; // Setting new access token
      });
    return data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
