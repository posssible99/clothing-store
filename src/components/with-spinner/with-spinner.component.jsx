import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

// We pass the compnent.(this is like curryng)
// We do this beacuase we want to return a component depending on the isLoading value that is specified in the component.
// This is call a HOC(Higher order component)
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
