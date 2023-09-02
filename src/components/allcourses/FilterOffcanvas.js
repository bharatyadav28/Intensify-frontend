import { useState } from "react";
import { useSubmit, useLocation } from "react-router-dom";
import { FiChevronDown as DownBtn, FiChevronUp as UpBtn } from "react-icons/fi";

import { getSearchParams } from "../../utlils";
import classes from "./FilterOffcanvas.module.css";

const FilterOffcanvas = ({
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

    console.log(events.target.value, events.target.checked);
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
      // searchParams.delete("tutors");
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

      // console.log(tutorsArr, tutorsString);
      searchParams.append("tutors", tutorsString);
    }

    searchParams.append("page", 1);
    submit(searchParams);
  };
  // console.log(srating);

  const filterClasses = [
    show ? classes["main-show"] : classes["main-hide"],
    classes.main,
  ];

  const formBlock = [
    displayRating ? classes["block-show"] : classes["block-hide"],
  ];

  const formBlock2 = [
    displayTutors ? classes["block-show"] : classes["block-hide"],
  ];

  return (
    <>
      <div className={filterClasses.join(" ")}>
        <div className={classes.rating}>
          <div className={classes.div1} onClick={handleDisplayRating}>
            <div>Ratings</div>{" "}
            <div>
              <UpBtn color="black" />
            </div>
          </div>

          <div className={formBlock}>
            <form onChange={onChangeRating}>
              <div className={classes["form-control"]}>
                <input
                  type="radio"
                  name="rating"
                  id="rating5"
                  value="5"
                  // checked={rating === "5"}
                />
                <label htmlFor="rating5 ">
                  {[...Array(5)].map((star, index) => (
                    <span key={index} className={classes.star}>
                      &#9733;
                    </span>
                  ))}{" "}
                  5 and up
                </label>
              </div>

              <div className={classes["form-control"]}>
                <input
                  type="radio"
                  name="rating"
                  id="rating4"
                  value="4"
                  // checked={rating === "4"}
                />
                <label htmlFor="rating4 ">
                  {[...Array(4)].map((star, index) => (
                    <span key={index} className={classes.star}>
                      &#9733;
                    </span>
                  ))}{" "}
                  4 and up
                </label>
              </div>

              <div className={classes["form-control"]}>
                <input
                  type="radio"
                  name="rating"
                  id="rating3"
                  value="3"
                  // checked={rating === "3"}
                />
                <label htmlFor="rating3 " className={classes["form-control"]}>
                  {[...Array(3)].map((star, index) => (
                    <span key={index} className={classes.star}>
                      &#9733;
                    </span>
                  ))}{" "}
                  3 and up
                </label>
              </div>

              <div className={classes["form-control"]}>
                <input
                  type="radio"
                  name="rating"
                  id="rating2"
                  value="2"
                  // checked={rating === "2"}
                />
                <label htmlFor="rating2 ">
                  {[...Array(2)].map((star, index) => (
                    <span key={index} className={classes.star}>
                      &#9733;
                    </span>
                  ))}{" "}
                  2 and up
                </label>
              </div>

              <div className={classes["form-control"]}>
                <input
                  type="radio"
                  name="rating"
                  id="rating1"
                  value="1"
                  // checked={rating === "1"}
                />
                <label htmlFor="rating1 ">
                  {[...Array(1)].map((star, index) => (
                    <span key={index} className={classes.star}>
                      &#9733;
                    </span>
                  ))}{" "}
                  1 and up
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className={classes.tutors}>
          <div className={classes.div1} onClick={handleDisplayTutors}>
            <div>Tutors</div>
            <div>
              <UpBtn color="black" />
            </div>
          </div>

          <div className={formBlock2}>
            <form onChange={onChangeTutors}>
              <div className={classes["form-control"]}>
                <input
                  type="checkbox"
                  name="tutor1"
                  id="tutor1"
                  value="Robin Williams"
                  // checked={rating === "5"}
                />
                <label htmlFor="tutor1 ">Robin Williams</label>
              </div>

              <div className={classes["form-control"]}>
                <input
                  type="checkbox"
                  name="tutor2"
                  id="tutor2"
                  value="Keanu Reeves"
                  // checked={rating === "5"}
                />
                <label htmlFor="tutor2 ">Keanu Reeves</label>
              </div>

              <div className={classes["form-control"]}>
                <input
                  type="checkbox"
                  name="tutor5"
                  id="tutor5"
                  value="Tom Hanks"
                  // checked={rating === "5"}
                />
                <label htmlFor="tutor5 ">Tom Hanks</label>
              </div>

              <div className={classes["form-control"]}>
                <input
                  type="checkbox"
                  name="tutor5"
                  id="tutor5"
                  value="Bruce Wills"
                  // checked={rating === "5"}
                />
                <label htmlFor="tutor5 ">Bruce Wills</label>
              </div>

              <div className={classes["form-control"]}>
                <input
                  type="checkbox"
                  name="tutor5"
                  id="tutor5"
                  value="AI Paicno"
                  // checked={rating === "5"}
                />
                <label htmlFor="tutor5 ">AI Paicno</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterOffcanvas;
