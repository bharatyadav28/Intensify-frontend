import { useGetCartItemsQuery } from "../store/apis/cart-api";
import CartItem from "../components/cart/CartItem";
import { LoadingSubPage } from "./LoadingPage";
import { BarsSpinner } from "../components/UI/LoadingSpinner";
import CartPurchaseBar from "../components/cart/CartPurchaseBar";
import EmptyCart from "../components/cart/EmptyCart";
import ErrorPage from "./ErrorPage";

const Cart = () => {
  const { data, isSuccess, isFetching, error } = useGetCartItemsQuery();

  const cartItems = data?.cart?.cartItems;

  if (isFetching) {
    return (
      <LoadingSubPage>
        <BarsSpinner />
      </LoadingSubPage>
    );
  }

  // if (error) {
  //   return <ErrorPage msg="Something went wrong. Please try again." />;
  // }

  const isCartEmpty = cartItems?.length === 0 || !cartItems;

  return (
    <div className="d-flex flex-column ms-sm-3 ps-sm-5 pe-sm-5 mt-4  flex-lg-row  ">
      <div className="flex-grow-1">
        <h1>
          <strong>Shopping Cart</strong>
        </h1>
        <p className="mt-4 mb-0 border-bottom fw-semibold pb-2 me-2">
          {data?.count} Courses in the cart
        </p>
        {isSuccess && (
          <div>
            {cartItems?.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        )}
        {isCartEmpty && <EmptyCart />}
      </div>

      {isSuccess && !isCartEmpty && (
        <div className="p-sm-3 ms-sm-2 mt-5  w-lg-30 d-flex">
          <CartPurchaseBar total={data.cart.total} tax={data.cart.tax} />
        </div>
      )}
    </div>
  );
};

export default Cart;
