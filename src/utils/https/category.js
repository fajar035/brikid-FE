import axios from "axios";

// const host = process.env.REACT_APP_HOSTDEPLOY;
const host = "https://brikid-api.vercel.app";

export const getAllCategoryApi = () => {
  const url = `${host}/category`;

  return axios.get(url);
};
