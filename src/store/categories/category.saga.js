//! usually we have 4 files inside each right, now we have 5 files.
//! action, reducer, selector, types, and saga

//~ saga 101
//~ we use yield and call for calling async functions, instead of calling them directly
//~ also no need to use await as well, coz its built-in into the yield and call
//~ we use yield and put for dispatching instead of dispatch()
//~ everything else is same as thunk
//! also, we still need the category.action.js file, coz we will be using its functions inside this saga file

import { takeLatest, call, put, all } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

// same as thunk code, but we have put yield and call instead of calling directly and awaiting
// same as thunk code, but we have put yield and put instead of dispatch()
export function* fetchCategoriesAsync() {
  try {
    //getting the desired array from the firestoreDB
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");

    //dispatches this action-creator-function, which inturn passes an action-object to the reducer
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    //dispatches this action-creator-function, which inturn passes an action-object to the reducer
    yield put(fetchCategoriesFailure(error));
  }
}

// takeLatest	Listens for a specific action.
// If that action is fired many times in a row, only the latest one is run (it cancels all the previous ones).
//! this function is a listener,
//! which keeps listening for the action type FETCH_CATEGORIES_START
//! and when it listens, it runs the async func and takes it from there on
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// initiating the above saga function generator,
// if we had multiple such ones in this file, we simply had put everything inside call() and all()
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
