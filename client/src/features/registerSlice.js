import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
};

const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    registerSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    registerFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { registerFail, registerSuccess, setIsLoading } =
  registerSlice.actions;

export default registerSlice.reducer;
