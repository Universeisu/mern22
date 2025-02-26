import api from "./api"; // ตรวจสอบว่าไฟล์ api.js มี baseURL ถูกต้อง

const API_URL = "/api/v1/user"; // ✅ เปลี่ยนจาก "/user" เป็น "/api/v1/user"

const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};

const addUser = async (email) => {
  return await api.post(`${API_URL}`, { email });
};

const getUser = async () => {
  return await api.post(`${API_URL}/`);
};
const updateUser = async () => {
  return await api.post(`${API_URL}/{id}`);
};

const UserService = {
  signJwt,
  addUser,
  getUser,
  updateUser,
};

export default UserService;
