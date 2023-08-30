import ReviewItem from "./ReviewItem";
import { useGetReviewsQuery } from "../../store/apis/review-api";

import classes from "./Reviews.module.css";
import { LoadingSubPage } from "../../pages/LoadingPage";
import { BarsSpinner } from "../UI/LoadingSpinner";

const Reviews = () => {
  const { data, isLoading, error } = useGetReviewsQuery();
  let reviews = data?.reviews;

  if (window.screen.width <= 500) {
    reviews = reviews.slice(0, 2);
  }

  if (isLoading) {
    return (
      <LoadingSubPage>
        <BarsSpinner />
      </LoadingSubPage>
    );
  }
  return (
    // <div className="border border-1 ms-1 p-0 d-flex flex-column ">
    <div className={classes.main}>
      <div className={classes["top-heading"]}>
        <h5>Here’s what our Current Students have to say...</h5>
      </div>
      <div className="d-flex justify-content-around flex-wrap">
        {reviews?.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
