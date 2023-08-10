import axios from "axios";
import { encodeQueryData } from "../helpers/urlParams";

export const getAllProducts = (params) => {
  const url = `${process.env.REACT_APP_HOSTDEPLOY}/products?${encodeQueryData(
    params
  )}`;

  return axios.get(url);
};
