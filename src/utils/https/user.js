import axios from "axios";

export const getUserIdApi = (token, id) => {
  const URL = process.env.REACT_APP_HOSTDEPLOY + `/users/${id}`;
  return axios.get(URL, { headers: { "x-access-token": token } });
};

export const updateUserApi = (body, token) => {
  const URL = process.env.REACT_APP_HOSTDEPLOY + "/users/update";
  return axios.patch(URL, body, { headers: { "x-access-token": token } });
};
