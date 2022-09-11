import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginFail, loginSuccess } from "./features/loginSlice";
import { axiosAuth } from "./api/axios";
import { setUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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
    dispatch(loginFail(""));
    dispatch(setUser({}));
    navigate("/login");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div>
        <button
          className="p-1 rounded-md bg-blue-500 m-5"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;
