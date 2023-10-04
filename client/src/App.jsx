import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// import PrivateRoute from "./Components/PrivateRoute";
import Layout from "./Components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PersistLogin from "./features/user/PersistLogin";
import Bookings from "./pages/Bookings";
import Places from "./pages/Places";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />

          {/* <Route element={<PersistLogin />}> */}
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="places" element={<Places />} />
          </Route>
        </Route>
        {/* </Route> */}
        {/* </Route> */}
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
