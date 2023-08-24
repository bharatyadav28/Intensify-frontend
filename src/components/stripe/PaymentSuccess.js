import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import classes from "./stripe.module.css";
import getSearchParams from "../../utlils/getSearchParams";
import { useClearCartMutation } from "../../store/apis/cart-api";
import { notifyError } from "../../utlils";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [clearCart, results] = useClearCartMutation();

  useEffect(() => {
    const { searchParams, paramValue: paymentIntentId } = getSearchParams({
      location: location,
      paramKey: "payment_intent",
    });

    const orderId = searchParams.get("orderId");

    const orderSuccess = async () => {
      const response = await axios({
        url: `/api/v1/orders/${orderId}`,
        method: "PATCH",
        data: {
          paymentIntentId: paymentIntentId,
        },
      });

      clearCart();
    };
    try {
      orderSuccess();
    } catch (error) {
      notifyError(error);
    }
  }, []);

  const handleClick = () => {
    navigate("/mylearning");
  };
  return (
    <div className="d-flex flex-column  justify-content-center align-items-center mt-5 mb-5">
      <div className="fw-bolder">
        <h1>Order successful</h1>
      </div>
      <div className={classes.success}>
        <button className="p-2 rounded mt-2" onClick={handleClick}>
          Go to my learnings
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
