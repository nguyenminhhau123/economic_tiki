import axios from "axios";

const API_BACKEND_URL = "http://localhost:8080/api";

export const axiosJWT = axios.create();

// Hàm đăng nhập người dùng
export const signInUser = async (data) => {
  const res = await axios.post(`${API_BACKEND_URL}/user/sign-in`, data, {
    withCredentials: true,
  });
  return res.data;
};

// Hàm đăng ký người dùng
export const signUpUser = async (data) => {
  const res = await axios.post(`${API_BACKEND_URL}/user/sign-up`, data);
  return res.data;
};

// Hàm lấy thông tin chi tiết người dùng
export const getDetailsUser = async (id, token) => {
  // console.log("token", token);
  const res = await axiosJWT.get(
    `${API_BACKEND_URL}/user/getdetail-user/${id}`,
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// Hàm refresh token
export const refresh_token = async () => {
  const res = await axios.post(`${API_BACKEND_URL}/user/refresh-token`, {
    withCredentials: true,
  });
  return res.data;
};
export const logout_user = async () => {
  const res = await axios.post(`${API_BACKEND_URL}/user/logout`);
  return res.data;
};

export const updateUser = async (id, data, token) => {
  const res = await axiosJWT.put(
    `${API_BACKEND_URL}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
