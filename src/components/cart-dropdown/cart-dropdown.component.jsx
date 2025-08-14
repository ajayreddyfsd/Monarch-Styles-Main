import React from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

//there are three components
//cart-icon, cart-dropdown, cart-item
//cart-icon is what is displayed on the webpage once user signs in
//cart-dropdown is shown is when user clicks the cart icon, in a toggling way
//cart-item is the item that does into cart dropdown
const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    //! Why not call useNavigate() directly here?
    //! Because of React Hooks Rule #1:
    //! Hooks must be called at the top level of a component, not inside nested functions or conditionals.
    //! That's why we call useNavigate() once at the top of the component,
    //! and then use the navigate function inside this handler when needed.

    //! Also, why not just use a <Link> tag?
    //! If you only need simple internal navigation, use a <Link to="..."> — it's clean and declarative.
    //! But if you need to perform logic or side effects (e.g., check cart, track event) before navigating,
    //! then define a function like this and use navigate() programmatically.

    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => {
          return <CartItem cartItem={cartItem}></CartItem>;
        })}
      </div>
      {/* button to take you to checkout page */}
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
