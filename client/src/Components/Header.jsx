import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { userDetails } from "../features/auth/UserSlice";

const Header = () => {
  const currentUser = useSelector(userDetails);
  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="flex p-3 justify-between items-center">
        <Link to={"/"}>
          <div className="bg-primary px-1 rounded-lg">
            <h1 className="font-semibold bg-primary text-white p-1 border-4 rounded-lg  text-md md:text-md">
              BOOK-IT
            </h1>
          </div>
        </Link>

        <div className="flex border border-gray-300 shadow-lg shadow-gray-300  rounded-full py-2 px-3 space-x-3 items-center font-medium">
          <div className="border-r border-gray-400 px-3">Anywhere</div>
          <div className="border-r border-gray-400 pr-3">Any week</div>
          <div>Add Guests</div>
          <button
            className="bg-primary rounded-full p-3 text-white"
            type="submit"
          >
            <FaSearch />
          </button>
        </div>

        <Link
          to={currentUser ? "profile" : "signin"}
          className="flex border border-gray-300 shadow-lg shadow-gray-300  rounded-full  px-3 py-2 space-x-3 items-center cursor-pointer overflow-hidden"
        >
          <RxHamburgerMenu className="text-xl" />
          <div >
            {currentUser ? (
              <img
                src={currentUser?.profilePicture}
                alt=""
                className="rounded-full self-center object-cover"
                width={30}
              
              />
            ) : (
              <FaUserAlt className="bg-gray-500  p-1 rounded-full text-white flex text-3xl" />
            )}
          </div>
          {currentUser && <div>{currentUser?.username}</div>}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
