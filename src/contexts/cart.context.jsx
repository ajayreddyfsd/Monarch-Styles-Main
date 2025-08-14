import { createContext, useState, useEffect } from "react";

//! we have 3 functions below
//! addCartItem - adds items or incs qty
//! removeCartItem - removes item or decs qty
//! clearCartItem - removes item

// this is the complete 'add to cart' functionality
// returns updated cart items
export const addCartItem = (cartItems, productToAdd) => {
  let cartItemsUpdated = null;

  // Check if the product to add already exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // If the product exists, return a new array with the matching item's quantity increased by 1
  // Other items remain unchanged

  // We use map to create a new array based on cartItems without mutating the original array
  // For each item, if the id matches productToAdd.id, return a new object with quantity increased by 1
  // Otherwise, return the item as is
  // This way, we get a new array with only the matching item updated and others untouched

  // cartItems.map((cartItem) => cartItem) return the array with same cart items,
  // but here we are changing only one item with some condition. thats it
  if (existingCartItem) {
    cartItemsUpdated = cartItems.map(
      (cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // increase quantity for matching item
          : cartItem // leave other items as they are
    );

    return cartItemsUpdated;
  }

  productToAdd = { ...productToAdd, quantity: 1 };
  cartItemsUpdated = [...cartItems, productToAdd];
  // If the product is not in the cart, add it with a quantity of 1
  return cartItemsUpdated;
};

//! in the above function, why dont we just extract the item by id, edit it and then add it back to same place where it belongs?
//! coz, changing the original array directly wont render changes, and makes code less declarative, breaking one of react's rules
//! so mutating through array methods is the safe and preferred method

//! removeCartItem - removes item or decs qty
const removeCartItem = (cartItems, cartItemToRemove) => {
  //get that item from the cart, check its qty, if its one, remove item from the cart, if its not one, decrease the qty by 1
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

//! clearCartItem - removes item
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

//! below is the context code
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  setCartItems: () => null,
  cartItemCount: 0,
  setCartItemCount: () => null,
  cartTotal: 0,
  setCartTotal: () => null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0); //for total item count
  const [cartTotal, setCartTotal] = useState(0); //for total price

  // runs every time the cartItems array changes
  // and sets the correct cartItemCount
  useEffect(() => {
    let count = 0;
    for (const cartItem of cartItems) {
      count += cartItem.quantity;
    }
    setCartItemCount(count);
  }, [cartItems]);

  // runs every time the cartItems array changes
  // and sets the correct total price
  useEffect(() => {
    let totalPrice = 0;
    for (const cartItem of cartItems) {
      totalPrice += cartItem.quantity * cartItem.price;
    }
    setCartTotal(totalPrice);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const removeItemFromCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

  const clearItemFromCart = (cartItemToClear) =>
    setCartItems(clearCartItem(cartItems, cartItemToClear));

  // Preparing the value object
  // why used addItemToCart instead of setCartItems
  // setCartItems is critical, people can misuse and change cart items
  // so adding here its reflection
  //! added remove, clear
  //! did not add setCartTotal, coz users might change the total price
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemCount,
    setCartItemCount,
    cartTotal,
    removeItemFromCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

//! final, most forgotten step
//! wrapping it around in index.js, wrapping in app.js is not required
//! also if multiple contexts are there, order of wrapping in index.js also matters

//! The object passed to createContext here is just a default value
// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => null,
//   cartItems: [],
//   setCartItems: () => null,
//   cartItemCount: 0,
//   setCartItemCount: () => null,
//   cartTotal: 0,
//   setCartTotal: () => null,
// });

//! This is only used if a component consumes the context without being wrapped in a Provider
//! The actual value shared in the app comes from the "value" prop inside CartProvider
//! That "value" object can have more or fewer properties than the default — and that's totally fine
// const value = {
//   isCartOpen,
//   setIsCartOpen,
//   cartItems,
//   addItemToCart,
//   cartItemCount,
//   setCartItemCount,
//   cartTotal,
//   removeItemFromCart,
//   clearItemFromCart,
// };

//! This allows us to expose only the functions and data we want components to use (like addItemToCart)
//! while hiding internal setters (like setCartItems) to keep state management safe and controlled
