import { Link } from "react-router-dom";
import CourseSlider from "./carousel/CourseSlider";
import classes from "./CustomCourseSlider.module.css";

const CustomCourseSlider = ({ items }) => {
  return (
    <div className={classes["custom-slider"]}>
      <div>
        <div className="d-flex flex-sm-row justify-content-between flex-column">
          <p className="mx-3 fw-bold fs-3 order-sm-1 order-2">
            Expand your career opportunities with Intensify
          </p>
          <p
            className={`${classes["view-all"]} mt-2 mb-0 me-3 fw-semibold order-sm-2 order-1 ms-sm-0 ms-auto`}
          >
            <Link to="courses?page=1">View all</Link>
          </p>
        </div>
        <p className={`${classes["slider-desc"]} mx-3 fs-6`}>
          Take one of Intensify’s range of courses and learn how to code . You
          will learn methodologies and practical knowledge regarding testing,
          creating, integrating, and implementing software for advanced embedded
          system.
        </p>
      </div>
      <CourseSlider items={items} />
    </div>
  );
};

export default CustomCourseSlider;
