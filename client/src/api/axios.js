import axios from "axios";

const baseURL = "http://localhost:5000/api";
const accessToken = localStorage.getItem("accessToken");

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
