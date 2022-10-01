import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const refresh = async () => {
    try {
      const { data } = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      setAuth &&
        setAuth((prev) => {
          return { ...prev, accessToken: data.accessToken }; // Setting new access token
        });
      return data.accessToken;
    } catch (error: any) {
      if (error.response.status === 403)
        return navigate(from, { replace: true });
    }
  };
  return refresh;
};

export default useRefreshToken;
