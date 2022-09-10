import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";

const reducers = combineReducers({
  login: loginReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: reducers,
});
