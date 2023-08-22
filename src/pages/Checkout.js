import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";

import StripeForm from "../components/stripe/StripeForm";
import { useGetCartItemsQuery } from "../store/apis/cart-api";
import classes from "../components/stripe/stripe.module.css";

const stripePromise = loadStripe(
  "pk_test_51NhOsHSINb5GQ4NYB02Xp7VI9JReCB6DZVKmIwa310oiOT5AdjtY28yungWAfrX0QILmpDDQYGH3IhZxJMVKsr8k00hgJKJtJa"
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const { data } = useGetCartItemsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    fetch("/api/v1/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId: data.cart._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderId(data.order._id);
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={classes["stripe-div"]}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeForm orderId={orderId} />
        </Elements>
      )}
    </div>
  );
}
