import axios from "axios";

const API_BACKEND_URL = "http://localhost:8080/api/product";

export const axiosJWT = axios.create();

// Hàm đăng nhập người dùng
export const getAllProduct = async (data) => {
  const res = await axios.get(`${API_BACKEND_URL}/getall-product`);
  return res.data;
};
export const createProduct = async (data) => {
  const res = await axios.post(`${API_BACKEND_URL}/create-product`, data);
  return res.data;
};
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_BACKEND_URL}/delete-product/${id}`);
  return res.data;
};
export const getDetailsProduct = async (id) => {
  const res = await axios.get(`${API_BACKEND_URL}/getdetails-product/${id}`);
  return res.data;
};
export const updateProduct = async (id, data, token) => {
  const res = await axios.put(`${API_BACKEND_URL}/update-product/${id}`, data);
  return res.data;
};
