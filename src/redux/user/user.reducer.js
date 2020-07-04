// Change the string to another file, only because we want to avoid type errors
import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

// Everytime state is undefined,is going to have the value of null(this occurs when the user visits for the first time the page).
const userReducer = (state = INITIAL_STATE, action) => {
  // action have two properties, type and payload
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      // WE need to return an object beacuse if not it will not rerender
      return {
        // We give it all the properties that the state have before.
        ...state,
        // WE change the property that the action changes
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
