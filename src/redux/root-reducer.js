import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

export default combineReducers({
  // this is the state, we need to specify a reducer for each property.
  user: userReducer,
});
