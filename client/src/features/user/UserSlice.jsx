import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  loading: false,
  error: false,
  success: false,
  errMsg: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      const { accessToken, currentUser } = action.payload;
      state.currentUser = currentUser;
      state.token = accessToken;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    signInFailure: (state, action) => {
      state.errMsg = action.payload;
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    registerFailure: (state, action) => {
      state.errMsg = action.payload;
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.token = action.payload.accessToken;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    updateUserFailure: (state, action) => {
      state.errMsg = action.payload;
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    deleteUserSuccess: () => initialState,
    deleteUserFailure: (state, action) => {
      state.errMsg = action.payload;
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    signOut: () => {
      localStorage.removeItem("currentUser");
      return initialState;
    },
    resetMessages: (state) => {
      state.error = false;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  resetMessages,
  registerFailure,
  registerStart,
  registerSuccess,
} = userSlice.actions;

export const showLoading = (state) => state.user.loading;
export const showError = (state) => state.user.error;
export const showErrorMessage = (state) => state.user.errMsg;
export const showSuccess = (state) => state.user.success;
export const userDetails = (state) => state.user.currentUser;
export const userToken = (state) => state.user.token;

export default userSlice.reducer;
