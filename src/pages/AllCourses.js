import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsFilter as FilterIcon } from "react-icons/bs";

import FilterOffcanvas from "../components/allcourses/FilterOffcanvas";
import CourseItem from "../components/allcourses/CourseItem";
import SearchInput from "../components/allcourses/SearchInput";
import useHttp from "../hooks/use-http";
import { BarsSpinner as LoadingSpinner } from "../components/UI/LoadingSpinner";
import SortHandle from "../components/allcourses/SortHandle";
import PaginationUI from "../components/UI/PaginationUI";

const AllCourses = () => {
  const [show, setShow] = useState(false);
  const [displayRating, setDisplayRatings] = useState(true);
  const [displayTutors, setDisplayTutors] = useState(true);
  const [coursesData, setCoursesData] = useState(null);

  const { isLoading, error, dbConnect } = useHttp();

  // current url
  const location = useLocation();

  // load courses data
  useEffect(() => {
    const postData = (data) => {
      setCoursesData(data);
    };

    const queryParams = new URLSearchParams(location.search); //parse url
    const search = queryParams.get("search");
    const sort = queryParams.get("sort");
    const page = queryParams.get("page");
    const rating = queryParams.get("rating");
    const tutors = queryParams.get("tutors");

    let apiUrl = `/api/v1/courses?limit=3&`;
    if (search) {
      apiUrl += `search=${search}&`;
    }
    if (sort) {
      apiUrl += `sort=${sort}&`;
    }
    if (page) {
      apiUrl += `page=${page}&`;
    } else {
      // apiUrl += `page=1&`;
    }

    if (rating) {
      apiUrl += `rating=${rating}`;
    }

    if (tutors) {
      apiUrl += `tutors=${tutors}`;
    }
    // console.log(apiUrl);

    dbConnect({ url: apiUrl }, postData);
  }, [dbConnect, location]);

  // Page main content
  let dataDisplayed = "";

  if (coursesData) {
    dataDisplayed = coursesData.courses.map((course) => (
      <CourseItem key={course._id} item={course} />
    ));
  }

  if (coursesData?.count === 0) {
    dataDisplayed = (
      <div className="d-flex justify-content-center mt-sm-5 mt-0">
        <h4>No course found</h4>
      </div>
    );
  }

  if (isLoading) {
    dataDisplayed = (
      <div className="d-flex justify-content-center align-items-center m-5">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    dataDisplayed = (
      <div className="d-flex flex-column align-items-center">
        <h4>Something went wrong </h4>
        <p className="fw-semibold">Please try again later</p>
      </div>
    );
  }

  let totalItems = coursesData?.totalItems || 0;

  // Handlers
  const handleShowFilter = () => {
    setShow((prevState) => {
      if (prevState === true) {
        setDisplayRatings(false);
        setDisplayTutors(false);
      }
      return !prevState;
    });
  };

  const handleDisplayRating = () =>
    setDisplayRatings((prevState) => !prevState);

  const handleDisplayTutors = () => setDisplayTutors((prevState) => !prevState);

  return (
    <div className="d-flex flex-column p-sm-3 p-0">
      <div className="d-flex flex-sm-row flex-column">
        <div className="d-flex justify-content-sm-start justify-content-center">
          <Button
            variant="light"
            onClick={handleShowFilter}
            className="fw-medium "
          >
            <FilterIcon className="fw-bold" /> Filter
          </Button>
          <SortHandle />
        </div>

        <div className="w-sm-50 w-75 mt-sm-0 mt-3 mx-1">
          <SearchInput />
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row  ">
        <div className="align-self-center align-self-sm-start">
          {/* <FilterOffcanvas
            show={show}
            displayRating={displayRating}
            handleDisplayRating={handleDisplayRating}
            displayTutors={displayTutors}
            handleDisplayTutors={handleDisplayTutors}
          /> */}
          {show && <p className="mt-5 mx-1">Coming Soon!!! .In progress</p>}
        </div>
        <div className=" flex-grow-1 mt-sm-5 mt-4 ">{dataDisplayed}</div>
      </div>

      {!isLoading && (
        <div className="d-flex justify-content-center">
          <PaginationUI totalItems={totalItems} />
        </div>
      )}
    </div>
  );
};

export default AllCourses;
