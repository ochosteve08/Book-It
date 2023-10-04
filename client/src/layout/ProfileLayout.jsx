import { Outlet, NavLink, useLocation } from "react-router-dom";

const ProfileLayout = () => {
  const location = useLocation();
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    } else return false;
  };
 
  return (
    <div>
      <nav className="flex p-3 w-full my-8 gap-4 justify-center">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive && pathMatchRoute("/profile")
              ? "rounded-full py-2 px-6 bg-primary text-white"
              : "rounded-full py-2 px-6 bg-gray-400 text-white"
          }
        >
          My Profile
        </NavLink>
        <NavLink
          to="bookings"
          className={({ isActive }) =>
            isActive && pathMatchRoute("/profile/bookings")
              ? "rounded-full py-2 px-6 bg-primary text-white"
              : "rounded-full py-2 px-6 bg-gray-400 text-white"
          }
        >
          My Bookings
        </NavLink>
        <NavLink
          to="apartment"
          className={({ isActive }) =>
            isActive && pathMatchRoute("/profile/apartment")
              ? "rounded-full py-2 px-6 bg-primary text-white"
              : "rounded-full py-2 px-6 bg-gray-400 text-white"
          }
        >
          My Accommodations
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
