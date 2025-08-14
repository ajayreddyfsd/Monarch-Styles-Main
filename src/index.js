import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { UserProvider } from "./contexts/user.context";
// import { CategoriesProvider } from "./contexts/categories.context";
// import { CartProvider } from "./contexts/cart.context";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import { Elements } from "@stripe/react-stripe-js"; //!wrapper needed for stripe to work
import { stripePromise } from "./utils/stripe/stripe.utils"; //!needed for stripe to work

const rootElement = document.getElementById("root");

// UserProvider is the context wrapper component used for the context,
// we need to wrap the whole App.js inside this UserProvider component,
// why? so that context's global data can be accessed by all the other components
// same with ProductsProvider
render(
  //wrapping in routers
  //and
  //wrapping inside the created global contexts
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            {/* <UserProvider> */}
            {/* <CategoriesProvider> */}
            {/* <CartProvider> */}
            <App />
            {/* </CartProvider> */}
            {/* </CategoriesProvider> */}
            {/* </UserProvider> */}
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);

//! Provider wrapper is from the redux
// all other providers like user, categories, cart are no longer needed coz we have reducers for them
// and all are wrapped inside <Provider></Provider> wrapper of Redux

//! PersisteGate wrapper is from redux-persist

//!Elements is the wrapper needed for stripe to work
