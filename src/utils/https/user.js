import axios from "axios";
const BASE = import.meta.env.VITE_APP_HOSTLOCAL;
export const getUserIdApi = (token, id) => {
  const URL = BASE + `/users/${id}`;
  return axios.get(URL, { headers: { "x-access-token": token } });
};

export const updateUserApi = (body, token) => {
  const URL = BASE + "/users/update";
  return axios.patch(URL, body, { headers: { "x-access-token": token } });
};
