import { ACTION_STRING } from "../actions/actionString";
import { ActionType } from "redux-promise-middleware";

const initialstate = {
  data: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
};

const categoryReducer = (prevState = initialstate, action) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { dataCategory } = ACTION_STRING;

  switch (action.type) {
    case dataCategory.concat("_", Pending):
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    case dataCategory.concat("_", Rejected): {
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };
    }

    case dataCategory.concat("_", Fulfilled): {
      const data = action.payload.data.result;
      const newPropery = { id: 0, name: "" };
      data.unshift(newPropery);

      return {
        ...prevState,
        isPending: false,
        isRejected: false,
        isFulfilled: true,
        data,
      };
    }

    default:
      return prevState;
  }
};

export default categoryReducer;
