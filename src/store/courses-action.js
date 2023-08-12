import { coursesActions } from "./courses";

const retreiveCourses = (search) => {
  return async (dispatch) => {
    const dbConnect = async (search) => {
      dispatch(coursesActions.loading());
      let response = null;

      if (search) {
        response = await fetch(`/api/v1/courses?search=${search}`);
      } else {
        response = await fetch(`/api/v1/courses`);
      }

      if (response.status === 404) {
        const errorData = await response.json();
        const errorMessage = errorData.msg;
        throw new Response(errorMessage, { status: 404 });
      }
      if (!response.ok) {
        throw new Response({ status: 500 });
      }
      const courseData = await response.json();
      return courseData;
    };

    try {
      const courseData = await dbConnect(search);
      dispatch(coursesActions.replaceCourses(courseData));
    } catch (error) {
      dispatch(coursesActions.fetchErrors(error.message));
    }
  };
};

export default retreiveCourses;
