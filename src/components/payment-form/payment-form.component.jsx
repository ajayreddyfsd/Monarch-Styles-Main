//! this react component is responsible for stripe payments
//! this react component if responsible for stripe payments
//! this react component if responsible for stripe payments
//! this react component if responsible for stripe payments
//! this react component if responsible for stripe payments

import { useState } from "react"; //! to store component's local data
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; //! stripe's react components

import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector"; //! redux selectors imported
import { selectCurrentUser } from "../../store/user/user.selector"; // !redux selectors imported

import { FormContainer } from "./payment-form.styles"; //! styled comp - like form tag but with styles
import { PaymentButton, PaymentFormContainer } from "./payment-form.styles"; //! styled comps - like button-tag and div-tag but with styles
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

const PaymentForm = () => {
  const stripe = useStripe(); //! initializing stripe
  const elements = useElements(); //! initializing stripe's elements
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    //! if stripe is not loaded or stripe-elements are not loaded, then we cannot handle payment, so just return nothing
    if (!stripe || !elements) {
      return;
    }

    //! if both stripe and stripe-elements are loaded, we set state to true
    setIsProcessingPayment(true);

    //! first we are telling the serverless function on netlify that we wanna pay
    //! which then gives us a repsonse which has some secret_key
    //! using this, we make the actual payment in next step
    //? mention the correct path to the payment intent file
    const response = await fetch(
      "/.netlify/functions/create-payment-intent",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }),
      }
    ).then((res) => {
      return res.json();
    });

    //! extracting the secret from the response that we got
    const clientSecret = response.paymentIntent.client_secret;
    console.log("paymentIntent", response);

    //! using secret_key and card details, we are making the payment
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Yihua Zhang",
        },
      },
    });

    //! once payment done, doesnt matter success or failure, we just change the state to false
    setIsProcessingPayment(false);

    //! and display to the user accordingly if it was success or failure
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
      }
    }
  };

  return (
    //! basically a div and a form inside
    //? PaymentFormContainer is like the div-tag but with styles, it is a styled component
    //? FormContainer is like the form-tag but with styles, it is a styled component
    //?  and PaymentButton is like the button-tag but with styles, it is a styled component
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          isLoading={isProcessingPayment}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;
