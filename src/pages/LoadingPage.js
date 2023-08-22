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
  return (
    <div>
      <SpinnerComp className={className}>{children}</SpinnerComp>
    </div>
  );
};

const LoadingSubPage = ({ children }) => {
  return <div className={classes.spin}>{children}</div>;
};

export { LoadingPageOverlay, LoadingSubPage };
export default LoadingPage;
