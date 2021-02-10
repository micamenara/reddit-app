import { StoreActions } from "store/types";

const postReducer = (state = {}, action: StoreActions) => {
  switch (action.type) {
    case "UPDATE_POST":
      return {
        ...action.post
      };

    default:
      return state;
  }
};

export default postReducer;
