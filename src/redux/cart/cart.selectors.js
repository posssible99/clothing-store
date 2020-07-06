import { createSelector } from "reselect";

// input selector, only takes a little peace of the state
const selectCart = (state) => state.cart;

// Since here, it goes more particular

export const selectCartItems = createSelector(
  // Array of input selectors
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// This function starts in selectCart, remember taht in the other files we pass the state.
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);

// I think in this file we take some pieces of the state, that we can use in another file.
//! Remember, we use memoization or cache.
// ! We use memoization because we dont want our component to render multiple times if the value didn't change.It saves us performance
