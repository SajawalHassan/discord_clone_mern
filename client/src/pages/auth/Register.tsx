import InputField from "../../components/auth/InputField";
import Auth from "../../layouts/auth/Auth";
import Dropdown from "../../components/auth/Dropdown";
import Checkbox from "../../components/auth/Checkbox";
import FinishButton from "../../components/auth/FinishButton";
import axios from "../../api/axios";

import { ReactComponent as DiscordTextLogo } from "../../images/discord_text_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";

const Register = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const monthList: string[] = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octobor",
    "November",
    "December",
  ];

  const dayList: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await axios.post("/auth/register", {
        username,
        email,
        password,
        month,
        day,
        year,
      });

      setIsLoading(false);
      setError("");
      navigate("/login");
    } catch (error: any) {
      setIsLoading(false);
      setError(error.response.data);
    }
  };

  return (
    <Auth className="sm:h-[38rem] sm:w-[30rem]">
      <DiscordTextLogo className="mx-auto mb-3" />
      <form
        className="grid place-content-center h-[85%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="capitalize font-bold text-2xl text-white text-center mb-2">
          Create an account
        </h1>
        <div className="space-y-8">
          <InputField
            type="name"
            label="Username"
            min={3}
            max={255}
            value={username}
            setValue={setUsername}
            error={error.toLowerCase().includes("username") && error}
          />
          <InputField
            type="email"
            label="Email"
            min={3}
            max={255}
            value={email}
            setValue={setEmail}
            error={error.toLowerCase().includes("email") && error}
          />
          <InputField
            type="password"
            label="Password"
            min={8}
            max={255}
            value={password}
            setValue={setPassword}
            error={error.toLowerCase().includes("password") && error}
          />
          <div className="grid grid-cols-3 gap-x-3">
            <Dropdown
              setValue={setMonth}
              placeholder="Month"
              options={monthList}
              value={month}
            />
            <Dropdown
              setValue={setDay}
              placeholder="Day"
              options={dayList}
              value={day}
            />
            <input
              className="w-full p-2 rounded-sm outline-none bg-[#202225] text-white"
              type="numeric"
              placeholder="Year"
              value={year ? year : ""}
              onChange={(e) =>
                setYear(parseInt((e.target as HTMLInputElement).value))
              }
              min={currentYear - 200}
              max={currentYear}
              required
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-3">
          <Checkbox />
          <p className="text-[11px] text-gray-500 max-w-[85%] line-clamp-2">
            (Optional) It's okay to send me emails with Discord updates, tips,
            and special offers. You can opt out at any time.
          </p>
        </div>
        <FinishButton className="mt-4" text="Continue" isLoading={isLoading} />
        <Link to="/login" className="auth-link mt-3">
          Already have an account?
        </Link>
      </form>
      <p className="absolute bottom-3 text-gray-500 text-xs pr-1">
        By registering, you agree to Discord's{" "}
        <span className="auth-link text-xs">Terms of Service</span> and{" "}
        <span className="auth-link text-xs">Privacy Policy</span>
      </p>
    </Auth>
  );
};

export default Register;
