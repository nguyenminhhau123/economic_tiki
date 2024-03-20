import axios from "axios";

const API_BACKEND_URL = "http://localhost:8080/api/user";

export const axiosJWT = axios.create();

// Hàm đăng nhập người dùng
export const signInUser = async (data) => {
  const res = await axios.post(`${API_BACKEND_URL}/sign-in`, data, {
    withCredentials: true,
  });
  return res.data;
};

// Hàm đăng ký người dùng
export const signUpUser = async (data) => {
  const res = await axios.post(`${API_BACKEND_URL}/sign-up`, data);
  return res.data;
};

// Hàm lấy thông tin chi tiết người dùng
export const getDetailsUser = async (id, token) => {
  console.log("id", id);
  const res = await axios.get(`${API_BACKEND_URL}/getdetail-user/${id}`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Hàm refresh token
export const refresh_token = async () => {
  const res = await axios.post(`${API_BACKEND_URL}/refresh-token`, {
    withCredentials: true,
  });
  return res.data;
};
export const logout_user = async () => {
  const res = await axios.post(`${API_BACKEND_URL}/logout`);
  return res.data;
};

export const updateUser = async (id, data, token) => {
  const res = await axios.put(`${API_BACKEND_URL}/update-user/${id}`, data, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAllUser = async (token) => {
  const res = await axios.get(`${API_BACKEND_URL}/getall-user`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteUser = async (id, token) => {
  const res = await axios.delete(`${API_BACKEND_URL}/delete-user/${id}`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  return res.data;
};
