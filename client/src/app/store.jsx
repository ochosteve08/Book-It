import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/auth/UserSlice";


const rootReducer = combineReducers({ user: userReducer });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
