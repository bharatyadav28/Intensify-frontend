import React, { Suspense } from "react";
import { json, useLoaderData, defer, Await } from "react-router-dom";
import { TriangleSpinner as LoadingSpinner } from "../components/UI/LoadingSpinner";

import CourseMain from "../components/courses/CourseMain";
import ErrorBoundary from "../components/ErrorBoundary";
import { Page } from "./LoadingPage";

const Courses = () => {
  // const incomingParams = useParams();
  const { data: courseData } = useLoaderData();

  // console.log("cd", courseData);

  return (
    // <ErrorBoundary>
    // <React.Suspense fallback={<LoadingSpinner />}>
    <React.Suspense fallback={<LoadingSpinner />}>
      <Await resolve={courseData}>
        {(data) => (
          <div>
            <CourseMain courseData={data.course} />
          </div>
        )}
      </Await>
    </React.Suspense>
    // </ErrorBoundary>
  );
};

const courseLoader = async (courseId) => {
  const response = await fetch("/api/v1/courses/" + courseId);

  if (response.status === 404) {
    const errorData = await response.json();
    const errorMessage = errorData.msg;
    throw new Response(errorMessage, { status: 404 });
  }
  if (!response.ok) {
    throw new Response({ status: 500 });
  }
  const data = await response.json();

  return data;
};

const loader = async ({ request, params }) => {
  const courseId = params.id;

  return defer({
    data: courseLoader(courseId),
  });
};

export { loader };
export default Courses;
