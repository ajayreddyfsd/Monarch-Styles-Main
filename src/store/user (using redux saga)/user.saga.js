import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

//? helper sagas start
//? helper sagas start
//? helper sagas start
//? helper sagas start
//? helper sagas start

//! this helper saga, takes in userAuth object as input
//! checks if it exist in the firestoreDB and fetches the userSnapshot (or)
//! creates new user doc in the firestoreDB and fetches the userSnapshot
//! Then dispatches either signInSuccess (with user data) or signInFailed if an error happens.
//! The dispatched action updates the global-Redux-user-state accordingly.
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    console.log("userSnapshot", userSnapshot.data());

    //need to extract id and data or else, we gonna end up putting documentsnapshot in the user part of global redux state
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

//! This helper saga calls the appropriate Firebase util function to sign in the user (Google popup or email/password).
//! and Firebase returns a userAuth object upon successful sign-in.
//! This userAuth object is passed to getSnapshotFromUserAuth, which:
//! Creates user doc in firestore if it did not exist or fetches the user document from Firestore it it already exists,
//! Then dispatches either signInSuccess (with user data) or signInFailed if an error happens.
//! The dispatched action updates the global-Redux-user-state accordingly.
export function* signInWithGoogle() {
  try {
    const { user: userAuth } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

//! This helper saga calls the appropriate Firebase util function to sign in the user (Google popup or email/password).
//! and Firebase returns a userAuth object upon successful sign-in.
//! This userAuth object is passed to getSnapshotFromUserAuth, which:
//! Creates user doc in firestore if it did not exist or fetches the user document from Firestore it it already exists,
//! Then dispatches either signInSuccess (with user data) or signInFailed if an error happens.
//! The dispatched action updates the global-Redux-user-state accordingly.
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user: userAuth } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

//! this helper saga checks if we have any current user using getCurrentUser()
//! and gets the usersnapshot if we have one, or else returns quietly
//! if error, then signInFailed
//? why cant we check if we have current user from redux-global-state
//? we can do that too, as we have redux-persist installed, but we are doing this for the 'just in case' case
//? in case we lost the session data, or we have an expired-session-data or the session has been revoked by backend
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

//! simple signup by calling apt firebase util func
//! and dispatch actions accordingly
//! but what about storing this new user into firestore db
//! we will do this in next helper-saga-func "signInAfterSignUp"
//? why? in sep step, coz we wanna store only if signup is success only
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

//! this is purely to store the above new user into firestore db when we saga-listener hears the sign-up-success action-type
export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

//! simple signout helper saga dispatching actions accordingly
export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* getUserDetails({ payload: user }) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, user.id);
    if (userSnapshot && userSnapshot.exists()) {
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } else {
      console.error("User snapshot is null or does not exist");
    }
  } catch (error) {
    yield put(signInFailed(error));
  }
}

//? helper sagas end
//? helper sagas end
//? helper sagas end
//? helper sagas end
//? helper sagas end

//? saga listeners start
//? saga listeners start
//? saga listeners start
//? saga listeners start
//? saga listeners start

//! saga listeners listening to specific actions,
//! which when listened, runs the specified saga-helper-functions
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignInSuccessGetUserDetails() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_SUCCESS, getUserDetails);
}

//? saga listeners end
//? saga listeners end
//? saga listeners end
//? saga listeners end
//? saga listeners end

//! initiating all the above saga based generator function listeners
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onSignInSuccessGetUserDetails), // EXTRA watcher
  ]);
}
