import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch } from "react-redux";
import { signOutStart } from "../../store/user/user.action";

import "./navigation.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  //getting the user auth status from the stored global context
  const currentUser = useSelector(selectCurrentUser);
  console.log("currentUser", currentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  let dispatch = useDispatch();

  return (
    //these are just a group of links
    //first one is an image based link for the logo
    //second and third are the usual internal navigation links
    //we are using Link tag instead of a-tag as that is recommended in react for smooth internal transitions
    //finally we have put outlet tag, coz we need this component on all the webpages.
    //so we use this component as nested route and we need to tell the children routes
    //where they are supposed to go in the parent route
    <Fragment>
      <div className="navigation">
        {/* the first one is an image based link */}
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/home">
            HOME
          </Link>
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {/* if we have any current user in the global context,
          we will display sign-out. if no current user, we will display sign-in and sign-up,
          for the user to sign-in or sign-up*/}
          {currentUser ? (
            <Link
              className="nav-link"
              to="/sign-out"
              //! onClick={dispatch(signOutStart)} is a problem, pass as anonymous function
              //? what about cart clearing, we have taken that part in cart-reducer by specifying case for user-sign-out
              onClick={() => dispatch(signOutStart())}
            >
              SIGN OUT
            </Link>
          ) : (
            <div>
              <Link className="nav-link" to="/sign-in">
                SIGN IN
              </Link>
              <Link className="nav-link" to="/sign-up">
                SIGN UP
              </Link>
            </div>
          )}

          {/* this is a simple component showing an image and an item-count at its centre, styled that way */}
          <CartIcon />
        </div>
        {/* below we are displaying the card dropdown menu, but only when the cart is open, which we get to know from the global card comtext */}
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

//!: also, why no component imports in the navigation comp, how do the Link tags work w/o component imports

//!: Link tag must have to attr set, or else error
//!: if u wanna use Link-tag without to-attr, then use span-tag with onClick-attr
