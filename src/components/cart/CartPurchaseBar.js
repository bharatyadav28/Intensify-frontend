import { useNavigate } from "react-router-dom";

import classes from "./CartPurchaseBar.module.css";

const CartPurchaseBar = ({ total, tax }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/payment");
  };
  return (
    <div className={classes.purchase}>
      <div>
        <div className={classes.total}>Total:</div>
        <div className={classes.cost}>
          <div className={classes.value}>₹{total}</div>{" "}
          <div className={classes.tax}>+ ₹{tax}</div>
        </div>
        <div className={classes.btn}>
          <button onClick={handleSubmit}>Checkout</button>
        </div>
      </div>
      <div>
        <div className={classes.promotion}>Promotions</div>
        <div className={classes.coupon}>
          <input type="text" placeholder="Enter Coupon" />
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default CartPurchaseBar;
