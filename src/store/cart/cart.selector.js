//! Each selector function usually returns one of the variables in the global state object.
//! Each selector function usually returns one of the variables in the global state object.
//! Each selector function usually returns one of the variables in the global state object.
//! Each selector function usually returns one of the variables in the global state object.
//! Each selector function usually returns one of the variables in the global state object.
//! Each selector function usually returns one of the variables in the global state object.

//importing the create selector
import { createSelector } from "reselect";

//here we are just extracting the whole cart object
const selectCartReducer = (state) => state.cart;

//! here we are extracting the items (isCartOpen) inside the cart object
//! but we are working with the whole cart object, so we passed selectCartReducer
//! also, each of the createSelector functions are memoized, so they will only run if the input changes
//! and they return a new selector function, which is memoized
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

//! here we are extracting the items (cartItems) inside the cart object
//! but we are working with the whole cart object, so we passed selectCartReducer
//! also, each of the createSelector functions are memoized, so they will only run if the input changes
//! and they return a new selector function, which is memoized
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

//! here, we are calculating some info from the cartItems inside the cart object
//! thats why we passed selectCartItems
//! so pass based on what your working with, the whole reducer-object or on the things inside the reducer-object
//! also, each of the createSelector functions are memoized, so they will only run if the input changes
//! and they return a new selector function, which is memoized
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

//! here, we are calculating some info from the cartItems inside the cart object
//! thats why we passed selectCartItems
//! so pass based on what your working with, the whole reducer-object or on the things inside the reducer-object
//! also, each of the createSelector functions are memoized, so they will only run if the input changes
//! and they return a new selector function, which is memoized
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

//! state looks like this
// const state = {
//   cart: {
//     isCartOpen: false,
//     cartItems: [
//       { id: 1, name: "Shoe", price: 100, quantity: 2 },
//       { id: 2, name: "Hat", price: 50, quantity: 1 },
//     ],
//   },
// };

//! so how use inside components
//! simple! import useSelector and one of the abpve selector functions, and use the value directly
// const x = useSelector(selectCartCount);
