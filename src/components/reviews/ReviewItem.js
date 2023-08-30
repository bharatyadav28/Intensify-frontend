import {
  BsFillStarFill as Star,
  BsStarHalf as HalfStar,
  BsStar as WhiteStar,
} from "react-icons/bs";
import {
  FaRegThumbsUp as Thumbsup,
  FaRegThumbsDown as Thumbdown,
  FaThumbsUp as FilledThumbsup,
  FaThumbsDown as FilledThumbdown,
} from "react-icons/fa";
import { useState } from "react";

import classes from "./ReviewItem.module.css";

const ReviewItem = ({ review }) => {
  const [thumbupActive, setThumbupActive] = useState(false);
  const [thumbdownActive, setThumbdownActive] = useState(false);

  const name = review.userName;
  const imageAlphabet = name[0].toUpperCase();

  // let description =
  // "This is 4th course of Jonas that I have finished and I also try other courses in Udemy or in other sources. I can clearly and honestly say that Jonas is the best. His teaching tecniques, pace, methods, curriculum and most";

  let description = review.comment;

  if (description.length >= 221) {
    description = description.substring(0, 221) + "[...]";
  }
  const handleThumbsupClick = () => {
    setThumbupActive(true);
    setThumbdownActive(false);
  };
  const handleThumbsdownClick = () => {
    setThumbupActive(false);
    setThumbdownActive(true);
  };

  const thumbsDownbtn = thumbdownActive ? <FilledThumbdown /> : <Thumbdown />;
  const thumbsUpbtn = thumbupActive ? <FilledThumbsup /> : <Thumbsup />;

  let orangeStars = review?.ratings;
  let whiteStars = 5 - orangeStars;

  let orangeStarsArray = Array(orangeStars).fill(1);
  let whiteStarsArray = Array(whiteStars).fill(0);

  return (
    <div className={classes.main}>
      <div className={classes.heading}>
        <div className={classes.pic}>{imageAlphabet}</div>
        <div className={classes.add}>
          <div>{name}</div>
          <div className={classes.ratings}>
            {orangeStarsArray.map((item, index) => (
              <Star size={10} color="orange" key={index} />
            ))}
            {whiteStarsArray.map((item, index) => (
              <WhiteStar size={10} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className={classes.comments}>{description}</div>

      <div className="d-flex mb-5  position-relative">
        <div className={classes.helpful}>Helpful?</div>
        <div className={classes["thumb-btns"]}>
          <button onClick={handleThumbsupClick}>{thumbsUpbtn}</button>
          <button onClick={handleThumbsdownClick}>{thumbsDownbtn}</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
