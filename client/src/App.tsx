import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosAuth from "./hooks/useAxiosAuth";
import useLogout from "./hooks/useLogout";

const App = () => {
  const [user, setUser] = useState<any>({});

  const axiosAuth = useAxiosAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axiosAuth.get("/users/me");

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [axiosAuth]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <button
        className="p-2 bg-blue-500 rounded-sm text-white"
        onClick={() => handleLogout()}
      >
        Sign out
      </button>
      <h1>Users</h1>
      {user.username}
      {user.email}
    </div>
  );
};

export default App;
