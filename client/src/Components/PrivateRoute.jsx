import { useSelector } from "react-redux";
import { userToken } from "../features/user/UserSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = useSelector(userToken);
  console.log(token);

  return <outlet/>

//   return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
