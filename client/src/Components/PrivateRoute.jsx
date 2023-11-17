import { useSelector } from "react-redux";
import { userToken } from "../features/auth/UserSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = useSelector(userToken);


 

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
