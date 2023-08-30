import {
  BsFillStarFill as Star,
  BsStarHalf as HalfStar,
  BsStar as WhiteStar,
} from "react-icons/bs";
import { Link } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./CourseItem.module.css";

const CourseItem = ({ item }) => {
  const description = item.desc.slice(0, 150) + "[...]";

  let orangeStars = item?.averageRatings;
  let whiteStars = 5 - orangeStars;

  let orangeStarsArray = Array(orangeStars).fill(1);
  let whiteStarsArray = Array(whiteStars).fill(0);

  const totalRatings = (
    Math.floor(Math.random() * 1000) + 1000
  ).toLocaleString();
  return (
    <Link to={item._id}>
      <Card className={classes["course-card"]}>
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
            <div className={classes.description}>{description}</div>

            <div className={classes["instructor"]}>
              <p>Puneet Superstar</p>
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
          </div>

          <div>
            <div className={classes["net-price"]}>₹{item.netPrice}</div>
            <div className={classes["actual-price"]}>₹{item.actualPrice}</div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CourseItem;
