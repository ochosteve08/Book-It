import { BASE_URL } from "../../Config";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { signInFailure, signInSuccess } from "../features/user/UserSlice.jsx";


export const authMiddleware = (store) => (next) => async (action) => {
  
  const token = store.getState().user.token;
  


  if (token) {
    let isTokenExpired = false;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        isTokenExpired = true;
      }
    } catch (error) {
      console.warn("Failed to decode JWT:", error);
      isTokenExpired = true; // If there's an error decoding, consider it expired for safety
    }

    if (isTokenExpired) {
      try {
        const response = await axios.get(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          store.dispatch(signInSuccess(response.data));
          return next(action);
        } else {
          store.dispatch(signInFailure("Token refresh failed"));
        }
      } catch (error) {
        console.error("Error during token refresh:", error);
        store.dispatch(signInFailure(error.message || "Token refresh error"));
      }
    } else {
      return next(action);
    }
  } else {
    return next(action);
  }
};
