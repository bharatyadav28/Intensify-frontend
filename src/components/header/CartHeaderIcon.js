import { BsCart4 as CartIcon } from "react-icons/bs";
import { useSelector } from "react-redux/es/hooks/useSelector";

import classes from "./CartHeaderIcon.module.css";
import { useGetCartItemsQuery } from "../../store/apis/cart-api";

const CartHeaderIcon = () => {
  const user = useSelector((state) => state.currentUser.user);

  const { data } = useGetCartItemsQuery();
  return (
    <>
      <span className={classes.icon}>
        <CartIcon size={25} />
        {user && <span className={classes.count}>{data?.count}</span>}
      </span>
    </>
  );
};

export default CartHeaderIcon;
