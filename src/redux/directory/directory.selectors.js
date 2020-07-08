import { createSelector } from "reselect";

const selectDirectory = (state) => state.directory;

// We select tthe part of the directory that we want
export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
