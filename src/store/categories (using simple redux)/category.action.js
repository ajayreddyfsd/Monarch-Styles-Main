import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategories = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);

//! same as above but without createAction
// export const setCategories = (categoriesArray) => {
//   return {
//     type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
//     payload: categoriesArray,
//   };
// };