import { BsFillStarFill as Star, BsStarHalf as HalfStar } from "react-icons/bs";
import { Link } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./CourseItem.module.css";

const CourseItem = ({ item }) => {
  const description = item.desc.slice(0, 150) + "[...]";
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
