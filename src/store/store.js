import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { thunk } from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

//! just logging in a detailed way, the action object, current state and the next state
const loggerMiddleware = (store) => (next) => (action) => {
  // if not action object, i.e., no {type, payload}
  // do not go to next
  if (!action.type) {
    return next(action);
  }

  // if there is action object {type, payload}
  // print necessary things and move it to next state
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

// initiating saga middleware
const sagaMiddleware = createSagaMiddleware();

// grouping all middlewares into a single array
// we can put multiple middlewares here.
// Example: logger, thunk, saga, etc.
//? u can put thunk or sagaMiddleware in the second part
const middleWares = [loggerMiddleware, sagaMiddleware];

// and then combine all of the middle wares in the middleWares array like this
// this, we gonna pass in create store, when we are creating redux stiore
const composedEnhancers = compose(applyMiddleware(...middleWares));

//! single aim of persist
//! so data can be saved to prevent from page-reloads / page-refreshes / browser-closings

const persistConfig = {
  // tells to save it in a file/folder called 'root'
  key: "root",

  // tells which storage to store in, options are localStorage, sessionStorage, indexedDB, ....
  storage,

  // say we have 3 reducer slices like cart, categories and user,
  // this is to tell store other two but not the user part
  blacklist: ["user"],
};

// we have our root reducer right! we are just upgrading it to persisted reducer,
// so data can be saved to prevent from page-reloads / page-refreshes / browser-closings
const persistedReducer = persistReducer(persistConfig, rootReducer);

// usually we create store using rootreducer right
// but here we are creating store using persistedReducer
// and since we have middlewares, we are passing those as well
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// telling it to start the root saga which starts all the sagas inside it
sagaMiddleware.run(rootSaga);

// and then we are upgrading the store as well from normal-redux-store to persisted-redux-store
export const persistor = persistStore(store);

//! important and most forgotten
// inside index.js, we need to wrap app.js with wrapper
// <PersistGate loading={null} persistor={persistor}>
// <App />
// </PersistGate>;

//! where to find the store file?
// inspect, application, storage, localStorage, file name = persist::root

//? say u wanna use thunk instead of saga, just pass thunk in the middlewares array
// const middleWares = [loggerMiddleware, sagaMiddleware];
