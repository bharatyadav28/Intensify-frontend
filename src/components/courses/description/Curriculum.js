import classes from "./Curriculum.module.css";
import DropDown from "./DropDown";

// Curriculum Data
const Curriculum = (props) => {
  const curriculumData = props.data.map((temp, index) => (
    <DropDown
      key={index}
      heading={temp.heading}
      keyFeatures={temp.keyFeatures}
    />
  ));

  return <div className={classes.curriculum}>{curriculumData}</div>;
};
export default Curriculum;
