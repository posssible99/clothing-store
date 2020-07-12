import React from "react";
import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/original.svg";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

// This is how we give data to a component with redux. It returns a object with the data we need, and it give it to the component as a prop properties.
// multiple destructuring
// With createStructuredSelector,we dont need to pass the state in each property.
const mapStateToProps = createStructuredSelector({
  // state is from the rooter-reducer
  // This is the property we are searching for header
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// We use connect when we need properties from the reducers, it returns a Higher order component
export default connect(mapStateToProps)(Header);
