import { createContext, useReducer, useContext } from "react";

//! utility functions
//! utility functions
//! utility functions
// Utility function - 1
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Utility function - 2
const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// Utility function - 3
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

//! utility functions
//! utility functions
//! utility functions

// Initial State
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemCount: 0,
  cartTotal: 0,
};

// Action Types
const CART_ACTION_TYPES = {
  // This one handles whatever related to the cart items as a whole:
  // - add item to cart
  // - remove item from cart
  // - clear item from cart
  // - update cart count
  // - update cart total
  SET_CART_ITEMS: "SET_CART_ITEMS",

  // This controls whether the cart dropdown is open or closed
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

// Reducer function for the cart
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled action type: ${type} in cartReducer`);
  }
};

// Cart Context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0,
  cartTotal: 0,
});

// Cart Context Wrapper
export const CartProvider = ({ children }) => {
  //! useReducer is next level of useState
  //! if i had to manage this state using useState, i had to manage four
  //! now i can manage all the four using a single using useReducer
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartItemCount, cartTotal } = state;

  //! this is the one thats actually calling dispatch, which internally calls reducer and changes the state
  //todo: only for the state action - SET_CART_ITEMS
  const updateCartState = (newCartItems) => {
    let newCartItemCount = 0;
    let newCartTotal = 0;

    for (const cartItem of newCartItems) {
      newCartItemCount += cartItem.quantity;
      newCartTotal += cartItem.quantity * cartItem.price;
    }

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartItemCount: newCartItemCount,
        cartTotal: newCartTotal,
      },
    });
  };

  //! Helper function to add an item to the cart.
  // It grabs the current cartItems from the above destructured state,
  // adds the specified product, and then calls updateCartState,
  // which internally dispatches the action to update the current state via the payload.
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartState(newCartItems);
  };

  //! Helper function to remove an item from the cart.
  // It grabs the current cartItems from the above destructured state,
  // removes the specified product, and then calls updateCartState,
  // which internally dispatches the action to update the current state via the payload.
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartState(newCartItems);
  };

  //! Helper function to remove an item from the cart.
  // It grabs the current cartItems from the above destructured state,
  // removes the specified product, and then calls updateCartState,
  // which internally dispatches the action to update the current state via the payload.
  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartState(newCartItems);
  };

  //! this is the one thats actually calling dispatch, which internally calls reducer and changes the state
  //todo: only for the state action - SET_IS_CART_OPEN
  const toggleCartOpen = () => {
    dispatch({
      type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
      payload: !isCartOpen,
    });
  };

  //final value creation
  const value = {
    ...state,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    toggleCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

//! although this is reducer based context state management
//! still we wrap the index.js around the cart wrapper in the same way
