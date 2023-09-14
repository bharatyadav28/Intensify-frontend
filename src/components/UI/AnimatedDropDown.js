import { Transition } from "react-transition-group";

import classes from "./AnimatedDropDown.module.css";

const AnimatedDropDown = ({
  heading,
  btn,
  children,
  displaybody,
  handleDisplayBody,
}) => {
  //   const bodyClasses = [
  //     displaybody ? classes["block-show"] : classes["block-hide"],
  //   ];

  return (
    <div className={classes.main}>
      <div className={classes.heading} onClick={handleDisplayBody}>
        <div>{heading}</div>
        <div
          className={`${displaybody ? classes["open-btn"] : null} ${
            classes.btn
          }`}
        >
          {btn}
        </div>
      </div>
      <Transition in={displaybody} timeout={500} mountOnEnter unmountOnExit>
        {(state) => {
          const bodyClasses = [
            state === "entering"
              ? classes["block-show"]
              : state === "exiting"
              ? classes["block-hide"]
              : null,
            classes.body,
          ];
          return <div className={bodyClasses.join(" ")}>{children}</div>;
        }}
      </Transition>
    </div>
  );
};

export default AnimatedDropDown;
