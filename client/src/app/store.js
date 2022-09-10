import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";

const reducers = combineReducers({
  login: loginReducer,
});

export const store = configureStore({
  reducer: reducers,
});
