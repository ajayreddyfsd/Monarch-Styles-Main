import { createContext, useState, useEffect } from "react";
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils.js";

import SHOP_DATA from "../shop-data.js";

// basic context and its wrapper
export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategoriesMap: () => null,
});

// make the above context values into state, initialize, and pass
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  //! fetch docs from Firestore, then pass it to context and pass it to children, so everyone can use locally
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap);
    };
    fetchCategories();
  }, []);

  const value = { categoriesMap, setCategoriesMap };

  //! one-time: to populate the collection in FirestoreDB
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

// wrap the context in 2 places for it to work:
// 1. in index.js (around App)
// 2. in App.js (around routes)

// if wrapping multiple contexts: order matters only if they depend on each other

//! example structure of categoryMap
// categoryMap = {
//   hats: [
//     { id: 1, name: "Beanie", price: 20 },
//     { id: 2, name: "Fedora", price: 30 }
//   ],
//   sneakers: [
//     { id: 3, name: "Air Max", price: 120 },
//     { id: 4, name: "Converse", price: 80 }
//   ],
//   jackets: [
//     { id: 5, name: "Leather Jacket", price: 250 },
//     { id: 6, name: "Denim Jacket", price: 150 }
//   ]
// };
