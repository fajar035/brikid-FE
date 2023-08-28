import { ACTION_STRING } from "../actions/actionString";

const initialState = {
  isLoading: false,
  search: "",
};

const loadingReducer = (prevState = initialState, action) => {
  const { onLoading, offLoading, search } = ACTION_STRING;
  switch (action.type) {
    case search:
      return {
        ...prevState,
        search: action.payload,
      };
    case onLoading:
      return {
        ...prevState,
        isLoading: true,
      };
    case offLoading:
      return {
        ...prevState,
        isLoading: false,
      };
    default: {
      return prevState;
    }
  }
};

export default loadingReducer;
