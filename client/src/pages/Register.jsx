import React, { useState } from "react";
import InputField from "../components/Utils/InputField";
import TextField from "@mui/material/TextField";
import discordLogo from "../images/discord_logo.png";
import axios from "../api/axios";

import {
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Background } from "../images/authBg.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerFail,
  registerSuccess,
  setIsLoading,
} from "../features/registerSlice";
import CreateButton from "../components/Utils/CreateButton";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState(1);
  const [year, setYear] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.login);
  const { error, isLoading } = useSelector((state) => state.register);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    document.title = "Discord | Register";
  }, []);

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(setIsLoading(true));
    try {
      await axios.post("/auth/register", {
        username,
        email,
        password,
        month,
        day,
        year,
      });

      dispatch(registerSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(registerFail(error.response.data));
      console.log(error.response.data);
    }
  };

  return (
    <div className="h-[100vh] overflow-hidden sm:auth-bg">
      <div className="hidden sm:block sm:h-screen">
        <Background />
      </div>
      <form
        className="bg-[#36393F] h-screen w-screen flex flex-col px-3 py-6 sm:fixed sm:inset-0 sm:h-[40rem] sm:w-[30rem] sm:m-auto sm:rounded-md"
        onSubmit={(e) => handleOnClick(e)}
      >
        <div className="flex items-center space-x-2 justify-center mb-6">
          <img src={discordLogo} alt="Discord logo" className="h-10" />
          <h1 className="text-white text-2xl font-extrabold mt-1">Discord</h1>
        </div>

        <div className="mt-4 w-full flex flex-col justify-center h-[80%]">
          <h1 className="text-white text-2xl font-extrabold text-center">
            Create a new account
          </h1>
          <div className="space-y-5">
            <InputField
              inputClassName="bg-[#202225] text-white"
              error={error ? true : false}
              errorMsg={error}
              maxLength={255}
              minLength={3}
              type="email"
              label="Email"
              value={email}
              setValue={setEmail}
            />
            <InputField
              inputClassName="bg-[#202225] text-white"
              error={false}
              maxLength={255}
              minLength={3}
              type="text"
              label="Username"
              value={username}
              setValue={setUsername}
            />
            <InputField
              inputClassName="bg-[#202225] text-white"
              error={false}
              maxLength={255}
              minLength={8}
              type="password"
              label="Password"
              value={password}
              setValue={setPassword}
            />
            <div className="mt-7">
              <div className="grid grid-cols-3 space-x-2">
                <div>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "white" }}>Month</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={month}
                      label="Age"
                      onChange={(e) => setMonth(e.target.value)}
                      sx={{ color: "white" }}
                      required
                    >
                      <MenuItem value="January">January</MenuItem>
                      <MenuItem value="Febuary">Febuary</MenuItem>
                      <MenuItem value="March">March</MenuItem>
                      <MenuItem value="April">April</MenuItem>
                      <MenuItem value="May">May</MenuItem>
                      <MenuItem value="June">June</MenuItem>
                      <MenuItem value="July">July</MenuItem>
                      <MenuItem value="August">August</MenuItem>
                      <MenuItem value="Sepember">Sepember</MenuItem>
                      <MenuItem value="October">October</MenuItem>
                      <MenuItem value="November">November</MenuItem>
                      <MenuItem value="December">December</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ color: "white" }}
                    >
                      Day
                    </InputLabel>
                    <Select
                      sx={{ color: "white" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={day}
                      label="Age"
                      onChange={(e) => setDay(e.target.value)}
                      required
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={11}>11</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={13}>13</MenuItem>
                      <MenuItem value={14}>14</MenuItem>
                      <MenuItem value={15}>15</MenuItem>
                      <MenuItem value={16}>16</MenuItem>
                      <MenuItem value={17}>17</MenuItem>
                      <MenuItem value={18}>18</MenuItem>
                      <MenuItem value={19}>19</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={21}>21</MenuItem>
                      <MenuItem value={22}>22</MenuItem>
                      <MenuItem value={23}>23</MenuItem>
                      <MenuItem value={24}>24</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={26}>26</MenuItem>
                      <MenuItem value={27}>27</MenuItem>
                      <MenuItem value={28}>28</MenuItem>
                      <MenuItem value={29}>29</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={31}>31</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  id="outlined-basic-year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  label="Year"
                  InputLabelProps={{
                    className: "text-white",
                  }}
                  variant="outlined"
                  type="number"
                  inputProps={{
                    max: new Date().getFullYear(),
                    min: new Date().getFullYear() - 200,
                    className: "text-white",
                  }}
                  required
                />
              </div>
            </div>
            <div className="flex mt-3">
              <Checkbox className="-mt-3" />
              <p className="text-[#8B8D91] text-[11px]">
                (Optional) It's okay to send me emails with Discord updates,
                tips, and special offers.
              </p>
            </div>
          </div>
          <CreateButton
            text="Continue"
            isLoading={isLoading}
            className="mt-4"
          />
          <Link to="/login" className="text-link text-xs mt-1">
            Already have an account?
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
}

export default Register;
