import { FiShare2 } from "react-icons/fi";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";

import classes from "./PurchaseSideBar.module.css";
import Sidebar from "../UI/SideBar";
import { useAddCartItemMutation } from "../../store/apis/cart-api";
import { notifyError } from "../../utlils/index";
import { LoadingPageOverlay } from "../../pages/LoadingPage";
import { BarsSpinner } from "../UI/LoadingSpinner";
import { useGetMylearningQuery } from "../../store/apis/mylearning-api";

const PurchaseSideBar = (props) => {
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);

  const navigate = useNavigate();
  const actualPrice = props.courseData.actualPrice;
  let netPrice = props.courseData.netPrice;

  const user = useSelector((state) => state.currentUser.user);

  const [addItem, addResults] = useAddCartItemMutation();

  const { data: learningData } = useGetMylearningQuery();

  useEffect(() => {
    if (addResults.isSuccess) {
      navigate("/cart");
    }
  }, [addResults.isSuccess]);

  useEffect(() => {
    if (learningData) {
      for (let lcourse of learningData?.courses) {
        if (lcourse?._id === props?.courseData?._id) {
          setAlreadyPurchased(true);
          break;
        }
      }
    }
  });

  if (addResults.isLoading) {
    return (
      <LoadingPageOverlay>
        <BarsSpinner />
      </LoadingPageOverlay>
    );
  }

  if (addResults.error) {
    notifyError(addResults.error.data.msg);
    addResults.error = null;
  }

  const handleAddToCart = async () => {
    if (!user) {
      notifyError("Please login first");
      navigate("/login");
      // return <Navigate to="login" replace={true} />;
      return;
    }
    await addItem({
      cartItem: { course: props.courseData._id },
      tax: 5,
    });
  };

  const discountPercent = (
    ((actualPrice - netPrice) * 100) /
    actualPrice
  ).toFixed(1);

  if (netPrice < 100000) {
    netPrice = netPrice.toFixed(2);
  }

  const certificate = props.courseData.certificate ? "Yes" : "No";

  const sidebarClasses = props.className + " " + classes["purchase-main"];

  return (
    <Sidebar className={sidebarClasses}>
      {/* Course Image */}
      <div className={`${classes.image} img-fluid`}>
        <img src={props.courseData.image}></img>
      </div>

      <div className={classes.price}>
        {/* Course price after discount */}
        <div className={classes["net-price"]}>Rs.{netPrice}</div>

        {/* //Course actual price */}
        <div className={classes["actual-price"]}>Rs.{actualPrice}</div>
      </div>
      <div className={classes["discount-per"]}> {discountPercent}%off</div>

      {/* Checkout button */}
      <div className={classes["enroll-btn"]}>
        <button disabled={alreadyPurchased} onClick={handleAddToCart}>
          {alreadyPurchased ? "Already Purchased" : "ENROLL NOW"}
        </button>
      </div>

      {/* Course realted extra info */}
      <div className={classes["extra-details"]}>
        <p>Duration</p>
        <p className={classes.value}>{props.courseData.duration}</p>
      </div>
      <div className={classes["extra-details"]}>
        <p>Enrolled</p>
        <p className={classes.value}>{props.courseData.enrolled}</p>
      </div>
      <div className={classes["extra-details"]}>
        <p>Language</p>
        <p className={classes.value}>{props.courseData.languages.toString()}</p>
      </div>
      <div className={classes["extra-details"]}>
        <p>Skill</p>
        <p className={classes.value}>{props.courseData.skills}</p>
      </div>
      <div className={classes["extra-details"]}>
        <p>Certificate</p> <p className={classes.value}>{certificate}</p>
      </div>

      <div className={`${classes["extra-details"]} ${classes.share}`}>
        <FiShare2 style={{ marginRight: "0.4rem" }} /> Share this course
      </div>
    </Sidebar>
  );
};

export default PurchaseSideBar;
