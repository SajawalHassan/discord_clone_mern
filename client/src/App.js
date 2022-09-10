import "./App.css";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginSuccess } from "./features/loginSlice";
import { axiosAuth } from "./api/axios";
import { setUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const getUser = async () => {
        try {
          const { data } = await axiosAuth.get("/users/me");

          dispatch(setUser(data));
        } catch (error) {
          console.log(error.response.data);
        }
      };
      getUser();
      dispatch(loginSuccess());
    } else {
      dispatch(loginFail(""));
    }
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="flex space-x-3">
      <h1>{user?.username}</h1>
      <h1>{user?.email}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default App;
