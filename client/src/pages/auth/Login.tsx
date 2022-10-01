import InputField from "../../components/auth/InputField";
import Auth from "../../layouts/auth/Auth";
import FinishButton from "../../components/auth/FinishButton";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import { ReactComponent as DiscordTextLogo } from "../../images/discord_text_logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const auth = await axios.post("/auth/login", {
        email,
        password,
      });

      const accessToken = auth?.data.accessToken;

      const user = await axios.get(`/users/me`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      setAuth && setAuth({ user, accessToken });
      setIsLoading(false);
      setError("");
      navigate(from, { replace: true });
    } catch (error: any) {
      setIsLoading(false);
      setError(error.response.data);
    }
  };

  return (
    <Auth className="sm:h-[28rem] sm:w-[30rem]">
      <DiscordTextLogo className="mx-auto mb-3" />
      <form
        className="flex flex-col justify-center h-[85%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="capitalize font-bold text-2xl text-white text-center mb-2">
          Welcome back
        </h1>
        <div className="space-y-8 w-full">
          <InputField
            type="email"
            label="Email"
            min={3}
            max={255}
            value={email}
            setValue={setEmail}
            error={error?.includes("email") && error}
          />
          <InputField
            type="password"
            label="Password"
            min={8}
            max={255}
            value={password}
            setValue={setPassword}
            error={error?.includes("password") && error}
          />
        </div>
        <Link to="/login" className="auth-link mt-3">
          Forgot your password?
        </Link>
        <FinishButton className="mt-4" text="Continue" isLoading={isLoading} />
        <Link to="/register" className="auth-link mt-3">
          Don't have an account?
        </Link>
      </form>
    </Auth>
  );
};

export default Login;
