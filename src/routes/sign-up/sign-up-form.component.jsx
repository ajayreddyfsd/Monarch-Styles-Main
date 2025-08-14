import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../../components/form-input/form-input.component";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signUpWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { signUpStart, googleSignInStart } from "../../store/user/user.action";

import "./sign-up-form.styles.scss";

//this is for initial state initialization
//instead of tracking all expected state variables individually,
//we just grouped them as a single state object
//below are initial values to that state object
//also below are the initial values to the respective input tags as well once the component is mounted
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  //state assignment and initialization
  const [formFields, setFormFields] = useState(defaultFormFields);
  const dispatch = useDispatch();

  //destructuring the formField key-values into seperate variables
  //why? to set the initial values for the input tags once the form is live
  const { displayName, email, password, confirmPassword } = formFields;

  //to reset the form back to its initial values
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //for signups using google
  const signUpWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  //only for new sign-ups
  //below method checks if the email in the db or not
  //if doesnt exist, puts the user data into the db and resets the form
  //if exists, gives error
  //goes into the form tag
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  //this method to collect that user entered data from each input tag seperately
  //goes into each of the input tags
  const handleChange = (event) => {
    const { name, value } = event.target;

    //need to spread and update
    //if done setFormFields({ [name]: value }), we assign a new object which has only single KV pair;
    setFormFields({ ...formFields, [name]: value });

    console.log("formFields", formFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      {/* simple form using imported input and button tags instead of the usual ones */}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        {/* 2 options for the user to sign-up
        normal sign-up and sign-up through google */}
        <div className="buttons-container">
          <Button type="submit">Sign Up</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signUpWithGoogle}
          >
            Sign Up With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;

//Todo: why different button types and why different submission types and how we know which one to use
//todo: answer in misc-folder of react notes
