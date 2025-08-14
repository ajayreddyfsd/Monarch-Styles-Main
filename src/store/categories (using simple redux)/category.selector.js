import { createSelector } from "reselect";

//extracting just the categories object and not things inside it
const selectCategoryReducer = (state) => state.categories;

//extracting the inside of categories object
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

//using the inside contents of categories object, we are doing something
// takes the array of category objects and turns it into an object
// [ {}, {}, {}, ... ] to { .., .., .., ....}
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    if (!Array.isArray(categories)) return { 1: 1 }; // safeguard

    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

//! this is how global state looks like
// {
//   user: { ... },
//   cart: { ... },
//   categories: {
//     isLoading: false,
//     categories: [ { title: "Hats", items: [...] }, ... ]
//   }
// }
