import React, { useEffect, useState } from "react";
import InputField from "../components/Utils/InputField";
import discordLogo from "../images/discord_logo.png";
import axios from "../api/axios";

import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Background } from "../images/authBg.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginSuccess, setIsLoading } from "../features/loginSlice";
import CreateButton from "../components/Utils/CreateButton";
import { setUser } from "../features/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, isAuth } = useSelector((state) => state.login);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    document.title = "Discord | Login";
  }, []);

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(setIsLoading(true));
    let accessToken = "";
    try {
      const { data } = await axios.post("/auth/login", { email, password });

      localStorage.setItem("accessToken", data.accessToken);
      accessToken = data.accessToken;
      dispatch(loginSuccess());
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }
    try {
      const { data } = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(setUser(data));
    } catch (error) {
      console.log(error.response.data);
    }
    navigate("/");
  };
  return (
    <div className="h-[100vh] overflow-hidden sm:auth-bg">
      <div className="hidden sm:block sm:h-screen">
        <Background />
      </div>
      <form
        className="bg-[#36393F] h-screen w-screen flex flex-col px-3 py-6 sm:fixed sm:inset-0 sm:h-[30rem] sm:w-[30rem] sm:m-auto sm:rounded-md"
        onSubmit={(e) => handleOnClick(e)}
      >
        <div className="flex items-center space-x-2 justify-center mb-6">
          <img src={discordLogo} alt="Discord logo" className="h-10" />
          <h1 className="text-white text-2xl font-extrabold mt-1">Discord</h1>
        </div>

        <div className="mt-4 w-full flex flex-col justify-center h-[80%]">
          <h1 className="text-white text-2xl font-extrabold text-center">
            Welcome back!
          </h1>
          <p className="text-sm text-[#8B8D91] text-center">
            We're so excited to see you again!
          </p>
          <div className="space-y-5">
            <InputField
              inputClassName="bg-[#202225] text-white"
              type="email"
              label="Email"
              value={email}
              setValue={setEmail}
              error={error ? true : false}
              errorMsg={error}
            />
            <InputField
              inputClassName="bg-[#202225] text-white"
              type="password"
              label="Password"
              value={password}
              setValue={setPassword}
              error={error ? true : false}
              errorMsg={error}
            />
          </div>
          <p className="text-xs text-link mt-1">Forgot your password?</p>
          <CreateButton text="Login" isLoading={isLoading} className="mt-4" />
          <Link to="/register" className="text-link text-xs mt-1">
            Don't have an account?
          </Link>
          <p className="text-xs text-zinc-400 mt-5">
            By registering, you agree to Discord's{" "}
            <span className="text-link">Terms of Service</span> and{" "}
            <span className="text-link">Privacy Policy</span>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
