import { useState } from "react";

import classes from "./AddReview.module.css";
import AddReviewForm from "./AddReviewForm";
import { useSelector } from "react-redux";
import favicon from "../../assests/favicon.png";

const AddReview = ({ course, onClose }) => {
  const [rating, setRating] = useState(0);

  const userId = useSelector((state) => state.currentUser.user.userId);

  return (
    <div className={classes.main}>
      <div className="d-flex justify-content-center mb-4">
        <img src={favicon} height={50} />
      </div>
      <div className={classes.share}>
        <p>Share Your Thoughts and Help Others on Their Learning Journey!</p>
      </div>
      <div className={classes.rating}>
        {[...Array(5)].map((star, index) => {
          index = index + 1;
          return (
            <button
              key={index}
              className={index <= rating ? classes.on : classes.off}
              onClick={() => setRating(index)}
            >
              <span className={classes.star}>&#9733;</span>
            </button>
          );
        })}
      </div>
      <AddReviewForm
        rating={rating}
        user={userId}
        course={course}
        setRating={setRating}
        onClose={onClose}
      />
    </div>
  );
};

export default AddReview;
