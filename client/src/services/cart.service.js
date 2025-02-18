import api from "./api";
const API_URL = "/cartItems";

const getAllCartItems = async () => {
  return await api.get(API_URL);
};

const createCartItems = async (cartItem) => {
  return await api.post(API_URL, cartItem);
};

const getCartItemsByEmail = async (email) => {
  return await api.get(`${API_URL}/user/${email}`);
};

const clearCartItems = async (email) => {
  return await api.delete(`${API_URL}/remove/${email}`);
};

const removeCartItem = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const updateCartItem = async (id, cartItem) => {
  return await api.put(`${API_URL}/${id}`, cartItem);
};

const CartServices = {
  getAllCartItems,
  createCartItems,
  getCartItemsByEmail,
  clearCartItems,
  removeCartItem,
  updateCartItem,
};

export default CartServices;
