import { Outlet, Navigate } from "react-router-dom";
import useRefresh from "../../hooks/usePersist";
import usePersist from "../../hooks/usePersist";
import { useState, useEffect } from "react";
import { userToken } from "./UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefresh();
  const [persist] = usePersist();
  const token = useSelector(userToken);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    !token ? verifyRefreshToken() : setIsLoading(false);
  }, [refresh, token]);

  return (
    <>
      {!token ? (
        <Navigate to="/login"  />
      ) : !persist ? (
        <Outlet />
      ) : isLoading ? (
        <p>Loading....</p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
