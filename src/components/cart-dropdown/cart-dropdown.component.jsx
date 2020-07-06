import React from "react";
import CustomButton from "../custom-button/custom-button.component";

import CartItem from "../cart-item/cart-item.component";
import { connect } from "react-redux";
import "./cart-dropdown.styles.scss";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {/* We generate a new array with the CartItem component for each element */}
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        // We do this because we dont want to show our cart when the car is in checkout. This is a good example of when use dispatch
        // in the component and dont create mapDispatchProps.
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

// With createStructuredSelector,we dont need to pass the state in each property.
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// withRouter gives to our component the property of history, it helps us to redirect a user.
export default withRouter(connect(mapStateToProps)(CartDropdown));
