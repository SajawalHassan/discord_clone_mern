import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import discordLogo from "../images/discord_logo.png";
import axios from "../api/axios";
import Loader from "../components/Loader";

import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Background } from "../images/authBg.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginSuccess, setIsLoading } from "../features/loginSlice";

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
    dispatch(loginFail(""));
  }, [dispatch, isAuth, navigate]);

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(setIsLoading(true));
    try {
      const { data } = await axios.post("/auth/login", { email, password });

      localStorage.setItem("accessToken", data.accessToken);
      dispatch(loginSuccess());
      navigate("/");
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }
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
              type="email"
              label="Email"
              value={email}
              setValue={setEmail}
              loginErr={error ? true : false}
            />
            <InputField
              type="password"
              label="Password"
              value={password}
              setValue={setPassword}
              loginErr={error ? true : false}
            />
          </div>
          <p className="text-xs text-link mt-1">Forgot your password?</p>
          <button
            type="submit"
            className="bg-blue-500 rounded-sm py-2 w-full mt-4 text-white font-bold hover:bg-blue-600 transition-colors duration-300 flex justify-center"
          >
            {isLoading ? <Loader /> : "Continue"}
          </button>
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
