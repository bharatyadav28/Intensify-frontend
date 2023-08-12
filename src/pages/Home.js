import { useSelector } from "react-redux";
import { useLoaderData, json } from "react-router-dom";
import { useNavigation } from "react-router-dom";

import MyCarousel from "../components/carousel/carousel";
import CustomCourseSlider from "../components/CustomCourseSlider";
import { LoadingPageOverlay } from "./LoadingPage";
import favicon from "../assests/IntensifyPic.png";

const Home = () => {
  const coursesData = useSelector((state) => state.courses.courses);
  const coursesLoading = useSelector((state) => state.courses.isLoading);
  const errors = useSelector((state) => state.courses.errors);

  const { carouselItems } = useLoaderData();

  // const navigation = useNavigation();

  // if (coursesLoading || navigation.state === "loading") {
  //   return (
  //     <LoadingPageOverlay>
  //       <img className="load-img" src={favicon} />
  //     </LoadingPageOverlay>
  //   );
  // }

  return (
    <>
      <MyCarousel items={carouselItems} />
      {errors && <p>{errors}</p>}

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
