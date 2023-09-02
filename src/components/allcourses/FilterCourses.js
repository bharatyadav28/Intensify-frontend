import { useState } from "react";
import { useSubmit, useLocation } from "react-router-dom";
import { FiChevronDown as DownBtn, FiChevronUp as UpBtn } from "react-icons/fi";
import { Transition } from "react-transition-group";

import { getSearchParams } from "../../utlils";
import classes from "./FilterCourses.module.css";
import AnimatedDropDown from "../UI/AnimatedDropDown";

const FilterCourses = ({
  show,
  displayRating,
  handleDisplayRating,
  displayTutors,
  handleDisplayTutors,
}) => {
  const location = useLocation();

  const submit = useSubmit();

  const onChangeRating = (events) => {
    // setRatings(events.target.value);
    const { searchParams, paramValue: rating } = getSearchParams({
      location,
      paramKey: "rating",
    });
    const page = searchParams.get("page");

    if (rating) {
      searchParams.delete("rating");
    }
    if (page) {
      searchParams.delete("page");
    }
    searchParams.append("rating", events.target.value);
    searchParams.append("page", 1);
    submit(searchParams);
  };

  const onChangeTutors = (events) => {
    const currentChangeValue = events.target.value;
    const isChecked = events.target.checked;

    const { searchParams, paramValue: tutors } = getSearchParams({
      location,
      paramKey: "tutors",
    });
    const page = searchParams.get("page");

    let tutorsArr = [];

    if (page) {
      searchParams.delete("page");
    }

    if (tutors) {
      // console.log(tutors);
      searchParams.delete("tutors");
      tutorsArr = tutors.split(",");
      if (tutorsArr.includes(currentChangeValue) && !isChecked) {
        // console.log("deleted");
        tutorsArr = tutorsArr.filter((tutor) => tutor !== currentChangeValue);
      } else {
        tutorsArr.push(currentChangeValue);
      }
    } else {
      tutorsArr.push(currentChangeValue);
    }

    if (tutorsArr.length > 0) {
      let tutorsString = tutorsArr.join(",");

      searchParams.append("tutors", tutorsString);
    }

    searchParams.append("page", 1);
    submit(searchParams);
  };

  const ratingValue = () => {
    const { paramValue: rating } = getSearchParams({
      location,
      paramKey: "rating",
    });

    return rating;
  };

  const tutorsValue = () => {
    const { paramValue: tutors } = getSearchParams({
      location,
      paramKey: "tutors",
    });

    return tutors?.split(",");
  };

  const tutors = [
    "Robin Williams",
    "Keanu Reeves",
    "Tom Hanks",
    "Bruce Wills",
    "AI Paicno",
  ];

  return (
    <>
      <Transition in={show} timeout={500} mountOnEnter unmountOnExit>
        {(state) => {
          const filterClasses = [
            state === "entering"
              ? classes["main-show"]
              : state === "exiting"
              ? classes["main-hide"]
              : null,
            classes.main,
          ];

          return (
            <div className={filterClasses.join(" ")}>
              {/* Rating */}
              <AnimatedDropDown
                heading="Ratings"
                btn={<UpBtn color="black" />}
                displaybody={displayRating}
                handleDisplayBody={handleDisplayRating}
              >
                <form onChange={onChangeRating}>
                  {[...Array(5)].map((radioDiv, index) => {
                    let val = 5 - index;

                    return (
                      <div
                        key={`r${index}`}
                        className={classes["form-control"]}
                      >
                        <input
                          type="radio"
                          name="rating"
                          id={`rating${val}`}
                          value={val}
                          checked={ratingValue() === val.toString()}
                          onChange={() => {}}
                        />
                        <label htmlFor={`rating${val}`}>
                          {[...Array(val)].map((star, index) => (
                            <span key={index} className={classes.star}>
                              &#9733;
                            </span>
                          ))}{" "}
                          {val} and up
                        </label>
                      </div>
                    );
                  })}
                </form>
              </AnimatedDropDown>

              {/* Tutors */}
              <AnimatedDropDown
                heading="Tutors"
                btn={<UpBtn color="black" />}
                displaybody={displayTutors}
                handleDisplayBody={handleDisplayTutors}
              >
                <form onChange={onChangeTutors}>
                  {tutors.map((tutor, index) => {
                    return (
                      <div
                        className={classes["form-control"]}
                        key={`t${index + 1}`}
                      >
                        <input
                          type="checkbox"
                          name={`tutor${index + 1}`}
                          id={`tutor${index + 1}`}
                          value={tutor}
                          checked={
                            tutorsValue()?.includes(tutor) ? true : false
                          }
                          onChange={() => {}}
                        />
                        <label htmlFor={`tutor${index + 1}`}>{tutor}</label>
                      </div>
                    );
                  })}
                </form>
              </AnimatedDropDown>
            </div>
          );
        }}
      </Transition>
    </>
  );
};

export default FilterCourses;
