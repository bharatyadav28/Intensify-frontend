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

const CourseVideos = () => {
  const params = useParams();
  const courseId = params.id;

  const { data, isLoading, error } = useGetCourseVideosQuery(courseId);

  const [activeVideo, setActiveVideo] = useState(null);
  useEffect(() => {
    setActiveVideo({
      url: data?.courseVideos[0]?.videos[0]?.url,
      name: data?.courseVideos[0]?.videos[0]?.name,
    });
  }, [data]);

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
          <Col className="  overflow-hidden " sm={8}>
            <VideoPlayer url={activeVideo.url} />
          </Col>

          <Col className="  mt-sm-0 mt-5" sm={4}>
            <CourseVideoSidebar
              newActiveVideo={handleActiveVideo}
              courseData={data?.courseVideos}
              currentlyActive={activeVideo}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CourseVideos;
