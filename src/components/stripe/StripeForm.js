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
      return;
    }

    setIsLoading(true);

    let protocol = window.location.protocol;
    let hostname = window.location.hostname;

    if (hostname === "localhost") {
      hostname = "localhost:3000";
    }

    const { error, paymentMethod } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${protocol}//${hostname}/payment/success?orderId=${orderId}`,
      },
    });

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
