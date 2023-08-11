import axios from "axios";

const BASE = import.meta.env.VITE_APP_HOSTDEPLOY;

export const getAllCategoryApi = () => {
  const url = `${BASE}/category`;

  return axios.get(url);
};
