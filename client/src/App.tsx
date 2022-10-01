import { useEffect, useState } from "react";
import useAxiosAuth from "./hooks/useAxiosAuth";

const App = () => {
  const [user, setUser] = useState<any>({});

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axiosAuth.get("/users/me");

        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [axiosAuth]);

  return (
    <div>
      <h1>Users</h1>
      {user.username}
    </div>
  );
};

export default App;
