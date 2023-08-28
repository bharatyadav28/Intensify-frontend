import CourseAccordian from "./CourseAccordian";

const CourseVideoSidebar = ({
  courseData,
  newActiveVideo,
  currentlyActive,
}) => {
  return (
    <>
      {courseData?.map((data) => (
        <CourseAccordian
          key={data._id}
          heading={data.section}
          features={data.videos}
          newActiveVideo={newActiveVideo}
          currentlyActive={currentlyActive}
        />
      ))}
    </>
  );
};

export default CourseVideoSidebar;
