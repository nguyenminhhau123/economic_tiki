import axios from "axios";
const API_BACKEND_URL = "http://localhost:8080/api/order";
export const createOrder = async (data) => {
  const { token, ...rests } = data;
  const res = await axios.post(`${API_BACKEND_URL}/create`, rests, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  return res.data;
};
