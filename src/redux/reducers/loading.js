import { ACTION_STRING } from "../actions/actionString";

const initialState = {
  isLoading: false,
};

const loadingReducer = (prevState = initialState, action) => {
  const { onLoading, offLoading } = ACTION_STRING;
  switch (action.type) {
    case onLoading:
      return {
        isLoading: true,
      };
    case offLoading:
      return {
        isLoading: false,
      };
    default: {
      return prevState;
    }
  }
};

export default loadingReducer;
