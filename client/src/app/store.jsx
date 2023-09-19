import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/UserSlice";
import { authMiddleware } from "./authMiddleware";

const rootReducer = combineReducers({ user: userReducer });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});

export default store;
