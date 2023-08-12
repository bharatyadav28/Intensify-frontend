import { useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill as PrevArrow,
  BsFillArrowRightCircleFill as NextArrow,
} from "react-icons/bs";

import classes from "./CourseSlider.module.css";
import CardSliderItem from "./CourseSliderItem";

// carousel
const CourseSlider = ({ items }) => {
  const ref = useRef();

  const [buttonsVisible, setButtonsVisible] = useState({
    prev: false,
    next: true,
  });

  //  previous button click handler
  const handlePrevClick = () => {
    let width = ref.current.clientWidth;

    ref.current.scrollLeft -= width;

    if (ref.current.scrollLeft <= width) {
      setButtonsVisible((prevValues) => ({ ...prevValues, prev: false }));
    }

    if (!buttonsVisible.next) {
      setButtonsVisible((prevValues) => ({ ...prevValues, next: true }));
    }
  };

  // next button click handler
  const handleNextClick = () => {
    let maxScrollRight = ref.current.scrollWidth - ref.current.clientWidth;
    let width = ref.current.clientWidth;

    ref.current.scrollLeft += width;

    if (!buttonsVisible.prev) {
      setButtonsVisible((prevValues) => ({ ...prevValues, prev: true }));
    }

    if (ref.current.scrollLeft >= maxScrollRight - width) {
      setButtonsVisible((prevValues) => ({ ...prevValues, next: false }));
    }
  };

  return (
    <div className={classes.slider}>
      {buttonsVisible.prev && (
        <button className={classes["prev-arrow"]} onClick={handlePrevClick}>
          <PrevArrow size={40} />
        </button>
      )}

      {buttonsVisible.next && (
        <button className={classes["next-arrow"]} onClick={handleNextClick}>
          <NextArrow size={40} />
        </button>
      )}

      <div className={classes.container} id="container" ref={ref}>
        {items.map((item) => (
          <CardSliderItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CourseSlider;
