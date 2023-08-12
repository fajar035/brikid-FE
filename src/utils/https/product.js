import axios from "axios";
import { encodeQueryData } from "../helpers/urlParams";
const BASE = import.meta.env.VITE_APP_HOSTDEPLOY;
export const getAllProductsApi = (params) => {
  const url = `${BASE}/products?${encodeQueryData(params)}`;

  return axios.get(url);
};
