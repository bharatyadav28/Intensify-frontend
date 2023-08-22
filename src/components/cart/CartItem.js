import {
  BsFillStarFill as Star,
  BsStarHalf as HalfStar,
  BsFillHandbagFill as PriceIcon,
  BsFillTrashFill as TrashIcon,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./CartItem.module.css";
import { useDeleteCartItemMutation } from "../../store/apis/cart-api";
import { OvalSpinner } from "../UI/LoadingSpinner";

const CartItem = ({ item, className }) => {
  let outerClass = `${classes["course-card"]} ${className ? className : ""}}`;

  const navigate = useNavigate();
  const [removeItem, statusData] = useDeleteCartItemMutation();

  const handleItemClick = () => {
    navigate(`/courses/${item.course}`);
  };

  const handleRemoveItem = (event) => {
    event.stopPropagation();
    removeItem(item.course);
  };
  return (
    <div onClick={handleItemClick}>
      <Card className={outerClass}>
        <div className={classes["div1"]}>
          <div>
            <img className={`img-fluid ${classes.image}`} src={item.image} />
          </div>
        </div>

        <div className={classes["div2"]}>
          <div>
            <div className={classes["course-name"]}>
              <p>{item.name}</p>
            </div>

            <div className={classes["instructor"]}>
              <p>Puneet Superstar</p>
            </div>

            <div className={classes["ratings"]}>
              <span className={classes["avg-ratings"]}>4.5</span>
              <span className={classes["avg-ratings-stars"]}>
                <Star size={13} color="orange" />
                <Star size={13} color="orange" />
                <Star size={13} color="orange" />
                <Star size={13} color="orange" />
                <HalfStar size={13} color="Orange" />
              </span>
              <span className={classes["total-ratings"]}>(1,234)</span>
            </div>
          </div>

          <div className={classes["price"]}>
            <div>
              ₹{item.price} <PriceIcon className=" ms-1 mb-1" />
            </div>

            <div className={classes["edit-cart"]}>
              <button
                disabled={statusData.isLoading}
                onClick={handleRemoveItem}
              >
                {statusData.isLoading ? (
                  <OvalSpinner width="20" height="20" />
                ) : (
                  <TrashIcon />
                )}
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartItem;
