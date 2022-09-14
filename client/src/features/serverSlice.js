import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
  modalIsOpen: false,
  serverSidebarIsOpen: false,
};

const serverSlice = createSlice({
  name: "Server",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setModalState: (state, { payload }) => {
      state.modalIsOpen = payload;
    },
    setServerSidebarState: (state, { payload }) => {
      state.serverSidebarIsOpen = payload;
    },
    serverSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
      state.modalIsOpen = false;
    },
    serverFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  serverFail,
  serverSuccess,
  setIsLoading,
  setModalState,
  setServerSidebarState,
} = serverSlice.actions;

export default serverSlice.reducer;
