import { createPortal } from "react-dom";

import classes from "./LoadingPage.module.css";

const BackDrop = () => {
  return <div className={classes.backdrop}></div>;
};

const SpinnerComp = ({ children }) => {
  return <div className={classes.spinner}>{children}</div>;
};

const portalElement = document.getElementById("spinner");

// whole page
const LoadingPageOverlay = ({ children }) => {
  return (
    <>
      {createPortal(<BackDrop />, portalElement)}
      {createPortal(<SpinnerComp>{children}</SpinnerComp>, portalElement)}
    </>
  );
};

// specific part of page
const LoadingPage = ({ children, className }) => {
  const classes = className;
  return (
    <div>
      <SpinnerComp className={classes}>{children}</SpinnerComp>
    </div>
  );
};

export { LoadingPageOverlay };
export default LoadingPage;
