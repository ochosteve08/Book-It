import axios from "../app/api/axios";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../features/auth/UserSlice";

const useRefresh = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(signInSuccess(response.data));
      } else if (response.status === 403) {
        dispatch(signInFailure());
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
      // Handle API call failure, e.g. clear cookies or redirect to login
    }
  };
  return refresh;
};

export default useRefresh;
