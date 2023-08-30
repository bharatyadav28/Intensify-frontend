import {
  BsFillStarFill as Star,
  BsStarHalf as HalfStar,
  BsStar as WhiteStar,
} from "react-icons/bs";
import { AiOutlineCheck as CheckIcon } from "react-icons/ai";
import OverLay from "../UI/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./CourseSliderItem.module.css";

const CourseSliderItem = ({ item }) => {
  const description = item.desc.slice(0, 150) + "[...]";
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleChangeScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleChangeScreenWidth);
    return () => window.removeEventListener("resize", handleChangeScreenWidth);
  });

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" className={classes.tooltip} {...props}>
      <p className={classes["tooltip-desc"]}>{description}</p>
      <div>
        <p>
          <CheckIcon className="me-2" />
          Learn Designing, Casing, Soldering and more
        </p>
        <p>
          <CheckIcon className="me-2" />
          Learn how to use Ethernet and Wifi shields
        </p>
      </div>
    </Tooltip>
  );

  let orangeStars = item?.averageRatings;
  let whiteStars = 5 - orangeStars;

  let orangeStarsArray = Array(orangeStars).fill(1);
  let whiteStarsArray = Array(whiteStars).fill(0);

  const totalRatings = (
    Math.floor(Math.random() * 1000) + 1000
  ).toLocaleString();

  const cardContent = (
    <Link to={`courses/${item._id}`} className={classes["card-link"]}>
      <Card className={classes["course-card"]}>
        <div>
          <img className={`img-fluid ${classes.image}`} src={item.image} />
        </div>

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
      </Card>
    </Link>
  );

  return (
    <>
      {screenWidth >= 500 && (
        <OverLay tooltip={renderTooltip} className={classes.overlay}>
          {cardContent}
        </OverLay>
      )}

      {screenWidth < 500 && cardContent}
    </>
  );
};

export default CourseSliderItem;
