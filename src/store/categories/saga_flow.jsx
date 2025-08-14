// [Shop component]
//   dispatch(fetchCategoriesStart())  -->  // dispatches plain action object which is listened by saga middleware
//     saga middleware listens for 'FETCH_CATEGORIES_START'
//       saga runs fetchCategoriesAsync generator function
//       saga calls API using `call()`
//       saga dispatches fetchCategoriesSuccess() using `put()`

//! so, while using saga, we put two things
//! no.1 useEffect() in the component
//! no.2 saga listener in the saga file which listens for a specific action type
