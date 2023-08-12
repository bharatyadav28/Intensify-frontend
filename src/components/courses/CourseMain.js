import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

import Description from "./description/Description";
import PurchaseSideBar from "./PurchaseSideBar";
import RelatedCourses from "./relatedCourses/RelatedCourses";
import classes from "./CourseMain.module.css";

// Course Page Whole Data
const CourseMain = (props) => {
  return (
    <Container className={`${classes.main} `}>
      <Row>
        <Breadcrumb className={`${classes["course-navbar"]}  ms-0 my-5 ps-0 `}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">{props.courseData.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row>
        <Col xs={12} lg={8}>
          <Description courseData={props.courseData} className="pe-3" />
        </Col>
        {/* <Col xl={1}></Col> */}

        <Col
          xs={12}
          sm={8}
          lg={4}
          className={`${classes.sidebar} d-flex flex-column align-items-center mx-auto `}
        >
          <PurchaseSideBar
            courseData={props.courseData}
            className="mb-2 mx-auto"
          />
          <RelatedCourses courseId={props.courseData._id} />
        </Col>
      </Row>
    </Container>
  );
};

export default CourseMain;
