import { axiosPrivate } from "../app/api/axios";
import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";
import { userToken } from "../features/auth/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure } from "../features/auth/UserSlice";

const useAxiosPrivate = () => {

  const token = useSelector(userToken);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const refresh = useRefresh();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetryAttempts = 3;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log("axios:", error?.response?.status);
        if (
          error?.response?.status === 403 &&
          !prevRequest?.sent &&
          retryCount < maxRetryAttempts
        ) {
          setRetryCount((prevCount) => prevCount + 1);
          prevRequest.sent = true;
          try {
            await refresh();

            prevRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            console.log(refreshError);
            dispatch(signInFailure(refreshError));
            navigate("/login", { state: { from: location }, replace: true });

            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [dispatch, location, navigate, refresh, retryCount, token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
