import { BsFillStarFill as Star, BsStarHalf as HalfStar } from "react-icons/bs";
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
