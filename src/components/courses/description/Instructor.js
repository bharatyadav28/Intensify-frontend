import classes from "./Instructor.module.css";
import { BsPersonCircle as DefaultImage } from "react-icons/bs";

// Course Instructor Data
const Instructor = (props) => {
  const instructorPic = props.image ? (
    props.image
  ) : (
    <DefaultImage size={120} style={{ marginRight: "2.5rem" }} />
  );

  return (
    <div className={classes.instructor}>
      <div className={classes.heading}>
        <h4> About the Instructor</h4>
      </div>

      <div className={classes["instructor-details"]}>
        {instructorPic}
        <h5>{props.name || "Anonymous"}</h5>
      </div>
    </div>
  );
};

export default Instructor;
