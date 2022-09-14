import { axiosAuth } from "../api/axios";
import { loginSuccess } from "../features/loginSlice";
import { setUser } from "../features/userSlice";
import { store } from "../app/store";

export const getUser = async () => {
  try {
    const { data } = await axiosAuth.get("/users/me");

    store.dispatch(setUser(data));
    store.dispatch(loginSuccess());

    return data;
  } catch (error) {
    return error.response.data;
  }
};
