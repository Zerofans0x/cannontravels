// import axios from "axios";

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.mystellarterm.com/api/v1",
//   withCredentials: true, // Crucial for sending/receiving HttpOnly refresh tokens
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Optional: Automatically attach access token from memory if you store it there
// api.interceptors.request.use((config) => {
//   const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.mystellarterm.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🚨 NEW: Global 401 Interceptor to bounce expired users straight to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        // // Prevent infinite loops if already on login page
        // if (!window.location.pathname.includes("/login")) {
        //   window.location.href = "/login";
        // }
      }
    }
    return Promise.reject(error);
  }
);