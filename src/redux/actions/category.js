import { ACTION_STRING } from "./actionString";
import { getAllCategoryApi } from "../../utils/https/category";

export const getCategoryAction = () => {
  return {
    type: ACTION_STRING.dataCategory,
    payload: getAllCategoryApi(),
  };
};
