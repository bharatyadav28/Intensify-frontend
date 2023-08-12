import { Link } from "react-router-dom";

import classes from "./RelatedCourseItem.module.css";

// JSX code of each related course list item
const RelatedCourseItem = (props) => {
  const data = props.data;

  // path of the related course which will be clicked.
  let nextPagePath = `/courses/${data._id}`;

  return (
    <Link to={nextPagePath}>
      <div className={classes["related-course"]}>
        <div className={classes.image}>
          <img src={data.image}></img>
        </div>
        <div className={classes["course-data"]}>
          <div className={classes.name}>{data.name}</div>
          <div className={classes.price}>Rs.{data.price}</div>
        </div>
      </div>
    </Link>
  );
};
export default RelatedCourseItem;
