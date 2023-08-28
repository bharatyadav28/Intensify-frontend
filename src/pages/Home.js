import { useSelector } from "react-redux";
import { useLoaderData, json } from "react-router-dom";

import MyCarousel from "../components/carousel/carousel";
import CustomCourseSlider from "../components/CustomCourseSlider";
import ErrorPage from "./ErrorPage";

const Home = () => {
  const coursesData = useSelector((state) => state.courses.courses);
  const coursesLoading = useSelector((state) => state.courses.isLoading);
  const errors = useSelector((state) => state.courses.errors);

  const { carouselItems } = useLoaderData();

  return (
    <>
      <MyCarousel items={carouselItems} />
      {errors && (
        <div className="d-flex flex-column align-items-center my-5">
          <h4 className="mt-5">Something went wrong </h4>
          <p className="fw-semibold">Please try again later</p>
        </div>
      )}

      {!errors && <CustomCourseSlider items={coursesData} />}
    </>
  );
};

const loader = async () => {
  const response = await fetch("/api/v1/main-carousel");

  if (response.status === 404) {
    const errorData = await response.json();
    const errorMessage = errorData.msg;
    throw new Response(errorMessage, { status: 404 });
  }
  if (!response.ok) {
    throw new Response({ status: 500 });
  }
  return response;
};

export { loader };

export default Home;
