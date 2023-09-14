import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useGetCourseVideosQuery } from "../../store/apis/course-videos";
import { Container, Row, Col } from "react-bootstrap";
import VideoPlayer from "./VideoPlayer";
import CourseVideoSidebar from "./CourseVideoSidebar";
import { LoadingSubPage } from "../../pages/LoadingPage";
import { MutatingDotsSpinner } from "../UI/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import { notifyError } from "../../utlils";
import classes from "./CourseAccordian.module.css";
import Modal from "../UI/Modal";
import AddReview from "../reviews/AddReview";
import useHttp from "../../hooks/use-http";

const CourseVideos = () => {
  const params = useParams();
  const courseId = params.id;

  const [showModal, setShowModal] = useState(false);
  const { dbConnect, setError } = useHttp();

  const { data, isLoading, error } = useGetCourseVideosQuery(courseId);

  const handleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    let openingSection = Math.floor(Math.random() * 3);
    setActiveVideo({
      url: data?.courseVideos[openingSection]?.videos[0]?.url,
      name: data?.courseVideos[openingSection]?.videos[0]?.name,
    });
  }, [data]);

  useEffect(() => {
    let id = null;
    const postRequest = (data) => {
      id = setTimeout(() => {
        if (!data.submitFlag) {
          handleModal();
        }
      }, 5000);
      return () => clearTimeout(id);
    };

    const requiredConfig = {
      url: `/api/v1/reviews/hasSubmitted`,
    };

    dbConnect(requiredConfig, postRequest);

    return () => clearTimeout(id);
  }, []);

  const handleActiveVideo = (videoData) => {
    setActiveVideo(videoData);
  };

  if (isLoading) {
    return (
      <LoadingSubPage>
        <MutatingDotsSpinner />
      </LoadingSubPage>
    );
  }
  if (error) {
    if (error.status === 401) {
      notifyError("Not authorized to access this route");
    }
    return <ErrorPage msg="Something went wrong. Please try again." />;
  }

  return (
    <Container className=" overflow-hidden mt-sm-1 mb-sm-5 mb-3 px-sm-5">
      {activeVideo && (
        <Row>
          <Col className=" overflow-hidden " sm={8}>
            <VideoPlayer url={activeVideo.url} />
            <div className={classes["video-name"]}>
              <p>{activeVideo.name}</p>
            </div>
          </Col>

          <Col className="  mt-sm-0 mt-5" sm={4}>
            <CourseVideoSidebar
              newActiveVideo={handleActiveVideo}
              courseData={data?.courseVideos}
              currentlyActive={activeVideo}
              handleModal={handleModal}
            />
          </Col>
        </Row>
      )}
      <Row>
        {/* <button className="w-25" onClick={handleModal}>
          modal
        </button> */}
        <Modal onClose={handleModal} showModal={showModal}>
          <AddReview course={courseId} onClose={handleModal} />
        </Modal>
      </Row>
    </Container>
  );
};

export default CourseVideos;
