import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL; // e.g. "http://localhost:5000"

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important for sending refresh cookies
});

// Attach access token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = api.post("/refresh-token")
          .then((res) => {
            const newToken = res.data?.accessToken;
            if (!newToken) throw new Error("No token received");
            localStorage.setItem("accessToken", newToken);
            api.defaults.headers.Authorization = `Bearer ${newToken}`;
            return newToken;
          })
          .catch(() => {
            localStorage.clear();
            window.location.href = "/login";
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      const newToken = await refreshPromise;
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
