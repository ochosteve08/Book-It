import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  showError,
  showLoading,
  showErrorMessage,
} from "../features/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../Components/Oauth";
import { BASE_URL } from "../app/api/axios";
import { toast } from "react-toastify";
import usePersist from "../hooks/usePersist";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [persist, setPersist] = usePersist();

  const [formData, setFormData] = useState({});
  const loading = useSelector(showLoading);
  const error = useSelector(showError);
  const errorMsg = useSelector(showErrorMessage);

  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(signInStart());

      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        //  withCredentials: true ,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        dispatch(signInFailure(error.message));
        toast.error(error.message);
        throw new Error(error.message || "Something went wrong");
      }

      if (response.ok) {
        const data = await response.json();

        dispatch(signInSuccess(data));
        toast.success("Login successful");
        navigate(from, { replace: true });
        setFormData({});
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        dispatch(
          signInFailure(
            "Network error. Please check your connection and try again."
          )
        );
      } else {
        dispatch(signInFailure(error.message));
      }
    }
  };

  useEffect(() => {
    if (error) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleToggle = () => setPersist((prev) => !prev);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-6">Login</h1>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-200  rounded-full py-2 px-4 outline-primary/30 hover:outline-primary/50"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-200  rounded-full py-2 px-4 outline-primary hover:outline-primary/50"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-primary p-2 uppercase text-white rounded-full font-semibold disabled:opacity-70"
        >
          {loading ? "Logging...." : "Login"}
        </button>
        <Oauth />
        <label htmlFor="persist" className="flex w-[100vw] items-center gap-4">
          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          Keep me signed in
        </label>
      </form>
      <div className="flex space-x-3 my-3">
        <p>Don&#39;t Have An Account yet?</p>
        <Link to={"/signup"}>
          <span className="text-blue-800 cursor-pointer">Register</span> now
        </Link>
      </div>
      <div>
        {showMessage && error ? (
          <div className={`p-3 ${errorMsg ? "bg-red-200" : ""}`}>
            {errorMsg}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignIn;
