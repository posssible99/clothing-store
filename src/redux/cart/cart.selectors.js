import { createSelector } from "reselect";

// input selector, only takes a little peace of the state
const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  // Array of input selectors
  [selectCart],
  (cart) => cart.cartItems
);

// This function starts in selectCart, remember taht in the other files we pass the state.å
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

// I think in this file we take some pieces of the state, that we can use in another file.
//! Remember, we use memoization or cache.
// ! We use memoization because we dont want our component to render multiple times if the value didn't change.
