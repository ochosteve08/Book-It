import { Outlet, NavLink, useLocation } from "react-router-dom";
import { MdHouse, MdOutlineViewList } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

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
          className={({ isActive }) => {
            const baseClasses =
              "rounded-full py-2 px-6 text-white inline-flex items-center gap-3";
            const activeClass =
              isActive && pathMatchRoute("/profile")
                ? "bg-primary"
                : "bg-gray-400";
            return `${baseClasses} ${activeClass}`;
          }}
        >
        <FaUserAlt/>
          My Profile
        </NavLink>

        <NavLink
          to="bookings"
          className={({ isActive }) => {
            const baseClasses =
              "rounded-full py-2 px-6 text-white inline-flex items-center gap-3";
            const activeClass =
              isActive && pathMatchRoute("/profile/bookings")
                ? "bg-primary"
                : "bg-gray-400";
            return `${baseClasses} ${activeClass}`;
          }}
        >
          <MdOutlineViewList />
          My Bookings
        </NavLink>
        <NavLink
          to="apartment"
          className={({ isActive }) => {
            const baseClasses =
              "rounded-full py-2 px-6 text-white inline-flex items-center gap-3";
            const activeClass =
              isActive && pathMatchRoute("/profile/apartment")
                ? "bg-primary"
                : "bg-gray-400";
            return `${baseClasses} ${activeClass}`;
          }}
        >
          <MdHouse className="text-2xl" />
          My Accommodations
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
