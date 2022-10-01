import useAuth from "./useAuth";
import useAxiosAuth from "./useAxiosAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const axiosAuth = useAxiosAuth();

  const logout = async () => {
    setAuth && (await setAuth({}));
    try {
      await axiosAuth.delete("/auth/logout");
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;
