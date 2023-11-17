import { Outlet, Navigate } from "react-router-dom";
import useRefresh from "../../hooks/useRefresh";
import usePersist from "../../hooks/usePersist";
import { useState, useEffect } from "react";
import { userToken } from "./UserSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefresh();
  const [persist] = usePersist();
  const token = useSelector(userToken);
  console.log("persistLogin:",token)
  console.log("persistLogin:",persist)

  useEffect(() => {
    const verifyRefreshToken = async () => {
      setIsLoading(true);
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
      {isLoading ? (
        <p className="text-3xl">Loading....</p>
      ) : !token ? (
        <Navigate to="/login" />
      ) : !persist ? (
        <Outlet />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
