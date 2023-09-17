import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure } from "../features/user/UserSlice";
import { BASE_URL } from "../../Config";
import { userToken, signOut } from "../features/user/UserSlice";
import { signInSuccess } from "./path_to_your_userslice";

const Persist = () => {
  return <div>Persist</div>;
};

export default Persist;

async function FetchWithTokenRefresh() {
  const dispatch = useDispatch();
  const token = useSelector(userToken);

  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
    });
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      if (data.accessToken) {
        dispatch(signInSuccess(data));
      } else {
        dispatch(signInFailure(data.message));
        dispatch(signOut());
      }
    }
  }
}

export function App() {
  const dispatch = useDispatch();
  const token = useSelector(userToken);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      dispatch(signInSuccess(JSON.parse(savedUser)));
    }
    if (!token) {
      FetchWithTokenRefresh();
    }
  }, [dispatch, token]);

  // ... rest of your app
}
