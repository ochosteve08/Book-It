import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import Layout from "./Components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "./features/user/UserSlice";
import axios from "axios";
import { BASE_URL } from "../Config";
import { userDetails, userToken } from "./features/user/UserSlice";

function App() {
  const dispatch = useDispatch();

  const currentUser = useSelector(userDetails);
  const token = useSelector(userToken);

  useEffect(() => {
    if (!token) {
      axios
        .get(`${BASE_URL}/auth/refresh`, { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            dispatch(signInSuccess(response.data));
            console.log(response.data);
          } else {
            // Handle unauthenticated status if needed
          }
        })
        .catch((error) => {
          console.error("Error checking authentication status:", error);
          // Handle API call failure, e.g. clear cookies or redirect to login
        });
    }
  }, [currentUser, dispatch, token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<PrivateRoute />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
