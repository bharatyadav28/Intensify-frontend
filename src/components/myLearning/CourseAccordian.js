import Accordion from "react-bootstrap/Accordion";
import classes from "./CourseAccordian.module.css";

const CourseAccordian = ({
  heading,
  features,
  newActiveVideo,
  currentlyActive,
}) => {
  const handleVideoClick = (feature) => {
    newActiveVideo({ url: feature.url, name: feature?.name });
  };

  return (
    <Accordion defaultActiveKey="1" className={classes.main}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={classes.heading}>
          {heading}
        </Accordion.Header>
        <Accordion.Body>
          {features.map((feature, index) => (
            <p
              className={`${
                feature?.name === currentlyActive?.name ? classes.active : ""
              } ${classes["videos-link"]}`}
              onClick={handleVideoClick.bind(null, feature)}
              key={index}
            >
              {feature?.name}
            </p>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CourseAccordian;
