import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { OvalSpinner } from "../UI/LoadingSpinner";
import classes from "./stripe.module.css";

export default function StripeForm({ orderId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentMethod } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/payment/success?orderId=${orderId}`,
        // return_url: `https://intensify-jet.vercel.app/payment/success?orderId=${orderId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id={classes["payment-form"]} onSubmit={handleSubmit}>
      <div className={classes.testing}>
        {" "}
        Card no. for testing : 4242 4242 4242 4242{" "}
      </div>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e?.target?.value)}
      />
      <PaymentElement
        id={classes["payment-element"]}
        options={paymentElementOptions}
      />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <OvalSpinner height={20} width={20} /> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div className={classes["payment-message"]}>{message}</div>}
    </form>
  );
}
