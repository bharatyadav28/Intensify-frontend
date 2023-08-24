import {
  BsFillStarFill as Star,
  BsStarHalf as HalfStar,
  BsFillPlayCircleFill as PlayIcon,
} from "react-icons/bs";

import { Link } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./MyLearningItem.module.css";

const MyLearningItem = ({ item }) => {
  const cardContent = (
    <Link to="" className={classes["card-link"]}>
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
