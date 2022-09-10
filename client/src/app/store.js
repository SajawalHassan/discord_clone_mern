import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registerSlice";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";

const reducers = combineReducers({
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: reducers,
});
