// [Shop component]
//   dispatch(fetchCategoriesStartAsync())  -->  // calls thunk function and not dispatching any action
//     thunk runs async code inside itself
//       dispatch(fetchCategoriesStart())      --> sends "start" action to reducer
//       fetch data from API
//       dispatch(fetchCategoriesSuccess())    --> sends "success" action to reducer
