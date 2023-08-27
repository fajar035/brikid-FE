import axios from "axios";
import { encodeQueryData } from "../helpers/urlParams";
const BASE = import.meta.env.VITE_APP_HOSTDEPLOY;

export const getAllProductsApi = (params) => {
  const url = `${BASE}/products?${encodeQueryData(params)}`;

  return axios.get(url);
};

export const getProductDetailApi = (id) => {
  const url = `${BASE}/products/${id}`;

  return axios.get(url);
};

export const updateProductApi = (id, body, token) => {
  const url = `${BASE}/products/update/${id}`;

  return axios.patch(url, body, { headers: { "x-access-token": token } });
};

export const addProductApi = (body, token) => {
  const url = `${BASE}/products`;

  return axios.post(url, body, { headers: { "x-access-token": token } });
};

export const deleteProductApi = (id, token) => {
  const url = `${BASE}/products/${id}`;

  return axios.delete(url, { headers: { "x-access-token": token } });
};
