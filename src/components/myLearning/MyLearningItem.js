import {
  BsFillStarFill as Star,
  BsStarHalf as HalfStar,
  BsFillPlayCircleFill as PlayIcon,
  BsStar as WhiteStar,
} from "react-icons/bs";
import { Link } from "react-router-dom";

import classes from "./MyLearningItem.module.css";

const MyLearningItem = ({ item }) => {
  let orangeStars = item?.averageRatings;
  let whiteStars = 5 - orangeStars;

  let orangeStarsArray = Array(orangeStars).fill(1);
  let whiteStarsArray = Array(whiteStars).fill(0);

  const totalRatings = (
    Math.floor(Math.random() * 1000) + 1000
  ).toLocaleString();

  const cardContent = (
    <Link to={item._id} className={classes["card-link"]}>
      <div className={classes["course-card"]}>
        <div className={classes["image-div"]}>
          <div className={classes.div1}>
            <div className={classes["img-backdrop"]}></div>
            <span className={classes.playicon}>
              <PlayIcon size={50} color="white" />
            </span>
            <img className={`img-fluid ${classes.image}`} src={item.image} />
          </div>
        </div>

        <div className={classes.data}>
          <div className={classes["course-name"]}>
            <p>{item.name}</p>
          </div>

          <div className={classes["instructor"]}>
            <p>{item.tutor}</p>
          </div>

          <div className={classes["ratings"]}>
            <span className={classes["avg-ratings"]}>{orangeStars}.0</span>
            <span className={classes["avg-ratings-stars"]}>
              {orangeStarsArray.map((item, index) => (
                <Star size={13} color="orange" key={index} />
              ))}
              {whiteStarsArray.map((item, index) => (
                <WhiteStar size={13} key={index} />
              ))}
            </span>
            <span className={classes["total-ratings"]}>({totalRatings})</span>
          </div>

          <div>
            <span className={classes["net-price"]}>₹{item.netPrice}</span>
            <span className={classes["actual-price"]}>₹{item.actualPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );

  return <>{cardContent}</>;
};

export default MyLearningItem;
