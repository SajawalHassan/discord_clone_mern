import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginFail, loginSuccess } from "./features/loginSlice";
import { axiosAuth } from "./api/axios";
import { setUser } from "./features/userSlice";
import Sidebar from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();

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
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div>
        <h1>Hello World!</h1>
      </div>
    </div>
  );
}

export default App;
