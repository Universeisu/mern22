import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = TokenService.getLocalAccessToken(); // ดึง token จาก TokenService
  if (token) {
    config.headers["x-access-token"] = token; // เพิ่ม token ใน header
  }
  return config;
});

export default instance;
