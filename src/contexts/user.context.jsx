// This code creates a React Context for storing user information (currentUser) globally in your app

import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//this the context or global storage box that we created
//stores currentUser, for now it is null
//setCurrentUser is the method to update the currentUser, for now it is a dummy method
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

//this is like any other react component
//but this component helps in passing the context data to all the other components without prop drilling
//we call this as the - Context Wrapper Component
//after creating this, we need to wrap App.js inside this CWC in the index.js file
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // When the app loads, this sets up a listener to watch for changes in the user's auth status.
  // If the user logs in or logs out, we update currentUser in our context.
  // This keeps the whole app in sync with the user's login state.
  // the below function and the OAuth in firebase util work hand in hand to track auth state and maintain it globally
  // instead of tracking it everywhere, we will track at one centralized place
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe; // Clean up the listener when the component unmounts
  }, []);

  //this is the heart
  //which lets data accessible to all the other components
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
