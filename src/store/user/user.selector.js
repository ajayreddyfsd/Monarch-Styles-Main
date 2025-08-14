// although the state has all these, we only need selector to access currentUser
// if loading or error, they will set the current user accordingly to null or something
// const INITIAL_STATE = {
//   currentUser: null,
//   isLoading: false,
//   error: null,
// };

// Selector to get the currentUser from the Redux state
// `state` is the entire Redux-store's global state
export const selectCurrentUser = (state) => state.user.currentUser;
