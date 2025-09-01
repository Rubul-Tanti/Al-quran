import axios from "axios";

export const api = axios.create({
  baseURL: "https://al-kuran-backend-2.onrender.com/user", // change to your backend URL
  withCredentials: true, // if you are using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔑 Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token"); // or sessionStorage/cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;