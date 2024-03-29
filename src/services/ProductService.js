import axios from "axios";
const API_BACKEND_URL = "http://localhost:8080/api/product";
export const axiosJWT = axios.create();

export const getAllProduct = async (search, limitProduct) => {
  let url = `${API_BACKEND_URL}/getall-product`;

  if (search && search.length > 0) {
    url += `?filter=name&filter=${search}&limit=${limitProduct}`;
  }

  try {
    const response = await axios.get((url += `?limit=${limitProduct}`));
    return response.data;
  } catch (error) {
    console.error("Error while fetching products:", error);
    return null; // or handle error in your application logic
  }
};

export const createProduct = async (data) => {
  const res = await axios.post(`${API_BACKEND_URL}/create-product`, data);
  return res.data;
};
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_BACKEND_URL}/delete-product/${id}`);
  return res.data;
};
export const deleteProductMany = async (data, token) => {
  const res = await axios.post(`${API_BACKEND_URL}/deleteMany-product`, data, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(`${API_BACKEND_URL}/getdetails-product/${id}`);
  return res.data;
};
export const updateProduct = async (id, data, token) => {
  const res = await axios.put(`${API_BACKEND_URL}/update-product/${id}`, data, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAllTypeProduct = async () => {
  const res = await axios.get(`${API_BACKEND_URL}/getalltype-product`);
  return res.data;
};
