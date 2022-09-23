import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  server: {},
  categories: [],
  channels: [],
  isLoading: false,
  error: "",
};

const channelSlice = createSlice({
  name: "Channel",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    channelSuccess: (state, { payload }) => {
      state.server = payload.server;
      state.categories = payload.categories;
      state.channels = payload.channels;
      state.isLoading = false;
    },
    channelFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { setIsLoading, channelSuccess, channelFail } =
  channelSlice.actions;

export default channelSlice.reducer;
