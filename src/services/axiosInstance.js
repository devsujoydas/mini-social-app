import axios from "axios";

// 🔹 Main axios instance (সব request এর জন্য)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // cookie automatically পাঠাবে
});

// 🔹 Raw axios instance (refresh-token call এর জন্য ONLY)
const rawAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// 🔹 Refresh control variables
let isRefreshing = false;
let failedQueue = [];

// Queue process করার helper
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 🔹 Request interceptor → token attach
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Response interceptor → auto refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 → AccessToken expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // যদি already refresh হচ্ছে → queue তে রেখে দাও
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 🔹 এখানে rawAxios ব্যবহার করছি
        const { data } = await rawAxios.post("/refresh-token");
        const newAccessToken = data?.accessToken;

        if (!newAccessToken) throw new Error("No accessToken returned");

        // Save new token
        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        // Pending request replay করাও
        processQueue(null, newAccessToken);

        // Original request আবার পাঠাও
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Refresh ব্যর্থ হলে → সব clear করে logout
        processQueue(err, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");

        // চাইলে এখানে তোমার AuthContext এর setUserData(null) ও কল করতে পারো
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
