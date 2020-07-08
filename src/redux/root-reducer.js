import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import { persistReducer } from "redux-persist";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
// if we want to use session storage, we can use import {sessionStorage} from "..."

// This is for using the local storage.
import storage from "redux-persist/lib/storage";

const persistConfig = {
  // We indicate where we eant to start.
  key: "root",
  // We indicate that we want localstorage
  storage,
  // We indicate what part of the store we want to save in the localStorage of the browser
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  // this is the state, we need to specify a reducer for each property.
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// This returns a state(rootReducer) with persistence capabilities, according to the persistConfig(we use it in the store file)
export default persistReducer(persistConfig, rootReducer);
