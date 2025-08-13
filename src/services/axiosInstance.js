import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  withCredentials: true, 
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log("Request to:", config.url); 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized! Logging out...");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("email");
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
