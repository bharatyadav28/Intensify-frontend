import { BsFillCheckCircleFill as TickMark } from "react-icons/bs";

import classes from "./OverView.module.css";
import { Container, Row, Col } from "react-bootstrap";

// Course OverView Content
const OverView = (props) => {
  const description = props.desc;
  const highlights = props.data.highlights;
  const requrements = props.data.requirements;
  const targetAudience = props.data.targetAudience;

  const courseHighlights = (
    <ul>
      {highlights.map((highlight, index) => (
        <li key={index}>
          <TickMark
            size={15}
            color="#4a8f9f"
            style={{ marginRight: "0.5rem", width: "max-content" }}
          />
          {highlight}
        </li>
      ))}
    </ul>
  );

  const courseRequirements = (
    <ul className="px-0">
      {requrements.map((requirement, id) => (
        <li key={id}>{" " + requirement}</li>
      ))}
    </ul>
  );

  const courseAudience = (
    <ul className="px-0">
      {targetAudience.map((Audience, id) => (
        <li key={id}>{" " + Audience}</li>
      ))}
    </ul>
  );

  return (
    <Container fluid="xs" className={classes.overview}>
      <Row className="mt-3">
        <p className={classes.desc}>{description}</p>
      </Row>

      <Row className="my-4">
        <section className={classes.highLights}>
          <h3>What you'll learn</h3>
          {courseHighlights}
        </section>
      </Row>
      <Row>
        <section className={classes.requirements}>
          <h3>Requirements</h3>
          {courseRequirements}
        </section>
      </Row>
      <Row>
        <section className={classes.audience}>
          <h3>Target Audience</h3>
          {courseAudience}
        </section>
      </Row>
    </Container>
  );
};

export default OverView;
