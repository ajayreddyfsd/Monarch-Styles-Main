import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
import SignIn from "./routes/sign-in/sign-in.component";
import SignUpForm from "./routes/sign-up/sign-up-form.component";
import SignOut from "./routes/sign-out/sign-out.component";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  //! the below code is like a watchman
  //? old code without using redux-saga
  //? old code without using redux-saga
  //? old code without using redux-saga
  //? old code without using redux-saga
  // ✅ When the app loads, starts watching the user login status.
  // ✅ If user logs in, save them to DB and Redux.
  // ✅ If user logs out, set Redux to null.
  // 🔄 Keep doing this forever — unless the app closes.
  // 🧹 And when the app closes, stop watching.
  // since we used empty array [] for dependency. runs only once when component mounts but watches till the app closes
  // or can put [dispatch] or []
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener(async (user) => {
  //     if (user) {
  //       await createUserDocumentFromAuth(user);
  //     }
  //     dispatch(setCurrentUser(user));
  //   });

  //   return unsubscribe;
  // }, []);

  //? new code, using redux-saga for user-folder
  //? new code, using redux-saga for user-folder
  //? new code, using redux-saga for user-folder
  //? new code, using redux-saga for user-folder
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route path="sign-out" element={<SignOut />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

// we wanna do this with shop route, so need to put /* in that route,
// also inside the shop component, we need to define routes
// one route for default component and other route for custom component
// http://localhost:3000/shop/
// http://localhost:3000/shop/hats/
// http://localhost:3000/shop/jackets/
// http://localhost:3000/shop/sneakers/
// http://localhost:3000/shop/mens/
