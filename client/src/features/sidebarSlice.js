import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  servers: [],
};

const sidebarSlice = createSlice({
  name: "Sidebar",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setServers: (state, { payload }) => {
      state.isLoading = false;
      state.servers = payload;
    },
  },
});

export const { setIsLoading, setServers } = sidebarSlice.actions;

export default sidebarSlice.reducer;
