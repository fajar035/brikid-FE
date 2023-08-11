import axios from "axios";

const BASE = import.meta.env.VITE_APP_HOSTDEPLOY;
console.log("BASE : ", BASE);

export const loginApi = (body) => {
  const url = BASE + "/auth/login";
  return axios.post(url, body);
};

export const registerApi = (body) => {
  const url = BASE + "/auth/register";
  return axios.post(url, body);
};

export const logoutApi = (token) => {
  const url = BASE + "/auth/logout";
  return axios.delete(url, { headers: { "x-access-token": token } });
};
