import CourseAccordian from "./CourseAccordian";

const CourseVideoSidebar = ({
  courseData,
  newActiveVideo,
  currentlyActive,

  handleModal,
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
          handleModal={handleModal}
        />
      ))}

      <div className="d-flex justify-content-end">
        <button className="write-review" onClick={handleModal}>
          Write a review
        </button>
      </div>
    </>
  );
};

export default CourseVideoSidebar;
