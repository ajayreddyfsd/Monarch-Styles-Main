//? category action - written the thunk way
//? category action - written the thunk way
//? category action - written the thunk way


import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

//simple action-creator function returning the action-object
export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

//simple action-creator function returning the action-object
export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

//simple action-creator function returning the action-object
export const fetchCategoriesFailure = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

//? this is the redux-thunk function
//? this is the redux-thunk function
//? this is the redux-thunk function
//? this is the redux-thunk function
//? this is the redux-thunk function
//! this is where all the magic happens
// gets all the docs from firestoreDB and also dipatches all 3 action-creators
// ofcourse the dispatch is made available through the input argument
export const fetchCategoriesStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};

