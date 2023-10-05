import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
// import PrivateRoute from "./Components/PrivateRoute";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PersistLogin from "./features/auth/PersistLogin";
import Bookings from "./features/booking/Bookings";
import Apartment from "./features/apartment/Apartment";
import ProfileLayout from "./layout/ProfileLayout";
import ApartmentLayout from "./layout/ApartmentLayout";
import NewApartment from "./features/apartment/NewApartment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />

          {/* <Route element={<PersistLogin />}>
              <Route element={<PrivateRoute />}> */}
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="apartment" element={<ApartmentLayout />}>
              <Route index element={<Apartment />} />
              <Route path="new" element={<NewApartment />} />
            </Route>
          </Route>
        </Route>
        {/* </Route>
          </Route> */}
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
