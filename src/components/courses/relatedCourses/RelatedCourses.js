import { useSelector } from "react-redux";

import classes from "./RelatedCourses.module.css";
import RelatedCourseItem from "./RelatedCourseItem";
import Sidebar from "../../UI/SideBar";

// Related Courses sidebar
const RelatedCourses = (props) => {
  const { courseId } = props;
  const courses = useSelector((state) => state.courses.courses);

  const filterdCourses = courses.filter((course) => course._id !== courseId);

  const selectedCourses = filterdCourses.slice(0, 3);

  return (
    <Sidebar className={classes["relatedcourse-main"]}>
      <div className={classes.heading}>
        <h5>Related Course</h5>
      </div>
      <div className={classes["related-courses"]}>
        {selectedCourses.map((course, index) => (
          <RelatedCourseItem key={index} data={course} />
        ))}
      </div>
    </Sidebar>
  );
};

export default RelatedCourses;
