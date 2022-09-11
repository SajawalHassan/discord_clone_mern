import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registerSlice";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";
import serverReducer from "../features/serverSlice";

const reducers = combineReducers({
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  server: serverReducer,
});

export const store = configureStore({
  reducer: reducers,
});
