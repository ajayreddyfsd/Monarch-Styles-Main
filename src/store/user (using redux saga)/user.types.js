// All possible action types for the "user" part of global state

export const USER_ACTION_TYPES = {
  // Directly set the current user in the global state (no async needed)
  SET_CURRENT_USER: "user/SET_CURRENT_USER",

  // Check if a user is already logged in via existing Firebase session (async)
  //! when do we need this? say user closed the browser and opened it again,
  //! we will check if we have any existing session and set the current user accordingly
  CHECK_USER_SESSION: "user/CHECK_USER_SESSION",

  // --- Google Sign-In flow ---
  // Start Google sign-in process (async)
  GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
  // Sign-in with Google successful
  SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
  // Sign-in with Google failed
  SIGN_IN_FAILED: "user/SIGN_IN_FAILED",

  // --- Email/Password Sign-In flow ---
  // Start email/password sign-in process (async)
  EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
  //! SUCCESS and FAILED for this are shared above (SIGN_IN_SUCCESS / SIGN_IN_FAILED)

  // --- Sign-Up flow ---
  // Start sign-up process (async)
  SIGN_UP_START: "user/SIGN_UP_START",
  // Sign-up successful (but user still needs to be signed in after this)
  SIGN_UP_SUCCESS: "user/SIGN_UP_SUCCESS",
  // Sign-up failed
  SIGN_UP_FAILED: "user/SIGN_UP_FAILED",

  // --- Sign-Out flow ---
  // Start sign-out process (async)
  SIGN_OUT_START: "user/SIGN_OUT_START",
  // Sign-out successful
  SIGN_OUT_SUCCESS: "user/SIGN_OUT_SUCCESS",
  // Sign-out failed
  SIGN_OUT_FAILED: "user/SIGN_OUT_FAILED",
};
