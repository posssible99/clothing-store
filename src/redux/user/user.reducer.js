const INITIAL_STATE = {
  currentUser: null,
};

// Everytime state is undefined,is going to have the value of null(this occurs when the user visits for the first time the page).
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
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
