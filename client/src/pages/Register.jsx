import React from "react";
import { useState } from "react";
import axios from "../api/axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnClick = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      console.log(data);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  return (
    <form>
      <input
        type="text"
        name="name"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" onClick={(e) => handleOnClick(e)}>
        Register
      </button>
    </form>
  );
};

export default Register;
