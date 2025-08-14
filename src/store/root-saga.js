// like we combined all those different reducers into one inside root-reducer
// we also combine all the sagas that we have into one inside the root-saga

//call to call sagas and all to run all of them parallely like Promise.all()
import { all, call } from "redux-saga/effects";

//this is one of the saga files that we wrote in store/categories
import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";

//this is the root saga function
//calls all the sepcified sagas and runs them parallely and yields results,
//coz saga is a generator in first place
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}

//? why * after function, coz its generator and this is js way of writing this.

//? above code has only one saga, this is how code looks like to combine multiple sagas
// export function* rootSaga() {
//   yield all([call(categoriesSaga), call(userSaga), call(cartSaga)]);
// }
