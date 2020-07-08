import { createSelector } from "reselect";
// In the case we pass to parameters to our selector, we need memoize
import memoize from "lodash.memoize";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // This will return us an array that have in each element a collection(hats,jackets,etc)
  (collections) => Object.keys(collections).map((key) => collections[key])
);

// This function will return us the collection that have the same id as the collectionUrlParam
// createSelector returns another function
// This function will return us the collection that have the same id as the collectionUrlParam
// We need to use memoize because it return a function that need state, only for memoize this thing

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
);
