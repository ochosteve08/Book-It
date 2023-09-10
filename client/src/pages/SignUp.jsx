import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Oauth from "../Components/Oauth";
import { BASE_URL } from "../../Config";
import {
  registerFailure,
  registerStart,
  registerSuccess,
  showError,
  showLoading,
  showErrorMessage,
} from "../features/user/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      dispatch(registerStart());
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // withCredentials: true,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        dispatch(registerFailure(error.message));
       
        throw new Error(error.message || "Something went wrong");
      }

      if (response.ok) {
        const data = await response.json();
        dispatch(registerSuccess(data));
        toast.success("Signup successful");

        navigate("/signin");
        setFormData({});
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
      toast.error(error.message);
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
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-6">Register</h1>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="bg-slate-200  rounded-full py-2 px-4 outline-primary hover:outline-primary/50"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-200  rounded-full py-2 px-4 outline-primary hover:outline-primary/50"
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
          {loading ? "Registering...." : "Register"}
        </button>
        <Oauth />
      </form>
      <div className="flex space-x-3 my-3">
        <p>Have An Account Already?</p>
        <Link to={"/signin"}>
          <span className="text-blue-800 cursor-pointer">Login Here</span>
        </Link>
      </div>
      <div>
        {showMessage && error ? (
          <div
            className={`p-3 ${
              errorMsg ? "bg-red-200 rounded-lg text-gray-700" : ""
            }`}
          >
            {errorMsg}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignUp;
