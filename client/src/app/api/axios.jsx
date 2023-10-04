import axios from "axios";


// export const BASE_URL = "https://cyberdev-oauth.onrender.com";

// development mode
export const BASE_URL = "http://localhost:3500";

const apiInstance = axios.create({
  baseURL: BASE_URL,
});
export default apiInstance;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
