import { FcSearch as SearchIcon } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import classes from "./CartPurchaseBar.module.css";

const EmptyCart = ({ desc }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  let info = desc ? desc : "Your cart is empty.";
  return (
    <div className="d-flex flex-column mt-5 align-items-center w-100 h-100 mb-5">
      <div>
        <SearchIcon size={100} />
      </div>

      <div className={classes.para}>
        <p>{info} Keep shopping to find a course!</p>
      </div>

      <div className={classes["shopping-btn"]}>
        <button className="pt-2 pb-2" onClick={handleClick}>
          Keep Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
