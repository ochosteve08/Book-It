import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Oauth from "../Components/Oauth";
import {BASE_URL} from '../../Config'

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(false);
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
        setLoading(false);
        setError(true);
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      if (response.ok) {
        await response.json();
        setLoading(false);
        setError(false);
        navigate("/signin");
        setFormData({});
      }
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
      setError(true);
    }
  };

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
          <span className="text-blue-800">Login</span>
        </Link>
      </div>
      <div>
        {error ? (
          <div className={`p-3 ${errorMsg ? "bg-red-200" : ""}`}>
            {errorMsg}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignUp;
