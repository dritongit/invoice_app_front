import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000/api",
});

// ✅ Marrim tokenin nga `localStorage` dhe e shtojmë në çdo request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
