import { ACTION_STRING } from "./actionString";

export const onLoadingAction = () => {
  return {
    type: ACTION_STRING.onLoading,
  };
};

export const offLoadingAction = () => {
  return {
    type: ACTION_STRING.offLoading,
  };
};
