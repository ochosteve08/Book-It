import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../features/auth/UserSlice";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "../app/api/axios";
import { toast } from "react-toastify";

const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    } else return false;
  };

  const googleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const response = await fetch(`${BASE_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // withCredentials: true,
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      if (response.ok) {
        const data = await response.json();

        dispatch(signInSuccess(data));

        toast.success("Login successful");
        navigate("/profile");
      }
    } catch (error) {
      console.log("could not login with google", error);
      toast.error(error.message);
    }
  };
  return (
    <button
      type="button"
      className=" bg-blue-700 px-2 py-1 uppercase text-white rounded-full font-semibold disabled:opacity-70 hover:opacity-90 flex justify-center items-center gap-3"
      onClick={googleClick}
    >
      <FcGoogle className="text-3xl " />
      {pathMatchRoute("/signup")
        ? "signup with Google"
        : " Continue with Google"}
    </button>
  );
};

export default Oauth;
