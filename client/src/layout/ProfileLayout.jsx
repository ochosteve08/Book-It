import { Outlet,NavLink } from "react-router-dom"

const ProfileLayout = () => {
  return (
    <div>
      <nav className="flex p-3 w-full my-8 gap-4 justify-center">
        <NavLink
          to="/profile"
          activeClassName="bg-primary text-white"
          className="bg-gray-300 rounded-full py-2 px-6 bg-primary text-white"
        >
          My Profile
        </NavLink>
        <NavLink
          to="/profile/bookings"
        
          className="bg-gray-300 rounded-full py-2 px-6  bg-primary text-white"
        >
          My Bookings
        </NavLink>
        <NavLink
          to="/profile/places"
          className="bg-gray-300 rounded-full py-2 px-6  bg-primary text-white"
        >
          My Accommodations
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default ProfileLayout