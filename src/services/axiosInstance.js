import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // cookie পাঠাতে
});

// Request interceptor → attach accessToken
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// Response interceptor → handle expired token + retry once
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
 
    // 403 → AccessToken expired
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axiosInstance.post("/refresh-token");
        const newAccessToken = data?.accessToken;

        if (!newAccessToken) throw new Error("No accessToken returned");

        // save & attach
        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch {
        // refresh fail → logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");
        window.location.href = "/login";
      }
    }

    // 401 → Unauthorized → logout
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
