import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/original.svg";
import { connect } from "react-redux";

import "./header.styles.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="shop">
        SHOP
      </Link>
      <Link className="option" to="shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

// This is how we give data to a component with redux. It returns a object with the data we need, and it give it to the component as a prop properties.
const mapStateToProps = (state) => ({
  // state is from the rooter-reducer
  // This is the property we are searching for header
  currentUser: state.user.currentUser,
});

// We use connect when we need properties from the reducers, it returns a Higher order component
export default connect(mapStateToProps)(Header);
