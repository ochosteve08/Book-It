import axios from "../app/api/axios";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../features/auth/UserSlice";
import { useNavigate} from "react-router-dom";

const useRefresh = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      console.log(response.status)
      console.log(response)

      if (response.statusCode === 200) {
        console.log(response.data)
        dispatch(signInSuccess(response.data));
      } else if (response.statusCode === 403) {
         navigate("/login");
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
