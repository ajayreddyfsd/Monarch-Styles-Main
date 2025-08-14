import { CART_ACTION_TYPES } from "./cart.types";
import { USER_ACTION_TYPES } from "../user/user.types";

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    //! once user signs out we will clear the cart as well
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return CART_INITIAL_STATE; // reset cart on sign out

    default:
      return state;
  }
};
