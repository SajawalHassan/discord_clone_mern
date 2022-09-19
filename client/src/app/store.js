import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registerSlice";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";
import serverReducer from "../features/serverSlice";
import sidebarReducer from "../features/sidebarSlice";

const reducers = combineReducers({
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  server: serverReducer,
  sidebar: sidebarReducer,
});

export const store = configureStore({
  reducer: reducers,
});
