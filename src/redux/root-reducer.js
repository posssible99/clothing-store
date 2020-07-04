import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
  // this is the state, we need to specify a reducer for each property.
  user: userReducer,
  cart: cartReducer,
});
